import express from "express";
import { review, addRewiew } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/review", review);
router.post("/reviewWrite", addRewiew);

export default router;
