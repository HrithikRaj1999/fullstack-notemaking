import express from "express";

import {
  getAuthenticatedUser,
  login,
  logout,
  signUp,
} from "../controller/userController";

export const userRouter = express.Router();

userRouter.get("/", getAuthenticatedUser);
userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
