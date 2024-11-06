import express from "express";
import { createtweet, deletetweet, likeOrDislike, getAllTweets, getFollowingTweets } from "../controllers/tweetController.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();

router.route("/create").post(isAuthenticated ,createtweet);
router.route("/create").post(isAuthenticated ,createtweet);
router.route("/delete/:id").delete(isAuthenticated, deletetweet)
router.route("/like/:id").put(isAuthenticated,likeOrDislike)
router.route("/alltweets/:id").get(isAuthenticated, getAllTweets)
router.route("/followingtweets/:id").get(isAuthenticated, getFollowingTweets)

export default router;

//klshshkibdlknvnlkerlkner