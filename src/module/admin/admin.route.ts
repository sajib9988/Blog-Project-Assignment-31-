import express from "express";
import { adminControllers } from "./admin.controller";
import auth from "../../middlewares/auth";

import { USER_ROLE } from './../user/user.constants';
const route = express.Router();

route.patch(
  "/users/:userId/block",
  auth(USER_ROLE.admin),
  adminControllers.blockUser,
);

route.delete("/blogs/:id",
     auth(USER_ROLE.admin),
 adminControllers.deleteBlog);

export const adminRoutes = route;
