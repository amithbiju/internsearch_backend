import express from 'express';

const studentRouter=express.Router();

studentRouter.post("/register",registerStudentDetails);
studentRouter.post("/edit",editStudentDetails);
studentRouter.get("/getall",getAllStudentDetails);

export default studentRouter;