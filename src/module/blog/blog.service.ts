import QueryBuilder from '../../builder/querybuilder';
import { Blog } from './blog.model';
import { TBlog } from './blog.interface';
import { Types } from 'mongoose';
import AppError from '../../utils/AppError';

 
const createBlogIntoDB = async (payload: TBlog, userId: Types.ObjectId) => {
  payload.author = userId; // Pass only the ObjectId
  const createBlog = await Blog.create(payload);

  const result = await Blog.findById(createBlog._id).populate({
    path: 'author',
    select: '-password',
  });

  return result;
};


const getAllBlogFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = ['title', 'content'];

  const blogQuery = new QueryBuilder(
    Blog.find().populate({ path: 'author', select: '-password' }),
    query
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .select();

  // Avoid executing query twice; ensure execution only happens here:
  const result = await blogQuery.modelQuery; // Single execution point
  return result;
};















const updateBlogIntoDB = async (
  blogId: string,
  payload: Partial<TBlog>,
  userId: Types.ObjectId
) => {
  const isBlogExist = await Blog.findById(blogId);
  if (!isBlogExist) {
    throw new AppError(404, 'Blog not found');
  } else if (isBlogExist.author.toString() !== userId.toString()) {
    throw new AppError(403, 'You do not have permission to update this data');
  }

  const result = await Blog.findOneAndUpdate({ _id: blogId }, payload, {
    new: true,
    runValidators: true,
  }).populate({ path: 'author', select: '-password' });

  return result;
};

const deleteBlogFromDB = async (blogId: string, userId: Types.ObjectId) => {
  const isBlogExist = await Blog.findById(blogId);
  if (!isBlogExist) {
    throw new AppError(404, 'Blog not found');
  } else if (isBlogExist.author.toString() !== userId.toString()) {
    throw new AppError(403, 'You do not have permission to delete this data');
  }

  await Blog.deleteOne({ _id: blogId });
  return { message: 'Blog deleted successfully' };
};

export const blogServices = {
  createBlogIntoDB,
  getAllBlogFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
