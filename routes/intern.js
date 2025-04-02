import express from "express";

const internRouter = express.Router();

import {
  getinterns,
  getRecommendedForStudents,
} from "../controllers/internControler.js";
import authUser from "../middleware/auth.js";

internRouter.post("/get", getinterns);
internRouter.post("/getrecomend", authUser, getRecommendedForStudents);

export default internRouter;
