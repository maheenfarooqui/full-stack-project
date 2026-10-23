import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();
async function registerUser(req, res) {
  try {
    const { username, email, password, role } = req.body;
    const userAlreadyExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (userAlreadyExists) {
      return res.status(409).json({
        message: "User Already Exists",
      });
    }

    const hash = await bcrypt.hash(password, 12);

    const user = await userModel.create({
      username,
      email,
      password: hash,
      role,
    });
    const token = jwt.sign(
      {
        id: user._id,
         role: user.role
      },
      process.env.JWTSECRECT_KEY,
    );
    res.cookie("token", token);
    res.status(201).json({ message: "User created sucessfully", user, token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function loginUser(req, res) {
  try {

      const { username, email, password, role } = req.body;
    const user = await userModel.findOne({
      $or: [{ username }, { email }],
    });
     if (!user) {
      return res.status(409).json({
        message: "User Not Found",
      });
      
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid password"
        })
    }
    const token = jwt.sign(
      {
        id: user._id,
        role:user.role,
      },
      process.env.JWTSECRECT_KEY,
    );
    res.cookie("token", token);
    res.status(201).json({ message: "User logIn sucessfully", })
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export { registerUser, loginUser };
