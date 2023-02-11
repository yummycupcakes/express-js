import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import router from "./src/routes/userRoutes";

const port = 5000;

const app = express();
app.use(express.json());
app.use("/api/user", router);

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => app.listen(port))
  .then(() =>
    console.log(`Database connected and listening to http://localhost:${port}`)
  )
  .catch((err) => console.log(err));
