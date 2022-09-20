import { Request, Response } from "express";
import PostModel from "../models/post";

export const getPosts = async (req: Request, res: Response) => {
  const posts = await PostModel.find();
  res.status(200).json(posts);
};

export const createPost = async (req: Request, res: Response) => {
  const { title, content, userId } = req.body;
  const post = new PostModel({
    title,
    content,
    userId,
  });
  await post.save();
  res.status(201).json(post);
};

export const updatePost = async (req: Request, res: Response) => {
  const post = await PostModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(post);
};

export const deletePost = async (req: Request, res: Response) => {
  await PostModel.findByIdAndDelete(req.params.id);
  res.status(204).json(null);
};
