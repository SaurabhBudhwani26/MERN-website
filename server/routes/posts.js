import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";


const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
// this will grab the user feed when we are on homepage
// this is gonna take every single post in database and show you
router.get("/:userID/posts", verifyToken, getUserPosts);
// this is going to grab all the posts by the user

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);


export default router;


