import { Router } from "express";
import {
  createPost,
  deletePost,
  fetchPosts,
  searchPost,
//   singlePost,
  updatePost,
} from "../Controller/Postcontroller.js";

const router = Router();

router.get("/", fetchPosts);
// router.get("/:id", singlePost);
router.get("/search", searchPost);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
