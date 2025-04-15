import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import blogRoutes from "./routes/blogRoutes.js"
import userRoutes from "./routes/userRoutes.js"
const app = express();

dotenv.config();

app.use(cors({
  origin: 'https://mernblogapp-omega.vercel.app',
  credentials: true
}));
app.use(express.json());
const PORT = process.env.PORT || 8080;

connectDB();

app.use("/api/v1/blog", blogRoutes)
app.use("/api/v1/user", userRoutes)


app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
