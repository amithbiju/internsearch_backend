import express from "express";
import authUser from "../middleware/auth.js";

import {
  registerStudentDetails,
  editStudentDetails,
  getAllStudentDetails,
} from "../controllers/studentController.js";
const studentRouter = express.Router();

studentRouter.post("/register", authUser, registerStudentDetails);
studentRouter.post("/edit", authUser, editStudentDetails);
studentRouter.post("/getall", getAllStudentDetails);

export default studentRouter;
