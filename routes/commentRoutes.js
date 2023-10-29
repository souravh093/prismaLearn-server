import { Router } from "express";
import {
  createComment,
  deleteComment,
  fetchComment,
  singleComment,
  updateComment,
} from "../Controller/CommentController.js";

const router = Router();

router.get("/", fetchComment);
router.get("/:id", singleComment);
router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
