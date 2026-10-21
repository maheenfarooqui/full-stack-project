import express from "express";
import multer from "multer";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import uploadFile from "../services/storage.service.js";


const app = express();

app.use(express.json());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(cookieParser());


// app.post("/api/posts", upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         message: "Please select an image",
//       });
//     }

//     const { title, desc } = req.body;
//     const image = req.file.buffer;

//     const result = await uploadFile(image);

//     const post = await postModel.create({
//       title,
//       desc,
//       image: result.url,
//     });

//     res.status(201).json({
//       message: "Post created successfully",
//       post,
//     });
//   } catch (error) {
//     console.error("Create post error:", error);

//     res.status(500).json({
//       message: "Failed to create post",
//     });
//   }
// });
// app.delete("/api/posts/:id", async (req, res) => {
//   try {
//     const id = req.params.id;

//     const deletedPost = await postModel.findByIdAndDelete(id);

//     if (!deletedPost) {
//       return res.status(404).json({
//         message: "Post not found",
//       });
//     }

//     res.status(200).json({
//       message: "Post deleted successfully",
//       post: deletedPost,
//     });
//   } catch (error) {
//     console.error("Delete error:", error);

//     res.status(500).json({
//       message: "Failed to delete post",
//     });
//   }
// });
// app.put("/api/posts/:id", upload.single("image"), async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, desc } = req.body;
//     const updateData = { title, desc };

//     if (req.file) {
//       const image = req.file.buffer;
//       const imageurl = await uploadFile(image);
//       updateData.image = imageurl.url;
//     }

//     const post = await postModel.findByIdAndUpdate(id, updateData);

//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     res.status(200).json({
//       message: "Post updated successfully",
//       post,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to update post" });
//   }
// });

app.use("/api/users", authRoute);
app.use("/api/posts", postRoute)

export default app;
