import express from "express";
import cors from "cors";
import "dotenv/config";
import "./db/connection.js";
// Sockets
import { createServer } from "http";
import { Server } from "socket.io";
// Routes
import userRoutes from "./routes/user.js";

const PORT = process.env.PORT || 5050;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  // Allow connection from client
  cors: { origin: '*' }
});

//----- Middleware
app.use(cors());
app.use(express.json());

//----- Routes
app.use("/api/user", userRoutes);

//----- Socket events
io.on("connection", socket => {
  console.log(`New connection: ${socket.id}`);
});

//----- Server connection
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});