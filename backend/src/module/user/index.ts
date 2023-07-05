import express from 'express';
import * as user_controller from './controller';
import * as auth_controller from './auth_controller';
import * as follow_controller from './follow_controller';

import {authenticate_user} from '../../utils/jwt/authenticate';

const user_routes = express.Router();
const open_routes = express.Router();

open_routes.post('/auth/register', auth_controller.createUser);
open_routes.post('/auth/login', auth_controller.loginUser);

user_routes.put('/:id', authenticate_user, user_controller.updateUser);
user_routes.put('image/:id', authenticate_user, user_controller.updateUser);
user_routes.get(
  '/suggestionlist',
  authenticate_user,
  user_controller.suggetionList
);
user_routes.get('/post', authenticate_user, user_controller.getAllUserPosts);
user_routes.get('/', authenticate_user, user_controller.getAllUser);
user_routes.get('/:id', authenticate_user, user_controller.getUser);

user_routes.post(
  '/follow/:id',
  authenticate_user,
  follow_controller.followUser
);
user_routes.post(
  '/unfollow/:id',
  authenticate_user,
  follow_controller.unfollowUser
);

export default {user_routes, open_routes};
