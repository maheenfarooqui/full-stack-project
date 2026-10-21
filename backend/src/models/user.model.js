import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: String,
});

const userModel = mongoose.model("user", userSchema);
export default userModel;
