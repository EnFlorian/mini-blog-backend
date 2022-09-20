// create routes for comments

import { Router } from "express";
import { createComment, deleteComment, getComments, updateComment, getCommentsForPost } from "../controllers/comments";

const router = Router();

router.get("/", getComments);
router.get("/:postId", getCommentsForPost);
router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
