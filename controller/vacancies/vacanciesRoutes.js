/** @format */

import express from "express";
import {
  addVacancy,
  getVacancies,
  idsAndTitleGet,
  updateVacancy,
  deleteVacancy,
} from "./vacancies.js";
/** @format */

const router = express.Router();

router.post("/addVanacy", addVacancy);
router.get("/getVacancies", getVacancies);
router.get("/idsAndTitleGet", idsAndTitleGet);
router.put("/updateVacancy", updateVacancy);
router.delete("/deleteVacancy", deleteVacancy);

export default router;
