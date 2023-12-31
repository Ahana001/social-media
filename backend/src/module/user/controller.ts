import {Request, Response} from 'express';
import {UserDetails, UserDocument} from './type';
import {User} from './models';
import {update_user} from './validation';
import {sendError, sendSuccess} from '../../utils/handle_response';
import * as bcrypt from 'bcrypt';
import {
  getAllUserFromDB,
  getUserSuggetionList,
  getUsersFromDB,
} from './service';
import {id} from '../../utils/validation';
import {AuthenticatedRequest} from '../../utils/jwt/authenticate';
import {deleteImage, getPostsByUserId, uploadImage} from '../post/service';
import {UploadedFile} from 'express-fileupload';

export async function updateUser(req: Request, res: Response) {
  try {
    req.body.id = req.params.id;
    const validation = update_user.validate(req.body);
    if (validation.error)
      return sendError(res, 400, validation.error.details[0].message);

    const validated_req = validation.value as UserDocument;

    if (validated_req.password) {
      const salt = bcrypt.genSaltSync();
      validated_req.password = bcrypt.hashSync(validated_req.password, salt);
    }
    const user = await User.findOne({id: validated_req.id});
    if (user) {
      const updated_user = await User.findOneAndUpdate(
        {id: user.id},
        {
          $set: validated_req,
          $currentDate: {updatedAt: true},
        },
        {returnOriginal: false}
      );
      const modified_user = updated_user!.toObject() as UserDetails;
      delete modified_user.password;
      delete modified_user._id;
      delete modified_user.image_public_id;

      modified_user.followers = await getUsersFromDB(user.followers);
      modified_user.following = await getUsersFromDB(user.following);

      return sendSuccess(res, 200, modified_user);
    } else {
      // User not found
      return sendError(res, 404, 'User not found');
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error) {
    if (
      (error as {message: string}).message.includes(
        ' E11000 duplicate key error collection: test.users index: username_1 dup key:'
      )
    ) {
      return sendError(res, 409, 'Username already taken');
    }
    console.error(error);
    return sendError(res, 500, 'Internal Server Error');
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const validation = id.validate(req.params);
    if (validation.error)
      return sendError(res, 400, validation.error.details[0].message);

    const validated_req = validation.value as UserDocument;

    const user = await User.findOne({id: validated_req.id, is_deleted: false});
    if (user) {
      const modified_user = user.toObject() as UserDetails;
      delete modified_user.password;
      delete modified_user._id;
      delete modified_user.image_public_id;

      modified_user.followers = await getUsersFromDB(user.followers);
      modified_user.following = await getUsersFromDB(user.following);

      return sendSuccess(res, 200, modified_user);
    } else {
      // User not found
      return sendError(res, 404, 'User not found');
    }
    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error) {
    console.error(error);
    return sendError(res, 500, 'Internal Server Error');
  }
}

export async function getAllUser(req: Request, res: Response) {
  try {
    const modified_users_result = await getAllUserFromDB();
    return sendSuccess(res, 200, modified_users_result);

    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error) {
    console.error(error);
    return sendError(res, 500, 'Internal Server Error');
  }
}

export async function getAllUserPosts(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const modified_posts = await getPostsByUserId([req.user!.id]);
    return sendSuccess(res, 200, {posts: modified_posts});

    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error) {
    console.error(error);
    return sendError(res, 500, 'Internal Server Error');
  }
}

export async function updateUserImage(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    req.body.id = req.params.id;
    const validation = id.validate(req.body);
    if (validation.error)
      return sendError(res, 400, validation.error.details[0].message);

    const validated_req = validation.value as UserDocument;

    const user = await User.findOne({id: validated_req.id, is_deleted: false});

    if (user) {
      const image = req?.files?.picture as UploadedFile;
      if (image) {
        if (user.image_public_id) {
          await deleteImage(user.image_public_id);
        }
        const upload_result = await uploadImage(image);
        validated_req.image = upload_result.secure_url;
        validated_req.image_public_id = upload_result.public_id;
      }

      const updated_user = await User.findOneAndUpdate(
        {id: validated_req.id},
        {
          $set: validated_req,
          $currentDate: {updatedAt: true},
          is_deleted: false,
        },
        {returnOriginal: false}
      );

      const modified_user = updated_user!.toObject() as UserDetails;
      delete modified_user._id;
      delete modified_user.password;
      delete modified_user.image_public_id;

      return sendSuccess(res, 200, {user: modified_user});
    } else {
      return sendError(res, 404, 'User not found');
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error) {
    console.error(error);
    return sendError(res, 500, 'Internal Server Error');
  }
}

export async function suggetionList(req: AuthenticatedRequest, res: Response) {
  try {
    const validation = id.validate({id: req.user!.id});
    if (validation.error)
      return sendError(res, 400, validation.error.details[0].message);

    const validated_req = validation.value;

    const suggetionList = await getUserSuggetionList(validated_req.id);

    return sendSuccess(res, 200, {suggetionList: suggetionList});

    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error) {
    console.error(error);
    return sendError(res, 500, 'Internal Server Error');
  }
}
