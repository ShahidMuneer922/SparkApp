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
