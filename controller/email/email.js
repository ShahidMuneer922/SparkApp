/** @format */

import { transporter } from "./utils.js";
import { emailSchema } from "../../models/model.js";

export const sendMail = async (req, res) => {
  let file;
  if (req.files) {
    file = req.files.file;
    console.log(file);
  }
  const { coverLetter, name, extra, email, phone } = req.body;
  var mailOptions = {
    from: "shahidmuneerawan@gamil.com",
    to: email,
    attachments: [
      {
        filename: file.name,
        content: file.data,
      },
    ],
  };
  try {
    await transporter.sendMail(
      {
        ...mailOptions,
        subject: `Job Application - ${name}`,
        text: "Hi",
        html: `<body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
    <div style="background-color: #F5F5F5; padding: 20px;">
      <div style="background-color: #FFFFFF; border-radius: 10px; padding: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <h2>Job Application</h2>
        <p>Dear Hiring Manager,</p>
        <p>I am writing to express my interest ${
          extra ? `for the position of ${extra}` : ""
        } at <strong>SparkAi</strong>. Here are my details:</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
        </ul>
        ${
          coverLetter
            ? `<p>Cover Letter:</p>
        <p>${coverLetter}</p>`
            : ""
        }
        <p>Thank you for considering my application. I look forward to the opportunity to discuss my qualifications further.</p>
        <p>Sincerely,<br>${name}</p>
      </div>
    </div>
  </body>`,
      },
      function (error, info) {
        if (error) {
          console.log(error);
          return res.status(400).json({ error });
        } else {
          console.log("Email sent: " + info.response);
          return res.status(200).json({ message: "Email sent successfully" });
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "SOMETHING WENT WRONG", err });
  }
};

export const sendMailBySparkai = async (req, res) => {
  const { subject, email, body, name } = req.body;
  var mailOptions = {
    from: "shahidmuneerawan@gamil.com",
    to: email,
  };
  try {
    await transporter.sendMail(
      {
        ...mailOptions,
        subject: subject,

        html: body,
      },
      async function (error, info) {
        if (error) {
          console.log(error);
          return res.status(400).json({ error });
        } else {
          console.log("Email sent: " + info.response);
          const newEmail = new emailSchema({
            subject: subject,
            email: email,
            body: body,
            name: name,
          });
          await newEmail.save();
          return res.status(200).json({ message: "Email sent successfully" });
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "SOMETHING WENT WRONG", err });
  }
};

export const getEmailById = async (req, res) => {
  const emailId = req.query.id;

  try {
    const email = await emailSchema.findById(emailId);

    if (!email) {
      return res.status(404).json({ message: "Email not found" });
    }

    return res.status(200).json(email);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllEmails = async (req, res) => {
  try {
    const emails = await emailSchema.find();

    return res.status(200).json(emails);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
