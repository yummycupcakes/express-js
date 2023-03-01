import express from "express";
const blogRouter = express.Router();
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  getUserById,
} from "../controllers/blogController.js";

blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getBlogById);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/user/:id", getUserById);

export default blogRouter;
