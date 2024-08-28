import express from "express";
import cors from "cors";
import "dotenv/config";
import "./db/connection.js";
// Sockets
import { createServer } from "http";
import { Server } from "socket.io";

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

//----- Socket events
io.on("connection", socket => {
  console.log(`New connection: ${socket.id}`);
});

//----- Server connection
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});