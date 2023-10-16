/** @format */

import { teamsSchema } from "../../models/model.js";

export const addTeam = async (req, res) => {
  try {
    const { rank, position, name } = req.body;

    if (!req.files || !req.files.file) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    const file = req.files.file;
    const base64 = file.data.toString("base64");

    const newTeam = await teamsSchema.create({
      rank,
      position,
      name,
      image: base64,
    });

    return res
      .status(201)
      .json({ message: "Team added successfully", team: newTeam });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTeam = async (req, res) => {
  try {
    const { rank, position, name } = req.body;
    const { teamId } = req.query;

    const existingTeam = await teamsSchema.findById(teamId);
    if (!existingTeam) {
      return res.status(404).json({ message: "Team not found" });
    }

    if (req.files) {
      const file = req.files.file;
      const base64 = await file.data.toString("base64");
      existingTeam.image = base64;
    }
    if (rank) {
      existingTeam.rank = rank;
    }
    if (position) {
      existingTeam.position = position;
    }
    if (name) {
      existingTeam.name = name;
    }
    await existingTeam.save();
    return res.status(200).json({ message: "Updated Successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something Went Wrong" });
  }
};

export const getAllTeams = async (req, res) => {
  let page;
  let teams;
  try {
    if (!req.query.page) {
      teams = await teamsSchema.find();
    } else {
      page = req.query.page || 1;
      const perPage = req.query.limit || 5;

      teams = await teamsSchema
        .find()
        .skip((page - 1) * perPage)
        .limit(perPage);
    }
    const count = await teamsSchema.countDocuments();

    res.status(200).json({ teams, count, page: Number(page) });
  } catch (err) {
    console.error(err);
    const error = JSON.stringify(err);
    res.status(400).json({ message: "Something went wrong", error: error });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    const { teamId } = req.query;

    const deletedTeam = await teamsSchema.findByIdAndRemove(teamId);

    if (!deletedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json({ message: "Team deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
