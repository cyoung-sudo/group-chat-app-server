import mongoose from "mongoose";

mongoose.connect(process.env.ATLAS_URI)
  .then(() => console.log("Connected to Database"))
  .catch(err => console.log(err));