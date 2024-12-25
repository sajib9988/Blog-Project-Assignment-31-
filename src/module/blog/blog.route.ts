import express from 'express';
import { blogControllers } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidateSchema, UpdateBlogValidateSchema } from './blog.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';


const blogRoute = express.Router();

// User can create a blog
blogRoute.post(
  '/',
  auth(USER_ROLE.user), // Only users can create blogs
  validateRequest(BlogValidateSchema),
  blogControllers.createBlog
);

// Admin can get all blogs, users can get only their own blogs
blogRoute.get(
  '/',
  // auth(USER_ROLE.user, USER_ROLE.admin),
  blogControllers.getAllBlog
);

// Admin can update any blog, users can update their own blogs
blogRoute.patch(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin), // Auth for both roles
  validateRequest(UpdateBlogValidateSchema),
  blogControllers.updateBlog
);

// Admin can delete any blog, users can delete their own blogs
blogRoute.delete(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin), // Auth for both roles
  blogControllers.deleteBlog
);

export const blogRoutes = blogRoute;
