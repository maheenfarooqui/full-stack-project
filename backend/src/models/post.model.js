import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title:String,
    desc:String,
    image:String,
});


const postModel = mongoose.model("posts",postSchema)
export default postModel;

