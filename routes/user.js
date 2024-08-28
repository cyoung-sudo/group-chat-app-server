import express from "express";
// Models
import User from "../models/userModel.js";

const userRoutes = express.Router();

userRoutes.route("/")
//----- Retrieve all users
.post((req, res) => {
  // Create user
  User.create({
    username: req.body.username
  })
    .then(savedDoc => {
      res.json({
        success: true,
        user: savedDoc
      });
    })
    .catch(err => {
      // Handle duplicate
      if(err.code === 11000) {
        res.json({ success: true })
      } else {
        console.log(err);
      }
    });
});

export default userRoutes;