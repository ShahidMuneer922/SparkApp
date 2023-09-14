/** @format */

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import statsRouter from "./controller/stats/statsRoutes.js";
import portfolioRouter from "./controller/portfolio/portfolioRoutes.js";
import reviewsRouter from "./controller/reviews/reviewsRoutes.js";
import teamRouter from "./controller/team/teamRoutes.js";
import emailRouter from "./controller/email/emailRoutes.js";
import vancanyRouter from "./controller/vacancies/vacanciesRoutes.js";
import adminRouter from "./controller/admin-login/adminRoutes.js";

const doten = dotenv.config();
import fileUpload from "express-fileupload";
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(fileUpload());
app.use("/", statsRouter);

app.use("/api", statsRouter);
app.use("/api", portfolioRouter);
app.use("/api", reviewsRouter);
app.use("/api", teamRouter);
app.use("/api", emailRouter);
app.use("/api", vancanyRouter);
app.use("/api", adminRouter);

mongoose
  .connect(
    "mongodb+srv://admin:Pakistan0335@backend.0nuohli.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => app.listen(PORT))
  .then(
    console.log(`CONNECTED TO DATABASE AND LISTENING TO PORT localhost:${PORT}`)
  )
  .catch((err) => console.log("ERROR CONECTION TO DATABASE", err));

//Pakistan0335

// try {
//   app.listen(8000);
//   console.log("connected");
// } catch {
//   (err) => {
//     console.log(err);
//   };
// }
