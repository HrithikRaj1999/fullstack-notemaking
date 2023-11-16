import { RequestHandler } from "express";
import createHttpError from "http-errors";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import { User } from "../../@types/session";

export const authTenticated: RequestHandler = async (req, res, next) => {
  try {
    const user = await userModel
      .findById(req.session.user?._id)
      .select("+email");
    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

interface SignUpBodyType {
  username?: string;
  email?: string;
  password?: string;
}
export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBodyType,
  unknown
> = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password)
      throw createHttpError(400, "Missing parameters");
    const existingUser = await userModel.findOne({ email });
    if (existingUser) throw createHttpError(409, "Email is already used");
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    req.session.user = newUser;

    return res.status(201).send({
      success: true,
      message: "Registered Successfully",
      newUser,
    });
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  email?: string;
  password?: string;
}
async function generateSessionId() {
  const crypto = await import("crypto");
  return crypto.randomBytes(64).toString("hex");
}
export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) throw createHttpError(400, "Parameter Missing");
    const user = await userModel.findOne({ email }).select("+password +email");
    if (!user) throw createHttpError(401, "Invalid Credentials");
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) throw createHttpError(401, "Invalid Credentials");
    const sessionId = await generateSessionId();
    await userModel.updateOne({ email }, { sessionId });
    req.session.user = user;
    req.session.sessionId = sessionId;
    res.status(201).send({
      success: true,
      message: "logged In successfully",
      user,
      sessionId,
    });
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) next(error);
    else res.sendStatus(200);
  });
};

export const destroy: RequestHandler = async (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        // Handle error
        return res.status(500).send("Could not end session");
      }
      res.send("Session ended");
      console.log("session ended");
    });
  } else {
    console.log("No active seessions");
    res.send("No active session");
  }
};

interface BodyType{
  user:User
}

