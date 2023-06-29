import express from 'express';
import * as post_controller from './controller';
import * as like_controller from './like_controller';
import * as bookmark_controller from './bookmark_controller';
import {authenticate_user} from '../../utils/jwt/authenticate';

// import {authenticate_user} from '../../utils/jwt/authenticate';

const user_routes = express.Router();
const open_routes = express.Router();

user_routes.post('/', authenticate_user, post_controller.createPost);
user_routes.delete('/:id', authenticate_user, post_controller.deletePost);
user_routes.put('/:id', authenticate_user, post_controller.updatePost);
user_routes.get('/', authenticate_user, post_controller.getAllPost);
user_routes.get('/:id', authenticate_user, post_controller.getPost);

user_routes.post('/like/:id', authenticate_user, like_controller.likePost);
user_routes.post(
  '/dislike/:id',
  authenticate_user,
  like_controller.removelikePost
);

user_routes.post(
  '/bookmark/:id',
  authenticate_user,
  bookmark_controller.bookmarkPost
);
user_routes.post(
  '/unbookmark/:id',
  authenticate_user,
  bookmark_controller.removeBookmarkPost
);

export default {user_routes, open_routes};
