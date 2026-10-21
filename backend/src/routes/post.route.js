import express from "express";
import { post } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/feed", post);

export default router;
