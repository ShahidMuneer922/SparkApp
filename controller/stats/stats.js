/** @format */

import { statsSchema } from "../../models/model.js";

export const addStats = async (req, res) => {
  try {
    let existingUser;
    try {
      existingUser = await statsSchema.find({});
      console.log(existingUser[0]);
    } catch (err) {
      console.log(err);
    }
    if (existingUser[0]) {
      console.log("existing Statas");
      return res.status(400).json({
        success: false,
        message: "Admin Already Added Stats Please Updatae Stats",
      });
    }
    const { satisfiedClient, projectsCompleted, countries } = req.body;
    const currentYear = new Date().getFullYear();
    const companyStarted = 2020;
    const totalExperience = currentYear - companyStarted;
    const stats = new statsSchema({
      satisfiedClient,
      projectsCompleted,
      countries,
      totalExperience,
    });
    try {
      stats.save();
    } catch (err) {
      return res.status(400).json({ message: "Something went wrong" });
    }
    res.status(200).json({ message: "Data saved succesfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something Went worng",
      error: err,
    });
  }
};

export const getStats = async (req, res) => {
  try {
    const existingStats = await statsSchema.findOne();
    if (!existingStats) {
      return res.status(404).json({
        success: false,
        message: "Statistics data not found",
      });
    }

    res.status(200).json({
      success: true,
      data: existingStats,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

export const updateStats = async (req, res) => {
  try {
    const statsId = req.query.id;
    const { satisfiedClient, projectsCompleted, countries } = req.body;

    const updatedStats = await statsSchema.findByIdAndUpdate(
      statsId,
      {
        satisfiedClient,
        projectsCompleted,
        countries,
      },
      { new: true }
    );

    if (!updatedStats) {
      return res.status(404).json({
        success: false,
        message: "Statistics data not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedStats,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};
