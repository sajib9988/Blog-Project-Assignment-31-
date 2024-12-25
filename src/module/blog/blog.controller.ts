import { Request, Response } from "express";
import { blogServices } from "./blog.service";
import { Types } from "mongoose";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user as Types.ObjectId; // Ensure this is ObjectId
  const result = await blogServices.createBlogIntoDB(req.body, userId);

  sendResponse(res, {
    statusCode: 201,
    status: true,
    message: "Blog created successfully",
    data: result,
  });
});

const getAllBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.getAllBlogFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    status: true,
    message: "Blogs fetched successfully",
    data: result,
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user as Types.ObjectId;
  const { id } = req.params;
  const result = await blogServices.updateBlogIntoDB(id, req.body, userId);

  sendResponse(res, {
    statusCode: 200,
    status: true,
    message: "Blog updated successfully",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user as Types.ObjectId;
  const { id } = req.params;
  await blogServices.deleteBlogFromDB(id, userId);

  res.status(200).json({
    success: true,
    message: "Blog deleted successfully",
    statusCode: 200,
  });
});

export const blogControllers = {
  createBlog,
  getAllBlog,
  updateBlog,
  deleteBlog,
};
