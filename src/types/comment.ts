import { ObjectId } from "mongoose";

export interface Comment {
  postId: ObjectId;
  userId: ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentDocument extends Comment, Document {}
