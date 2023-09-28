import mongoose from "mongoose";
import cleanEnv from "./utils/validateEnv";
import { app } from "./middleware";
const port = cleanEnv.PORT; //this will follow the schema of clean Env, so that undefined is not expected

mongoose
  .connect(cleanEnv.MONGO_CONNECTION_STRING) //this will follow the schema of clean Env so that undefined is not expected
  .then(() => {
    console.log(`Mongoose Connected`);
    app.listen(port, () => {
      console.log(`Server running on ${port}`);
    });
  })
  .catch(console.error);
