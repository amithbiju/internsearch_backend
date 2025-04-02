import express from "express";

const internRouter = express.Router();

import {
  getinterns,
  getRecommendedForStudents,
  getMatchedStudents,
} from "../controllers/internControler.js";
import authUser from "../middleware/auth.js";

internRouter.post("/get", getinterns);
internRouter.post("/getmatched", getMatchedStudents);
internRouter.post("/getrecomend", authUser, getRecommendedForStudents);

export default internRouter;
