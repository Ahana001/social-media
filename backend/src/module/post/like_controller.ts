import {sendError, sendSuccess} from '../../utils/handle_response';
import {AuthenticatedRequest} from '../../utils/jwt/authenticate';
import {id} from '../../utils/validation';
// import {getUsersFromDB} from '../user/service';
import {Post} from './models';
import {getPosts} from './service';
// import {PostDetails, PostDocument} from './types';
import {Response} from 'express';
import {PostDocument} from './types';

export async function likePost(req: AuthenticatedRequest, res: Response) {
  try {
    const validation = id.validate(req.params);
    if (validation.error)
      return sendError(res, 400, validation.error.details[0].message);

    const validated_req = validation.value as PostDocument;

    const post = await Post.findOne({id: validated_req.id, is_deleted: false});

    if (post) {
      const postAlreadyLikeByUser = post.liked_by.find(
        user_id => user_id === req.user!.id
      );

      if (postAlreadyLikeByUser) {
        return sendError(
          res,
          400,
          'Cannot like a post that is already liked. '
        );
      }
      await Post.findOneAndUpdate(
        {id: validated_req.id},
        {
          $push: {liked_by: req.user!.id},
          $set: {like_count: post.like_count + 1},
          $currentDate: {updatedAt: true},
          is_deleted: false,
        },
        {returnOriginal: false}
      );

      // const modified_post = updated_post!.toObject() as PostDetails;
      // delete modified_post._id;
      // delete modified_post.picture_public_id;

      // modified_post.liked_by = await getUsersFromDB(updated_post!.liked_by);
      // modified_post.disliked_by = await getUsersFromDB(
      //   updated_post!.disliked_by
      // );
      const modified_posts = await getPosts([]);
      return sendSuccess(res, 200, {posts: modified_posts});
    } else {
      return sendError(res, 404, 'Post not found');
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error) {
    console.error(error);
    return sendError(res, 500, 'Internal Server Error');
  }
}

export async function removelikePost(req: AuthenticatedRequest, res: Response) {
  try {
    const validation = id.validate(req.params);
    if (validation.error)
      return sendError(res, 400, validation.error.details[0].message);

    const validated_req = validation.value as PostDocument;

    const post = await Post.findOne({id: validated_req.id, is_deleted: false});

    if (post) {
      const postAlreadyLikeByUser = post.liked_by.find(
        user_id => user_id === req.user!.id
      );
      if (!postAlreadyLikeByUser) {
        return sendError(res, 404, 'Cannot dislike a post that is not liked. ');
      }
      await Post.findOneAndUpdate(
        {id: validated_req.id},
        {
          $set: {like_count: post.like_count - 1},
          $pull: {liked_by: req.user!.id},
          $currentDate: {updatedAt: true},
          is_deleted: false,
        },
        {returnOriginal: false}
      );

      // const modified_post = updated_post!.toObject() as PostDetails;
      // delete modified_post._id;
      // delete modified_post.picture_public_id;

      // modified_post.liked_by = await getUsersFromDB(updated_post!.liked_by);
      // modified_post.disliked_by = await getUsersFromDB(
      //   updated_post!.disliked_by
      // );
      const modified_posts = await getPosts([]);
      return sendSuccess(res, 200, {posts: modified_posts});
    } else {
      return sendError(res, 404, 'Post not found');
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error) {
    console.error(error);
    return sendError(res, 500, 'Internal Server Error');
  }
}
