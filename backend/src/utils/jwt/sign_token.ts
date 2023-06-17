import {User} from '../types';
import * as secretStore from '../../utils/secret_manager';
import jwt from 'jsonwebtoken';

export function UserSignToken(entity: User) {
  return jwt.sign(entity, secretStore.getSecret('JWT_SECRET'), {
    expiresIn: '1hr',
  });
}
