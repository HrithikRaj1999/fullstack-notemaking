import express from "express";

import {
  authTenticated,
  destroy,
  login,
  logout,
  signUp,
} from "../controller/userController";
import { requiredAuth } from "../middleware/auth";
import { validateSession } from "../utils/validateSession";

export const userRouter = express.Router();

userRouter.get("/", requiredAuth, validateSession, authTenticated);
userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.post("/logout",logout);
userRouter.post("/destroySession",destroy)