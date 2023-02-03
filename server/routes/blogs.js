import express from "express";
import {getAllBlogs, getUserBlogs, } from "../controllers/blogs.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getAllBlogs);
router.get("/:userId/blogs", verifyToken, getUserBlogs);


export default router;