import express from "express";
const internshipRouter=express.Router();
import{getInternships} from "../controllers/internships.js";

internshipRouter.get("/internships",getInternships);

export default internshipRouter;