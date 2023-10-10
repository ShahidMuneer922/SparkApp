/** @format */

import express from "express";
import {
  sendMail,
  sendMailBySparkai,
  getEmailById,
  getAllEmails,
} from "./email.js";

const router = express.Router();
router.post("/sendMail", sendMail);
router.post("/sendMailBySparkai", sendMailBySparkai);
router.get("/getEmailById", getEmailById);
router.get("/getAllEmails", getAllEmails);

export default router;
