import {sendError, sendSuccess} from '../../utils/handle_response';
import {User} from './models';
import {Response} from 'express';
import {UserDetails, UserDocument} from './type';
import {AuthenticatedRequest} from '../../utils/jwt/authenticate';
import {getAllUserFromDB, getUsersFromDB} from './service';
import {id} from '../../utils/validation';

export async function followUser(req: AuthenticatedRequest, res: Response) {
  try {
    const user_id = req.user!.id;
    const validation = id.validate(req.params);
    if (validation.error)
      return sendError(res, 400, validation.error.details[0].message);

    const validated_req = validation.value;

    const user = await User.findOne({id: user_id, is_deleted: false});
    const modified_user = user!.toObject() as UserDocument;

    if (user) {
      const alreadyFollow = modified_user.following.find(
        id => id === validated_req.id
      );
      if (alreadyFollow) {
        return sendError(res, 400, 'Already Following');
      } else {
        /*update current user following list */
        const updated_user = await User.findOneAndUpdate(
          {id: user.id},
          {
            $push: {following: validated_req.id},
            $currentDate: {updatedAt: true},
            is_deleted: false,
          },
          {returnOriginal: false}
        );
        const updated_modified_user = updated_user!.toObject() as UserDetails;
        delete updated_modified_user.password;
        delete updated_modified_user._id;

        updated_modified_user.followers = await getUsersFromDB(
          updated_user!.followers
        );
        updated_modified_user.following = await getUsersFromDB(
          updated_user!.following
        );
        /*update follow user followers list */
        await User.findOneAndUpdate(
          {id: validated_req.id},
          {
            $push: {followers: user_id},
            $currentDate: {updatedAt: true},
            is_deleted: false,
          },
          {returnOriginal: false}
        );

        const modified_users_result = await getAllUserFromDB();

        return sendSuccess(res, 200, {
          user: updated_modified_user,
          users: modified_users_result,
        });
      }
    } else {
      return sendError(res, 404, 'User not found');
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error) {
    return sendError(res, 500, 'Internal Server Error');
  }
}

export async function unfollowUser(req: AuthenticatedRequest, res: Response) {
  try {
    const user_id = req.user!.id;
    const validation = id.validate(req.params);
    if (validation.error)
      return sendError(res, 400, validation.error.details[0].message);

    const validated_req = validation.value;

    const user = await User.findOne({id: user_id, is_deleted: false});
    const modified_user = user!.toObject() as UserDocument;

    if (user) {
      const alreadyFollow = modified_user.following.find(
        id => id === validated_req.id
      );
      if (!alreadyFollow) {
        return sendError(res, 400, 'User already not following');
      } else {
        /*update current user following list */
        const updated_user = await User.findOneAndUpdate(
          {id: user.id},
          {
            $pull: {following: validated_req.id},
            $currentDate: {updatedAt: true},
            is_deleted: false,
          },
          {returnOriginal: false}
        );
        const updated_modified_user = updated_user!.toObject() as UserDetails;
        delete updated_modified_user.password;
        delete updated_modified_user._id;

        updated_modified_user.followers = await getUsersFromDB(
          updated_user!.followers
        );
        updated_modified_user.following = await getUsersFromDB(
          updated_user!.following
        );
        /*update follow user followers list */
        await User.findOneAndUpdate(
          {id: validated_req.id},
          {
            $pull: {followers: user_id},
            $currentDate: {updatedAt: true},
            is_deleted: false,
          },
          {returnOriginal: false}
        );

        const modified_users_result = await getAllUserFromDB();
        return sendSuccess(res, 200, {
          user: updated_modified_user,
          users: modified_users_result,
        });
      }
    } else {
      return sendError(res, 404, 'User not found');
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error) {
    return sendError(res, 500, 'Internal Server Error');
  }
}
