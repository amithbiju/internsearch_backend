import express from "express";
import authUser from "../middleware/auth.js";
const companyRouter = express.Router();

import {
  addEmployee,
  createTeam,
  getTeam,
  getEmployees,
  deleteEmployee,
  registerCompanyDetails,
  editCompanyDetails,
  getTeamNames,
  postInternship,
  getInternships
} from "../controllers/companyController.js";
companyRouter.post("/register", authUser, registerCompanyDetails);
companyRouter.post("/edit", authUser, editCompanyDetails);
companyRouter.post("/addMember", authUser, addEmployee);
companyRouter.post("/createTeam", authUser, createTeam);
companyRouter.get("/team", authUser, getTeam);
companyRouter.get("/teamnames", authUser, getTeamNames);
companyRouter.get("/members", authUser, getEmployees);
companyRouter.delete("/deleteIntern", authUser, deleteEmployee);
companyRouter.post("/post",authUser, postInternship);
companyRouter.get("/getInternships",authUser, getInternships);

export default companyRouter;
