import mongoose from "mongoose";
import blogModel from "../models/blogModel.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import cloudinary from "../utils/cloudinary.js";
import { formatBufferToDataURI } from "../middleware/multer.js";

export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!req.file || !username || !email || !password) {
      return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    // Check if user exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ success: false, message: "User already exists" });
    }

    // Convert Image to DataURI and Upload to Cloudinary
    const file = formatBufferToDataURI(req.file);
    const uploadedResponse = await cloudinary.uploader.upload(file.content, {
      folder: "users",
    });

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save User to Database
    const user = new userModel({
      image: uploadedResponse.secure_url,
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    return res.status(201).json({ success: true, message: "User registered successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error", error });
  }
};


export const loginController = async (req,res) => {
 try {
    const {email,password} = req.body
    if(!email || !password){
        return res.status(401).send({
            success:false,
            message:"Please provide email and password"
        })
    }
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(401).send({
            success:false,
            message:"Email is not registered"
        })
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(401).send({
            success:false,
            message:"Invalid Password"
        })
    }
    return res.status(200).send({
        success:true,
        message:"Login Successfully",
        user
    })
 } catch (error) {
    console.log(error)
    return res.status(500).send({
        success:false,
        message:"Error in login call back",
        error
    })
 }   
}

export const getUserById = async (req,res) => {
    try {
        const {id} = req.params;
        const user = await userModel.findById(id)
        if(!user){
            return res.status(400).send({
                success:false,
                message:"user not found",
            })
        }
        return res.status(200).json({
            success:true,
            message:"user found successfully",
            user
        });

    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Error while get user",
            error
        })
    }
}