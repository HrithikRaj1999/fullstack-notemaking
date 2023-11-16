import { Schema, model } from "mongoose";

export interface UserType {
  username: string;
  email: string;
  password: string;
  sessionId:string
  activeTabId:string
}
const userSchema = new Schema<UserType>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, select: true },
  password: { type: String, required: true, select: false },
  sessionId:{type:String,required:false,select:true},
  activeTabId:{type:String,required:false,select:true}
});

export default model<UserType>("User", userSchema);
