import express from 'express';
import * as post_controller from './controller';
import * as user_controller from '../user/controller';
import * as like_controller from './like_controller';
import {authenticate_user} from '../../utils/jwt/authenticate';

// import {authenticate_user} from '../../utils/jwt/authenticate';

const user_routes = express.Router();
const open_routes = express.Router();

user_routes.post('/', authenticate_user, post_controller.createPost);
user_routes.put('/:id', authenticate_user, post_controller.updatePost);
user_routes.get('/', authenticate_user, post_controller.getAllPost);
user_routes.get('/:id', authenticate_user, post_controller.getPost);

user_routes.get('/post', authenticate_user, user_controller.getAllUserPosts);

user_routes.get('/like/:id', authenticate_user, like_controller.likePost);
user_routes.get(
  '/unlike/:id',
  authenticate_user,
  like_controller.removelikePost
);

export default {user_routes, open_routes};
