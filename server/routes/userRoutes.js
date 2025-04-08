import express from "express";
import { getUserById, loginController, registerController } from "../controllers/userController.js";
import { upload } from "../middleware/multer.js";

const router = express.Router()

router.post("/register", upload.single("image"), registerController);
router.post("/login", loginController)
router.get("/get_user/:id", getUserById)


export default router