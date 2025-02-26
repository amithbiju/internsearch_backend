import express from 'express';


import { loginCompanyUser,signupCompanyUser } from '../controllers/companyUserController.js';

const companyUserRouter = express.Router();

companyUserRouter.post('/signup',signupCompanyUser)
companyUserRouter.post('/login',loginCompanyUser)

export default companyUserRouter;