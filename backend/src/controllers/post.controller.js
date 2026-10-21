import postModel from "../models/user.model.js";

async function post(req, res) {
  try {
    const post = await postModel.find();
    res.status(200).json({ message: "post fetch", post });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export { post };
