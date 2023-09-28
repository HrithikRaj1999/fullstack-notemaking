import * as notesController from "../controller/notesController";
import express from "express";

const notesRouter = express.Router();

notesRouter.get("/", notesController.getNotes);
notesRouter.post("/", notesController.createNotes);
notesRouter.get("/:id", notesController.getSingleNote);
notesRouter.put("/:id", notesController.updateNote);
notesRouter.delete("/:id", notesController.deleteNote);

export default notesRouter;
