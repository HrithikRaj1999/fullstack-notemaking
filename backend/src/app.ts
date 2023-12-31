import MongoStore from "connect-mongo";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
import { requiredAuth } from "./middleware/auth";
import notesRouter from "./routes/notesRoutes";
import { userRouter } from "./routes/userRoutes";
import env from "./utils/validateEnv";
import { validateSession } from "./utils/validateSession";
export const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "DELETE", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(morgan("dev")); //it is used to show which end point hit
app.use(express.json());
app.use(
  session({
    name: "SESSION",
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: false,
      httpOnly: true,
      secure: false,
      maxAge:undefined, 
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTION_STRING,
    }),
  })
);
// app.use(validateTab)
app.use("/api/user",userRouter);
// app.use("/api/notes", requiredAuth,validateSession,validateTab,notesRouter);
app.use("/api/notes", requiredAuth,validateSession,notesRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, "EndPoint Not found"));
});

// all the middle ware executes in sequence thus error middle ware must be at the bottom
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  //console.error(error);
  let errorMessage = "Something went wrong";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).send({ success: false, error: errorMessage });
});
