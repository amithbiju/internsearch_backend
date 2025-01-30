import express from 'express';
import { loginStudentUser,signupStudentUser } from '../controllers/studentUserController.js';

const studentUserRouter = express.Router();

studentUserRouter.post('/signup',signupStudentUser)
studentUserRouter.post('/login',loginStudentUser)


export default studentUserRouter;