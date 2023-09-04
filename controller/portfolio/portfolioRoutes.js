/** @format */

import express from "express";
import {
  addPortfolio,
  getAllFiles,
  getFile,
  updatePortfolio,
} from "./portfolio.js";
/** @format */

const router = express.Router();
router.put("/addPortfolio", addPortfolio);
router.get("/get", getAllFiles);
router.get("/getFile", getFile);
router.put("/updateFile", updatePortfolio);

export default router;
