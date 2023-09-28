import express, { NextFunction, Request, Response } from "express";
import noteModel from "./models/note";
export const app = express();

app.get("/", async (req, res, next) => {
  try {
    const notes = await noteModel.find().exec();
    res.status(200).send({
      success: false,
      notes,
    });
  } catch (error) {
    next(error);
  }
});
app.use((req: Request, res: Response, next: NextFunction) => {
  next(Error("EndPoint Not found"));
});

// all the middle ware executes in sequence thus error middle ware must be at the bottom
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "Something went wrong";
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).send({ error: errorMessage });
});
