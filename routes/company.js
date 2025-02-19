import express from 'express';

const companyRouter=express.Router();

import { addEmployee,createTeam,getTeam,getEmployee } from '../controllers/companyController.js';

companyRouter.post("/addMember",addEmployee);
companyRouter.post("/createTeam",createTeam);
companyRouter.get("/team",getTeam);
companyRouter.get("/member",getEmployee);

export default companyRouter;