/** @format */

import { reviews } from "../../models/model.js";

export const addReview = async (req, res) => {
  try {
    const { clientName, language, description, rating } = req.body;

    const newFile = new reviews({
      clientName: clientName,
      language: JSON.parse(language),
      description: description,
      rating: parseFloat(rating),
    });
    await newFile.save();
    console.log(newFile);
    if (req.files) {
      const file = req.files.file;
      const base64Data = await file.data.toString("base64");
      newFile.fileName = file.name;
      newFile.data = base64Data;
      newFile.contentType = file.contentType;
      await newFile.save();
    }
    res.status(200).json({ message: "File uploaded successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something Went Wrong" });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const allReviews = await reviews.find();

    if (!allReviews || allReviews.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }
    res.status(200).json({ reviews: allReviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
