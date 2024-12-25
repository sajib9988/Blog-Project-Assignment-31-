  import AppError from "../../utils/AppError";
import { Blog } from "../blog/blog.model";
import User from "../user/user.model";


const blockUserFromDB = async (_id: string) => {
  const isUserExist = await User.findById(_id);
  if (!isUserExist) {
    throw new AppError(404, "User not found from service");
  }

  const result = await User.findOneAndUpdate({ _id }, { isBlocked: true });
  return result;
};

const deleteBlogFromDB = async (_id: string) => {
  const isUserExist = await Blog.findById(_id);
  if (!isUserExist) {
    throw new AppError(404, "User not found");
  }

  const result = await Blog.deleteOne({_id});
  return result;
};

export const adminServices = {
  blockUserFromDB,
  deleteBlogFromDB,
};
