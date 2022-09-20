import { ObjectId } from "mongoose";
import { Category } from "./category.enum";

export interface Post {
  userId: ObjectId;
  content: string;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostDocument extends Post, Document {}
