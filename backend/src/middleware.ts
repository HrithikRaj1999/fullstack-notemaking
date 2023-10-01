import express, { NextFunction, Request, Response } from "express";
import notesRouter from "./routes/notesRoutes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";
import { userRouter } from "./routes/userRoutes";
import session from "express-session";
import env from "./utils/validateEnv";
import MongoStore from "connect-mongo";
export const app = express();

app.use(morgan("dev")); //it is used to show which end point hit
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 100,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTION_STRING,
    }),
  })
);
app.use("/api/notes", notesRouter);
app.use("/api/user", userRouter);

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
