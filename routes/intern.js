import express from "express";

const internRouter = express.Router();

import { getinterns } from "../controllers/internControler.js";

internRouter.post("/get", getinterns);

export default internRouter;
