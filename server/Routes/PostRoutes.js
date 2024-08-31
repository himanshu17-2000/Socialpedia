import express from "express";
import {
  createPost,
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../Controllers/PostController.js";
import { verifyToken } from "../Middleware/AuthMiddleWare.js";
import upload from "../multer-config.js";
const postRoutes = new express.Router();

postRoutes.get("/", verifyToken, getFeedPosts);
postRoutes.get("/:userId/all", verifyToken, getUserPosts);
postRoutes.patch("/:id/like", verifyToken, likePost);
postRoutes.post("/post", verifyToken, upload.single("picture"), createPost);

export default postRoutes;
