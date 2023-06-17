import {Response} from 'express';
import {sendError, sendSuccess} from '../../utils/handle_response';
import {create_post, update_post} from './validation';
import {deleteImage, getPosts, uploadImage} from './service';
import {UploadedFile} from 'express-fileupload';
import {PostDetails, PostDocument} from './types';
import {AuthenticatedRequest} from '../../utils/jwt/authenticate';
import {Post} from './models';
import {getUsersFromDB} from '../user/service';
import {id} from '../../utils/validation';

export async function createPost(req: AuthenticatedRequest, res: Response) {
  try {
    const validation = create_post.validate(req.body);
    if (validation.error)
      return sendError(res, 400, validation.error.details[0].message);

    const validated_req = validation.value as PostDocument;

    validated_req.author_id = req.user!.id;

    const image = req?.files?.picture as UploadedFile;
    if (image) {
      const upload_result = await uploadImage(image);
      validated_req.picture_url = upload_result.secure_url;
      validated_req.picture_public_id = upload_result.public_id;
    }
    const totalDocuments = await Post.countDocuments();

    const created_post = await Post.create({
      ...validated_req,
      id: `POST${totalDocuments + 1}`,
      bookmarks: [],
      followers: [],
      following: [],
    });
    const modified_post = created_post.toObject() as PostDocument;
    delete modified_post._id;
    delete modified_post.picture_public_id;

    return sendSuccess(res, 201, modified_post);

    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error) {
    return sendError(res, 500, 'Internal Server Error');
  }
}

export async function updatePost(req: AuthenticatedRequest, res: Response) {
  try {
    req.body.id = req.params.id;
    const validation = update_post.validate(req.body);
    if (validation.error)
      return sendError(res, 400, validation.error.details[0].message);

    const validated_req = validation.value as PostDocument;

    const post = await Post.findOne({id: validated_req.id, is_deleted: false});

    if (post) {
      if (post.author_id !== req.user?.id) {
        return sendError(res, 400, 'You are not authenticated to edit post');
      }
      const image = req?.files?.picture as UploadedFile;
      if (image) {
        await deleteImage(post.picture_public_id!);

        const upload_result = await uploadImage(image);
        validated_req.picture_url = upload_result.secure_url;
        validated_req.picture_public_id = upload_result.public_id;
      }

      const updated_post = await Post.findOneAndUpdate(
        {id: validated_req.id},
        {
          $set: validated_req,
          $currentDate: {updatedAt: true},
          is_deleted: false,
        },
        {returnOriginal: false}
      );

      const modified_post = updated_post!.toObject() as PostDetails;
      delete modified_post._id;
      delete modified_post.picture_public_id;

      modified_post.liked_by = await getUsersFromDB(updated_post!.liked_by);
      modified_post.disliked_by = await getUsersFromDB(
        updated_post!.disliked_by
      );

      return sendSuccess(res, 200, modified_post);
    } else {
      return sendError(res, 404, 'Post not found');
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error) {
    return sendError(res, 500, 'Internal Server Error');
  }
}

export async function getAllPost(req: AuthenticatedRequest, res: Response) {
  try {
    const modified_posts = await getPosts([]);
    return sendSuccess(res, 200, modified_posts);

    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error) {
    return sendError(res, 500, 'Internal Server Error');
  }
}

export async function getPost(req: AuthenticatedRequest, res: Response) {
  try {
    const validation = id.validate(req.params);
    if (validation.error)
      return sendError(res, 400, validation.error.details[0].message);

    const validated_req = validation.value as PostDocument;

    const modified_posts = await getPosts([validated_req.id]);
    return sendSuccess(res, 200, modified_posts);

    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error) {
    return sendError(res, 500, 'Internal Server Error');
  }
}
