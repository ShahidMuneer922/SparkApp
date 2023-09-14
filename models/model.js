/** @format */

import mongoose from "mongoose";

const statsSchemas = new mongoose.Schema({
  satisfiedClient: String,
  projectsCompleted: String,
  totalExperience: String,
  countries: String,
});

export const statsSchema = mongoose.model("stats", statsSchemas);

const fileSchema = new mongoose.Schema({
  name: String,
  data: String,
  contentType: String,
  uuid: String,
  heading: String,
  description: String,
});

export const File = mongoose.model("File", fileSchema);

const reviewsSchema = new mongoose.Schema({
  clientName: String,
  fileName: String,
  data: String,
  contentType: String,
  language: Array,
  description: String,
  rating: Number,
});

export const reviews = mongoose.model("reviews", reviewsSchema);

const teamSchema = new mongoose.Schema({
  category: String,
  image: String,
  name: String,
  rank: String,
});
export const teamsSchema = mongoose.model("team", teamSchema);

const vacancySchema = new mongoose.Schema({
  title: String,
  intro: String,
  roles: Array,
  qualifications: Array,
  perks: Array,
});
export const vacanciesSchema = mongoose.model("vacancy", vacancySchema);

const userSchemas = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
});

export const userSchema = mongoose.model("User", userSchemas);
