import express from 'express';
import { loginCompanyUser,signupCompanyUser } from '../controllers/companyUserController.js';

const companyUserRouter = express.Router();

userRouter.post('/signup',signupCompanyUser)
userRouter.post('/login',loginCompanyUser)

export default companyUserRouter;