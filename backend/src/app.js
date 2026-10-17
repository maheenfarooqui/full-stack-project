import express from "express";
import multer from "multer";
import uploadFile from "../services/storage.service.js";
import postModel from "./models/post.model.js";

const app = express();

app.use(express.json());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/api/posts", async (req, res) => {
  const post = await postModel.find(); //[{},{}] or []
  //    const post= await postModel.findOne({title:"Post title"}) //{} or null
  res.status(200).json({ message: "post fetch", post });
});
app.post("/api/posts", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please select an image",
      });
    }

    const { title, desc } = req.body;
    const image = req.file.buffer;

    const result = await uploadFile(image);

    const post = await postModel.create({
      title,
      desc,
      image: result.url,
    });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.error("Create post error:", error);

    res.status(500).json({
      message: "Failed to create post",
    });
  }
});
app.delete("/api/posts/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deletedPost = await postModel.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json({
      message: "Post deleted successfully",
      post: deletedPost,
    });
  } catch (error) {
    console.error("Delete error:", error);

    res.status(500).json({
      message: "Failed to delete post",
    });
  }
});
app.put("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;

    const post = await postModel.findByIdAndUpdate(
      id,
      { title, desc },
      
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update post" });
  }
});

export default app;
