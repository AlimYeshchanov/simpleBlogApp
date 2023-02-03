import mongoose from 'mongoose';
import Blog from '../models/Blog.js'
import User from '../models/User.js'

export const createBlog = async(req, res)=>{
  try {
    const { userId, title, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newBlog = new Blog({
      userId,
      title,
      description,
      picturePath,
      likes: {},
      comments: [],
    })
    await newBlog.save();
    const blog = await Blog.find();
    res.status(201).json(blog);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
}

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
    res.status(200).json(blogs)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}


export const getUserBlogs = async (req, res) => {
  try {
    const { userId } = req.params
    const blog = await Blog.find({ userId })
    res.status(200).json(blog)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

