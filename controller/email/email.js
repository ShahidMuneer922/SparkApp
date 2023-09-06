/** @format */

import nodemailer from "nodemailer";
import { transporter } from "./utils.js";

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
