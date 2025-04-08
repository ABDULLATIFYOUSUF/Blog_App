import mongoose from "mongoose";
import blogModel from "../models/blogModel.js";
import userModel from "../models/userModel.js";
import cloudinary from "../utils/cloudinary.js";
import { formatBufferToDataURI } from "../middleware/multer.js";

export const getAllBlogController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");
    if (!blogs) {
      return res.status(401).send({
        success: false,
        message: "No Blogs Found",
      });
    }

    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: "All Blogs lists",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting blogs",
      error,
    });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, description, user } = req.body;

    if (!title || !description || !user || !req.file) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields including an image",
      });
    }

    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Convert image buffer to base64
    const file64 = formatBufferToDataURI(req.file);
    const uploadResult = await cloudinary.uploader.upload(file64.content);

    const newBlog = new blogModel({
      title,
      description,
      image: uploadResult.secure_url,
      user,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();

    return res.status(201).send({
      success: true,
      message: "Blog Created",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while creating blog",
      error,
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "This Blog is not Found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "fetch single blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while getting single blog",
      error,
    });
  }
};

export const updateBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Check if the blog exists
    const existingBlog = await blogModel.findById(id);
    if (!existingBlog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }

    let imageUrl = existingBlog.image; // Default to existing image

    // ✅ Handle new image upload (if available)
    if (req.file) {
      const file64 = formatBufferToDataURI(req.file);
      const uploadResponse = await cloudinary.uploader.upload(file64.content);
      imageUrl = uploadResponse.secure_url;
    }

    const updatedBlog = await blogModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        image: imageUrl, // ✅ Always store image (either new or old)
      },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "Blog updated",
      blog: updatedBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while updating blog",
      error,
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id).populate("user");
    if (!blog) {
      return res
        .status(404)
        .send({ success: false, message: "Blog not found" });
    }

    // Remove the blog reference from the user model
    if (blog.user) {
      blog.user.blogs.pull(blog._id);
      await blog.user.save();
    }

    // Delete the blog
    await blogModel.deleteOne({ _id: req.params.id });

    return res.status(200).send({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while deleting blog",
      error,
    });
  }
};

export const userBlogController = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate({
      path: "blogs",
      populate: {
        path: "user", // Ye ensure karega ke blog ke saath user ka data aaye
        select: "username image", // Sirf zaroori fields fetch karne ke liye
      },
    });

    if (!userBlog) {
      return res.status(404).json({
        success: false,
        message: "Blogs not found in this account",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Blogs",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in user blogs",
      error: error.message, // Error message ko clear rakhna zaroori hai
    });
  }
};
