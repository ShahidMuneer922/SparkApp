/** @format */

import { vacanciesSchema } from "../../models/model.js";

export const addVacancy = async (req, res) => {
  try {
    const { title, intro, roles, qualifications, perks } = req.body;
    const role = roles ? JSON.parse(roles) : [];
    const qualification = qualifications ? JSON.parse(qualifications) : [];
    const perk = perks ? JSON.parse(perks) : [];

    const newVacancy = new vacanciesSchema({
      title,
      intro,
      roles: role,
      qualifications: qualification,
      perks: perk,
    });

    await newVacancy.save();
    return res.status(200).json({ message: "Vacancy added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "SOMETHING WENT WRONG" });
  }
};

export const getVacancies = async (req, res) => {
  try {
    const vacancies = await vacanciesSchema.find();

    if (vacancies.length === 0) {
      return res.status(404).json({ message: "No vacancies found" });
    }
    return res.status(200).json(vacancies);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const idsAndTitleGet = async (req, res) => {
  try {
    const vacancies = await vacanciesSchema.find();

    if (vacancies.length === 0) {
      return res.status(404).json({ message: "No vacancies found" });
    }

    const result = vacancies.map((vacancy) => ({
      id: vacancy._id,
      title: vacancy.title,
    }));

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
