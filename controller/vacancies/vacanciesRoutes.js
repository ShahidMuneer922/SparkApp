/** @format */

import express from "express";
import { addVacancy, getVacancies, idsAndTitleGet } from "./vacancies.js";
/** @format */

const router = express.Router();

router.post("/addVanacy", addVacancy);
router.get("/getVacancies", getVacancies);
router.get("/idsAndTitleGet", idsAndTitleGet);

export default router;
