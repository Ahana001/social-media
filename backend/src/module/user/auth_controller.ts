import {Request, Response} from 'express';
import {UserDetails, UserDocument} from './type';
import {User} from './models';
import {create_user, login_user} from './validation';
import {sendError, sendSuccess} from '../../utils/handle_response';
import * as bcrypt from 'bcrypt';
import {UserSignToken} from '../../utils/jwt/sign_token';
import {UserType} from '../../utils/types';
import {getUsersFromDB} from './service';

export async function createUser(req: Request, res: Response) {
  try {
    const validation = create_user.validate(req.body);
    if (validation.error)
      return sendError(res, 400, validation.error.details[0].message);

    const validated_req = validation.value as UserDocument;

    const salt = bcrypt.genSaltSync();
    validated_req.password = bcrypt.hashSync(validated_req.password!, salt);
    const totalDocuments = await User.countDocuments();

    const created_user = await User.create({
      ...validated_req,
      id: `USR${totalDocuments + 1}`,
    });
    const token = UserSignToken({
      id: created_user.id,
      user_type: UserType.USER,
    });
    const modified_user = created_user.toObject() as UserDocument;
    delete modified_user.password;
    delete modified_user._id;

    return sendSuccess(res, 201, {user: {...modified_user}, token});

    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error) {
    if (
      (error as {message: string}).message.includes(
        'E11000 duplicate key error collection: test.users index:'
      )
    ) {
      return sendError(res, 409, 'Username already taken');
    }
    return sendError(res, 500, 'Internal Server Error');
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const validation = login_user.validate(req.body);
    if (validation.error)
      return sendError(res, 400, validation.error.details[0].message);

    const validated_req = validation.value as UserDocument;

    const user = await User.findOne({username: validated_req.username});
    if (user) {
      const result = await bcrypt.compare(
        validated_req.password!,
        user.password!
      );
      if (result) {
        const token = UserSignToken({
          id: user.id,
          user_type: UserType.USER,
        });
        const modified_user = user.toObject() as UserDetails;
        delete modified_user.password;
        delete modified_user._id;

        modified_user.followers = await getUsersFromDB(user.followers);
        modified_user.following = await getUsersFromDB(user.following);

        return sendSuccess(res, 200, {user: {...modified_user}, token});
      } else {
        return sendError(res, 401, 'Authorization Error');
      }
    } else {
      return sendError(res, 404, 'User not found');
    }
    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error) {
    return sendError(res, 500, 'Internal Server Error');
  }
}
