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
app.get("/posts", async (req, res) => {
  const post = await postModel.find(); //[{},{}] or []
  //    const post= await postModel.findOne({title:"Post title"}) //{} or null
  res.status(200).json({ message: "post fetch", post });
});
app.post("/posts", upload.single("image"), async (req, res) => {
  const data = req.body;
  const image = req.file.buffer;
  const result = await uploadFile(image);
  console.log(data, image, result);
  await postModel.create({
    title: data.title,
    desc: data.desc,
    image: result.url,
  });
  res.status(201).json({ message: "post create succefully" });
});
app.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  await postModel.findByIdAndDelete({ _id: id });

  res.status(200).json({ message: "sucefully delte" });
});
app.patch("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const desc = req.body.desc;
  await postModel.findByIdAndUpdate({ _id: id }, { desc });
  res.status(200).json({ message: "update" });
});

export default app;
