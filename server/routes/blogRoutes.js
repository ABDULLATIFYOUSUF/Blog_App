import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogController,
  getBlogById,
  updateBlogById,
  userBlogController,
} from "../controllers/blogController.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.get("/allBlogs", getAllBlogController);
router.post("/create-blog", upload.single("image"), createBlog);
router.get("/get-blog/:id", getBlogById);
router.put("/update-blog/:id", upload.single("image"), updateBlogById);
router.delete("/delete-blog/:id", deleteBlog);
router.get("/getUserBlog/:id", userBlogController);

export default router;
