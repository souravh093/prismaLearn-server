import { Router } from "express";
import { createUser, updateUser } from "../Controller/UserController.js";
const router = Router();

// create user
router.post("/", createUser);
router.put("/:id", updateUser);

export default router;
