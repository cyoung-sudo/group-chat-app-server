import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true
  },
  group: {
    type: String,
    required: true
  }
}, { timestamps: true });

const messageSchema = mongoose.model("Message", MessageSchema);

export default messageSchema;