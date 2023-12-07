import express from "express";

import {
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controllers/postController.js";
import { verifyToken } from "../middleware/auth.js";

const postRoutes = express.Router();

// Read

postRoutes.get("/", verifyToken, getFeedPosts);
postRoutes.get("/:userId/posts", verifyToken, getUserPosts);
// update
postRoutes.patch("/:id/like", verifyToken, likePost);

export default postRoutes;
