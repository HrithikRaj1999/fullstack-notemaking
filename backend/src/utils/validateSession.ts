import { RequestHandler } from "express";
import userModel, { UserType } from "../models/userModel";

export const validateSession: RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { sessionId, user } = req.session;
    if (!sessionId) {
      return res.status(401).json({ message: "No session" });
    }
    const databaseUser = await userModel.findById(user?._id);
    if ( !databaseUser || databaseUser.sessionId !== sessionId) {
      return res.status(401).json({ message: "Invalid session" });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
