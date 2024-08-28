import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

const userSchema = mongoose.model("User", UserSchema);

export default userSchema;