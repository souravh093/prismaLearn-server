import { Router } from "express";
import UserRoutes from "./userRoutes.js";
import PostRoutes from "./postRoutes.js";
import CommentRoutes from "./commentRoutes.js";
const router = Router();

// for user
router.use("/api/user", UserRoutes);

// for post
router.use("/api/post", PostRoutes);

// for comment
router.use("/api/comment", CommentRoutes);

export default router;
