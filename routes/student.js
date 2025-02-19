import express from 'express';

import { registerStudentDetails,editStudentDetails,getAllStudentDetails } from '../controllers/studentController.js';
const studentRouter=express.Router();

studentRouter.post("/register",registerStudentDetails);
studentRouter.post("/edit",editStudentDetails);
studentRouter.get("/getall",getAllStudentDetails);

export default studentRouter;