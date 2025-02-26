import express from "express";
import authUser from "../middleware/auth.js";
const companyRouter = express.Router();

import {
  addEmployee,
  createTeam,
  getTeam,
  getEmployees,
  getTeamNames,
} from "../controllers/companyController.js";

companyRouter.post("/addMember", authUser, addEmployee);
companyRouter.post("/createTeam", authUser, createTeam);
companyRouter.get("/team", authUser, getTeam);
companyRouter.get("/teamnames", authUser, getTeamNames);
companyRouter.get("/members", authUser, getEmployees);

export default companyRouter;
