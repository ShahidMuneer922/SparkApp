/** @format */
import { File, emailSchema } from "../../models/model.js";
import { v4 as uuidv4 } from "uuid";

export const addPortfolio = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    const uuid = uuidv4();

    const file = req.files.file;
    const { heading, description, url } = req.body;
    const base64Data = await file.data.toString("base64");

    const newFile = new File({
      uuid: uuid,
      name: file.name,
      data: base64Data,
      contentType: file.mimetype,
      heading: heading,
      description: description,
      url: url,
    });
    await newFile.save();
    console.log(newFile);
    console.log(file);
    res.status(200).json({ message: "File uploaded successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something Went Wrong" });
  }
};

export const getAllFiles = async (req, res) => {
  try {
    const files = await File.find();

    if (!files || files.length === 0) {
      return res.status(404).json({ error: "No files found" });
    }
    return res.json(files);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving the files" });
  }
};

export const getFile = async (req, res) => {
  try {
    const fileName = req.query.uuid;

    const file = await File.findOne({ uuid: fileName });
    const totalEmails = await emailSchema.find({ idOfVacancy: file.id });
    console.log("length", totalEmails.length);
    if (!file) {
      return res.status(404).send("File not found");
    }
    // ///////////// THIS IS FOR DOWNLOADING IMAGE /////////////////////////////
    // res.setHeader("Content-Type", file.contentType);
    // res.setHeader("Content-Disposition", `attachment; filename=${file.name}`);
    res.status(200).json(file);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving the file" });
  }
};

export const updatePortfolio = async (req, res) => {
  try {
    let file;
    const uuid = req.query.uuid;
    const { heading, description } = req.body;
    if (req.files) {
      file = req.files.file;
    }

    const existingFile = await File.findOne({ uuid });

    if (!existingFile) {
      return res.status(404).json({ message: "Portfolio item not found" });
    }

    if (heading) {
      existingFile.heading = heading;
    }

    if (description) {
      existingFile.description = description;
    }
    if (file) {
      const base64Data = await file.data.toString("base64");
      existingFile.name = file.name;
      existingFile.data = base64Data;
      existingFile.contentType = file.mimetype;
    }
    await existingFile.save();

    res.status(200).json({ message: "Portfolio item updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Something went wrong while updating" });
  }
};

// export const
