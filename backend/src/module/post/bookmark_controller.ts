import {AuthenticatedRequest} from '../../utils/jwt/authenticate';
import {Response} from 'express';
import {id} from '../../utils/validation';
import {sendError, sendSuccess} from '../../utils/handle_response';
import {Post} from './models';
import {getPosts} from './service';
import {PostDocument} from './types';

export async function bookmarkPost(req: AuthenticatedRequest, res: Response) {
  try {
    const validation = id.validate(req.params);
    if (validation.error)
      return sendError(res, 400, validation.error.details[0].message);

    const validated_req = validation.value as PostDocument;

    const post = await Post.findOne({id: validated_req.id, is_deleted: false});

    if (post) {
      const postAlreadyBookmarkByUser = post.bookmark_by.find(
        user_id => user_id === req.user!.id
      );

      if (postAlreadyBookmarkByUser) {
        return sendError(
          res,
          400,
          'Cannot bookmark a post that is already bookmarked. '
        );
      }
      await Post.findOneAndUpdate(
        {id: validated_req.id},
        {
          $push: {bookmark_by: req.user!.id},
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

export async function removeBookmarkPost(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const validation = id.validate(req.params);
    if (validation.error)
      return sendError(res, 400, validation.error.details[0].message);

    const validated_req = validation.value as PostDocument;

    const post = await Post.findOne({id: validated_req.id, is_deleted: false});

    if (post) {
      const postAlreadyBookmarkedByUser = post.bookmark_by.find(
        user_id => user_id === req.user!.id
      );
      if (!postAlreadyBookmarkedByUser) {
        return sendError(
          res,
          404,
          'You cannot unbookmark a post that has not been bookmarked.'
        );
      }
      await Post.findOneAndUpdate(
        {id: validated_req.id},
        {
          $pull: {bookmark_by: req.user!.id},
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
