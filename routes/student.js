import express from "express";
import authUser from "../middleware/auth.js";

import {
  registerStudentDetails,
  editStudentDetails,
  getAllStudentDetails,
  getInternships
} from "../controllers/studentController.js";
const studentRouter = express.Router();

studentRouter.post("/register", authUser, registerStudentDetails);
studentRouter.post("/edit", authUser, editStudentDetails);
studentRouter.get("/getall", getAllStudentDetails);
studentRouter.get("/getInternships",getInternships);

export default studentRouter;
