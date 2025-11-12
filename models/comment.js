import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    author:{
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    postId:{
        type: mongoose.Types.ObjectId,
        ref:"post"
    }
}, {timestamps: true})

const Comment = mongoose.model('comments', commentSchema);

export default Comment
