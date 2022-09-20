import { model, Schema } from "mongoose";
import { CommentDocument } from "../types/comment";

const CommentSchema = new Schema<CommentDocument>(
  {
    postId: {
      type: Schema.Types.ObjectId,
      required: [true, "Post ID is required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User ID is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

export default model<CommentDocument>("Comment", CommentSchema);
