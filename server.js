import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import companyUserRouter from "./routes/companyUser.js"; //register login signup
import studentUserRouter from "./routes/studentUser.js"; //register login signup
import studentRouter from "./routes/student.js"; //student
import companyRouter from "./routes/company.js"; //company
import internRouter from "./routes/intern.js";
import internshipRouter from "./routes/internship.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/studentUser", studentUserRouter);
app.use("/api/companyUser", companyUserRouter);
app.use("/api/student", studentRouter);
app.use("/api/company", companyRouter);
app.use("/api/intern", internRouter);
app.use("/api/internship",internshipRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log("Server started on PORT : " + port));
