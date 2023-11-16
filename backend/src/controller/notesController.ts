import { RequestHandler } from "express";
import noteModel from "../models/noteModel";
import createHttpError from "http-errors";
import mongoose from "mongoose";

interface paramType {
  id: string;
}
interface createNoteBody {
  title?: string;
  description?: string;
}
export const getNotes: RequestHandler = async (req, res, next) => {
  const authId = req.session.user?._id;
  try {
    const notes = await noteModel.find({ userId: authId });
    res.status(200).send({
      success: true,
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleNote: RequestHandler<paramType> = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      throw createHttpError(400, "Invalid Id ");
    const notes = await noteModel.findById(id);
    res.status(200).send({
      success: true,
      message: "Fetched Successfully",
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const createNotes: RequestHandler<
  unknown,
  unknown,
  createNoteBody,
  unknown
> = async (req, res, next) => {
  try {
    const userId = req.session.user?._id;
    const { title, description } = req.body;
    if (!title) throw createHttpError(400, "Note Title is Needed ");
    const newNote = await noteModel.create({ userId, title, description }); //this return promise by default
    res.status(200).send({
      success: true,
      message: "Created Successfully",
      newNote,
    });
  } catch (error) {
    next(error);
  }
};

export const updateNote: RequestHandler<
  paramType,
  unknown,
  createNoteBody
> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!mongoose.isValidObjectId(id))
      throw createHttpError(400, "Invalid Id ");

    if (!title) throw createHttpError(400, "Note Title is Required ");
    const updatedNotes = await noteModel.findByIdAndUpdate(id, {
      title,
      description,
    });
    res.status(200).send({
      success: true,
      message: "Updated Successfully",
      updatedNotes,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteNote: RequestHandler<paramType> = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      throw createHttpError(400, "Invalid Id ");

    await noteModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
