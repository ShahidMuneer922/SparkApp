/** @format */

import express from "express";
import { addReview, getAllReviews } from "./review.js";
/** @format */

const router = express.Router();

router.post("/addReview", addReview);
router.get("/getAllReviews", getAllReviews);

export default router;
