import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoute from "./routes/auth.js";
import convRoute from "./routes/conversation.js";
import msgRoute from "./routes/messages.js";

import http from "http";
import { Server } from "socket.io";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/auth", authRoute);
app.use("/api/conversations", convRoute);
app.use("/api/messages", msgRoute);

// create HTTP server for socket.io
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("user connected");

  // add user
  socket.on("addUser", (userId) => {
    onlineUsers.push({
      userId,
      socketId: socket.id,
    });
  });

  // send message
  socket.on("sendMessage", ({ receiverId, message }) => {
    const user = onlineUsers.find((u) => u.userId === receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", message);
    }
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((u) => u.socketId !== socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Server + socket runing on 5000");
});
