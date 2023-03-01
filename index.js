import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import router from "./src/routes/userRoutes.js";
import blogRouter from "./src/routes/blogRoutes.js";

// port
const port = 8000;

// rest object
const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

// databse connection
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => app.listen(port))
  .then(() =>
    console.log(`Database connected and listening to http://localhost:${port}`)
  )
  .catch((err) => console.log(err));
