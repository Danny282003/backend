import Post from "../models/post.js";

const createPost = async (req, res)=>{
     try{
        let {title, snippet, content} = req.body;

        // ALL Fields are required
        if(!title || !content) {
           return res.status(400).json({message: "Title and content fields are required"})
        };

         await Post.create({
            title,
            snippet,
            content,
            author: req.user.id
        });

        res.status(201).json({message: "Post Created successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}

    // To retrieve Post
        const retrieveallPosts = async (req,res)=>{
            try{
                let posts = await Post.find()
                if(!posts) {
                    return res.status(404).json({message: "No post found"})
                }
                res.status(200).json(posts)
            } catch(err) {
                console.log(err)
                res.status(500).json({message: "Internal Server Error"})
            }
        }

        //To delete Post
        const deletePost = async (req, res) => {
            try{
                let { id } = req.params
                let del = await Post.findByIdAndDelete(id)
                if(!del) {
                    return res.status(400).json({message: "Post not found"})
                }
                res.status(200).json({message: "Post Successfully deleted"})
            } catch (error) {
                console.log(error)
                res.status(500).json({message: "Internal Server Error"})
            }
        }

        // To update post
        const updatePost = async (req, res) => {
            try {
                let { id } = req.params
                let updatedPost = req.body

                let post = await findByIdAndUpdate(id, updatedPost, {new: true})
                if(!post) {
                    return res.status(400).json({message: "This post was not found"})
                }

                res.status(200).json({message: "Post successfully updated"})
            } catch (err) {
                console.log(err)
                res.status(500).json({message: "Internal Server Error"})
            }
        }   

export{
    createPost,
    retrieveallPosts,
    deletePost,
    updatePost
}
