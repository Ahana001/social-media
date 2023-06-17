import cloudinary from 'cloudinary';
import * as secretStore from '../../utils/secret_manager';
import {UploadedFile} from 'express-fileupload';
import {Post} from './models';
import {PostDetails} from './types';
import {getUsersFromDB} from '../user/service';

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
    posts = await Post.find({is_deleted: false, id: {$in: post_ids}});
  } else {
    posts = await Post.find({is_deleted: false});
  }

  const modified_posts = posts.reduce(
    async (post_accumulator: Promise<PostDetails[]>, post: any) => {
      const modified_post = post!.toObject() as PostDetails;
      delete modified_post._id;
      delete modified_post.picture_public_id;

      modified_post.liked_by = await getUsersFromDB(post!.liked_by);
      modified_post.disliked_by = await getUsersFromDB(post!.disliked_by);

      const acc = await post_accumulator;
      acc.push(modified_post);
      return post_accumulator;
    },
    Promise.resolve([])
  );
  return modified_posts;
}

export async function getPostsByUserId(user_id: string[]) {
  const posts = await Post.find({is_deleted: false, author_id: {$in: user_id}});

  const modified_posts = posts.reduce(
    async (post_accumulator: Promise<PostDetails[]>, post: any) => {
      const modified_post = post!.toObject() as PostDetails;
      delete modified_post._id;
      delete modified_post.picture_public_id;

      modified_post.liked_by = await getUsersFromDB(post!.liked_by);
      modified_post.disliked_by = await getUsersFromDB(post!.disliked_by);

      const acc = await post_accumulator;
      acc.push(modified_post);
      return post_accumulator;
    },
    Promise.resolve([])
  );
  return modified_posts;
}
