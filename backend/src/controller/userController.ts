import { RequestHandler } from "express";
import createHttpError from "http-errors";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  console.log("getaaut", req.session.userId);
  try {
    const user = await userModel.findById(req.session.userId).select("+email");
    res.status(200).send(user);
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
    req.session.userId = newUser.id;

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
    req.session.userId = user.id;
    console.log("login", req.session);
    res.status(201).send({
      success: true,
      message: "logged In successfully",
      user,
    });
  } catch (error) {}
};

export const logout: RequestHandler = (req, res, next) => {
  console.log("logut", req.session);
  req.session.destroy((error) => {
    if (error) next(error);
    else res.sendStatus(200);
  });
};
