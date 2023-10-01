import mongoose from "mongoose";
interface User {
  _id?: mongoose.Type.ObjectId;
  username: string;
  email: string;
  password: string;
}
declare module "express-session" {
  interface SessionData {
    user: User;
  }
}
