import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    snippet: {
        type: String,
        require: false
    },
    content: {
        type: String,
        require: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }
}, {timestamps: true})

const Post = mongoose.model('posts', postSchema)

export default Post