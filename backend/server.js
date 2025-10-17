import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/mongodb.js";
import authRouter from "../backend/routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

const allowedOrigin = ["http://localhost:5173"];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigin, credentials: true }));

app.get("/", (req, res) => {
  res.send("Server is started.");
});
app.use("/api/auth/", authRouter);
app.use("/api/user/", userRouter);

app.listen(PORT, () => {
  console.log(`Server started at server: http://localhost:${PORT}`);
});

//tzTwM6Gws1y3MbMj

//mongodb+srv://muhammadareeb334_db_user:<db_password>@cluster0.mkdumzy.mongodb.net/
