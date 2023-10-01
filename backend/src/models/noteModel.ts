import mongoose, { Model, Schema } from "mongoose";

interface NoteType {
  userId: string;
  title: string;
  description?: string;
}
const noteSchema = new Schema<NoteType>(
  {
    userId: {type: String, required: true},
    title: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<NoteType>("notes", noteSchema);
