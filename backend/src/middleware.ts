import express, { NextFunction, Request, Response } from "express";
import notesRouter from "./routes/notesRoutes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";
export const app = express();

app.use(morgan("dev")); //it is used to show which end point hit
app.use(express.json());
app.use(cors());

app.use("/api/notes", notesRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, "EndPoint Not found"));
});

// all the middle ware executes in sequence thus error middle ware must be at the bottom
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "Something went wrong";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).send({ success: false, error: errorMessage });
});
