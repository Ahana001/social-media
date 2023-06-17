import express from 'express';
import user_routes from './user';
import post_routes from './post';
const routes = express.Router();

routes.use('/user', user_routes.open_routes);
routes.use('/user', user_routes.user_routes);

routes.use('/post', post_routes.open_routes);
routes.use('/post', post_routes.user_routes);

export default routes;
