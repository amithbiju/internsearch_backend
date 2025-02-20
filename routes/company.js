import express from 'express';
import authUser from '../middleware/auth.js';
const companyRouter=express.Router();

import { addEmployee,createTeam,getTeam,getEmployee } from '../controllers/companyController.js';

companyRouter.post("/addMember",authUser,addEmployee);
companyRouter.post("/createTeam",authUser,createTeam);
companyRouter.get("/team",authUser,getTeam);
companyRouter.get("/member",authUser,getEmployee);

export default companyRouter;