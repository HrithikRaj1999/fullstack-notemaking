import mongoose, { Model, Schema } from "mongoose";

interface NoteType {
  title: string;
  description?: string;
}
const noteSchema = new Schema<NoteType>(
  {
    title: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<NoteType>("notes", noteSchema);
