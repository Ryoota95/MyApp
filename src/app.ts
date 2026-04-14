import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/register";
import loginRoutes from "./routes/login";
import userRoutes from "./routes/user"
import threadRoutes from "./routes/threads";

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/auth", loginRoutes);
app.use("/auth", userRoutes)
app.use("/api", threadRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("server running")});