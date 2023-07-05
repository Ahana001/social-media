import cloudinary from 'cloudinary';
import * as secretStore from '../../utils/secret_manager';
import {UploadedFile} from 'express-fileupload';
import {Post} from './models';
import {PostDetails} from './types';
import {getUsersFromDB} from '../user/service';
import {User} from '../user/models';
import {UserDocument} from '../user/type';

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function uploadImage(image: UploadedFile): Promise<any> {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream(
        {folder: secretStore.getSecret('CLOUDINARY_FOLDER_NAME')},
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      )
      .end(image.data);
  });
}
/* eslint-disable @typescript-eslint/no-explicit-any */
export async function deleteImage(publicId: string): Promise<any> {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

export async function getPosts(post_ids: string[]) {
  let posts;

  if (post_ids.length) {
    posts = await Post.find({is_deleted: false, id: {$in: post_ids}}).sort({
      createdAt: -1,
    });
  } else {
    posts = await Post.find({is_deleted: false}).sort({createdAt: -1});
  }

  const modified_posts = posts.reduce(
    async (post_accumulator: Promise<PostDetails[]>, post: any) => {
      const userDetails = await User.findOne({
        id: post.author_id,
        is_deleted: false,
      });
      const modified_user = userDetails!.toObject() as UserDocument;
      delete modified_user.password;
      delete modified_user._id;
      delete modified_user.image_public_id;

      const modified_post = post!.toObject() as PostDetails;
      delete modified_post._id;
      delete modified_post.picture_public_id;

      modified_post.liked_by = await getUsersFromDB(post!.liked_by);
      modified_post.bookmark_by = await getUsersFromDB(post!.bookmark_by);

      modified_post.user = modified_user;
      const acc = await post_accumulator;
      acc.push(modified_post);
      return post_accumulator;
    },
    Promise.resolve([])
  );
  return modified_posts;
}

export async function getPostsByUserId(user_id: string[]) {
  const posts = await Post.find({
    is_deleted: false,
    author_id: {$in: user_id},
  }).sort({createdAt: -1});
  const user = await User.findOne({id: user_id, is_deleted: false});
  const modified_user = user!.toObject() as UserDocument;
  delete modified_user.password;
  delete modified_user._id;
  delete modified_user.image_public_id;

  const modified_posts = posts.reduce(
    async (post_accumulator: Promise<PostDetails[]>, post: any) => {
      const modified_post = post!.toObject() as PostDetails;
      delete modified_post._id;
      delete modified_post.picture_public_id;

      modified_post.liked_by = await getUsersFromDB(post!.liked_by);
      modified_post.bookmark_by = await getUsersFromDB(post!.bookmark_by);
      modified_post.user = modified_user;
      const acc = await post_accumulator;
      acc.push(modified_post);
      return post_accumulator;
    },
    Promise.resolve([])
  );
  return modified_posts;
}
