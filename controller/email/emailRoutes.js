/** @format */

import express from "express";
import { sendMail } from "./email.js";
/** @format */

const router = express.Router();
router.post("/sendMail", sendMail);

export default router;
