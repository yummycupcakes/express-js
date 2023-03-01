import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/User.js";

export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (err) {
    return console.log(err);
  }

  if (!blogs) {
    return res.status(404).json({ message: "No Blog Found!" });
  }

  return res.status(200).json({ blogs });
};

export const getBlogById = async (req, res, next) => {
  const { id } = req.params;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    return console.log(err);
  }

  if (!blog) return res.status(400).json({ message: "Data Not Found" });

  return res.status(200).json({ blog });
};

export const getUserById = async (req, res, next) => {
  const { id } = req.params;
  let userBlogs;
  try {
    userBlogs = await User.findById(id).populate("blogs");
  } catch (err) {
    return console.log(err);
  }

  if (!userBlogs) return res.status(404).json({ message: "Blog Not Found" });

  return res.status(200).json({ data: userBlogs });
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser)
    return res.status(400).json({ message: "Unable To Find User By This ID" });

  const blog = new Blog({
    title,
    description,
    image,
    user,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }

  return res.status(200).json({ blog });
};

export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const { id } = req.params;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(id, {
      title,
      description,
    });
  } catch (err) {
    return console.log(err);
  }

  if (!blog) {
    res.status(500).json({ message: "Unable To Update The Blog" });
  }

  return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
  const { id } = req.params;
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id).populate("user");
    console.log("HAHAHHA", blog);
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    return console.log(err);
  }

  if (!blog) {
    res.status(500).json({ message: "Unable To Delete" });
  }

  return res.status(200).json({ message: "Delete Successfully" });
};
