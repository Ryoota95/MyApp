import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/register";
import loginRoutes from "./routes/login";
import userRoutes from "./routes/user"
import threadRoutes from "./routes/threads";
import likeRoutes from "./routes/like";
import detailRouter from "./routes/detail"
import http from "http"
import { Server } from "socket.io";
import "./worker/image.worker";
import profilerouter from "./routes/profile"
import followrouter from "./routes/follow"

dotenv.config();

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*"
  },
});

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected");
    
  })
})


app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/auth", loginRoutes);
app.use("/auth", userRoutes);
app.use("/api", threadRoutes);
app.use("/auth", likeRoutes)
app.use("/uploads", express.static("uploads"))
app.use("/api", detailRouter)
app.use("/api", profilerouter)
app.use("/api/v1", followrouter)


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("server running")});