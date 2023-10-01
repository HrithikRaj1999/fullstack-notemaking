import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const requiredAuth: RequestHandler = (req, res, next) => {
  console.log({ authTS: req.session.user });
  if (req.session.user) next();
  else next(createHttpError(401, "Not Authorized"));
};
