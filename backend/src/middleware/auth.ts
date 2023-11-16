import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const requiredAuth: RequestHandler = (req, res, next) => {
  if (req.session.user) {
    console.log("Session Exists")
    next();}
  else next(createHttpError(401, "Not Authorized"));
};
