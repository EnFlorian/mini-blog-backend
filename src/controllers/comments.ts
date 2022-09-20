import { Request, Response } from "express";
import CommentModel from "../models/comment";

export const createComment = async (req: Request, res: Response) => {
  const { content, postId } = req.body;
  const comment = new CommentModel({
    content,
    postId,
  });
  await comment.save();
  res.status(201).json(comment);
};

export const getComments = async (req: Request, res: Response) => {
  const comments = await CommentModel.find();
  res.status(200).json(comments);
};

export const getCommentsForPost = async (req: Request, res: Response) => {
  const comments = await CommentModel.find({ postId: req.params.postId });
  res.status(200).json(comments);
};

export const updateComment = async (req: Request, res: Response) => {
  const comment = await CommentModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(comment);
};

export const deleteComment = async (req: Request, res: Response) => {
  await CommentModel.findByIdAndDelete(req.params.id);
  res.status(204).json(null);
};
