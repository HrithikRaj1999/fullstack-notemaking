import mongoose, { Schema, model } from "mongoose";

interface UserType {
  username: string;
  email: string;
  password: string;
}
const userSchema = new Schema<UserType>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, select: false },
  password: { type: String, required: true, select: false },
});

export default model<UserType>("User", userSchema);
