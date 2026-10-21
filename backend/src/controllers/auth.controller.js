import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
async function registerUser(req,res){
  try {
    const { username, email, password } = req.body;
    const userAlreadyExists = await userModel.findOne({ email });

    if (userAlreadyExists) {
      return res.status(409).json({
        message: "User Already Exists",
      });
    }

    const user = await userModel.create({
      username,
      email,
      password,
    });
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWTSECRECT_KEY,
    );
     res.cookie("token",token)
    res.status(201).json({ message: "User created sucessfully", user, token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}


export {registerUser}