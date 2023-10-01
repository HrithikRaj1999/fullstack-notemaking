import express from "express";

import {
  authTenticated,
  login,
  logout,
  signUp,
} from "../controller/userController";
import { requiredAuth } from "../middleware/auth";

export const userRouter = express.Router();

userRouter.get("/", requiredAuth, authTenticated);
userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
