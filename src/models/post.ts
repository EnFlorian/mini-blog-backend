import { model, Schema } from "mongoose";
import { Category } from "../types/category.enum";
import { PostDocument } from "../types/post";

const PostSchema = new Schema<PostDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User ID is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    category: {
      type: String,
      default: Category.GENERAL,
      required: [true, "Category is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

export default model<PostDocument>("Post", PostSchema);
