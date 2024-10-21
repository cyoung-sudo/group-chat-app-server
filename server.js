import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectToDatabase } from "./db/connection.js";
// Sockets
import { createServer } from "http";
import { Server } from "socket.io";
// Routes
import userRoutes from "./routes/user.js";
// Models
import Message from "./models/messageModel.js";

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

//----- Connection
connectToDatabase()
.then(() => {
  console.log('Connected to MongoDB');
  
  //----- Socket events
  io.on("connection", socket => {
    socket.on("join-group", data => {
      // Join room
      socket.join(data);
      // Retrieve group messages
      Message.find({group: data})
      .then(docs => {
        io.sockets.to(data).emit("update-messages", docs);
      })
      .catch(err => console.log(err));
    });

    socket.on("submit-message", data => {
      Message.create({
        username: data.username,
        text: data.text,
        group: data.group
      })
      .then(savedDoc => {
        // Retrieve all group messages
        return Message.find({group: data.group});
      })
      .then(docs => {
        // Send updated messages to group
        io.sockets.to(data.group).emit("update-messages", docs);
      })
      .catch(err => console.log(err));
    });
  });

  //----- Server connection
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})
.catch(err => console.log(err));