import {Request, Response, NextFunction} from 'express';
import {sendError} from '../handle_response';
import * as secretStore from '../../utils/secret_manager';
import {User, UserType} from '../types';
import jwt from 'jsonwebtoken';

async function authenticate_jwt(
  req: Request,
  res: Response
): Promise<User | undefined> {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  let result: User | undefined;

  if (!token) {
    sendError(res, 401, 'Authorization Error');
  } else {
    const promis = new Promise(resolve => {
      jwt.verify(token, secretStore.getSecret('JWT_SECRET'), (err, user) => {
        if (err) {
          sendError(res, 401, 'Authorization Error');
        } else {
          if (!user) {
            sendError(res, 403, 'Forbidden');
          } else {
            resolve(user);
          }
        }
      });
    });
    result = (await promis) as User;
  }
  return result;
}

export interface AuthenticatedRequest extends Request {
  user?: User;
}

async function authenticate_user_type(
  req: AuthenticatedRequest,
  res: Response,
  user_type: string
): Promise<AuthenticatedRequest | undefined> {
  const user = await authenticate_jwt(req, res);
  if (user) {
    if (user.user_type !== user_type) {
      sendError(res, 403, 'forbidden');
    } else {
      req.user = user;
      return req;
    }
  }
  return undefined;
}

export async function authenticate_user(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const rq = await authenticate_user_type(req, res, UserType.USER);
  if (rq) {
    req = rq;
    next();
  }
}
