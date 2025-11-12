import Comment from "../models/comment.js";
import Post from "../models/post.js"

const createComment = async (req, res) =>{
    try{
         let {Comment} = req.body
         let {postId} = req.params
    if(!Comment) {
        return res.status(400).json({message: "All fields are required"})
    }

    let post = await Post.findById(postId)

    if (!post) {
        return res.status(400).json({message: "Post not found"})
    }



    let newComment = await Comment.create({
        Comment,
        author: req.user.id,
        postId
    })

    res.status(201).json({message: "Comment created successfully"})
    } catch(err) {
        console.log(err)
        res.status(500).json({message: "Internal Server Error"})
    }
}

const getAllComments = async (req,res) =>{
    try{
        let comment = await Comment.find().populate('author','fullName email')
        if (!comment) {
            return res.status(400).json({message: "No comment found"})
        }
        res.status(200).json(comment)

    } catch (error) {
           console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }
}

export {
    createComment,
    getAllComments
}