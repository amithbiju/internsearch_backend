import express from 'express';

const companyRouter=express.Router();

companyRouter.post("/addMember",addEmployee);
companyRouter.post("/createTeam",createTeam);
companyRouter.get("/team",getTeam);
companyRouter.get("/member",getEmployee);

export default companyRouter;