/** @format */

import express from "express";

import { getAllTeams } from "../team/team.js";
/** @format */

const router = express.Router();

router.get("/getAllTeams", getAllTeams);

export default router;
