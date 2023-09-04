/** @format */

import express from "express";
import { addStats, getStats, updateStats } from "./stats.js";
/** @format */

const router = express.Router();

router.post("/addStats", addStats);
router.get("/getStats", getStats);
router.put("/updateStats", updateStats);

export default router;
