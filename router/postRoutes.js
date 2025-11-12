import {createPost, deletePost, retrieveallPosts, updatePost} from "../controllers/postController.js";
import express from "express";
import authorize from "../middlewares/authorization.js";

const postRouter = express.Router()

postRouter.post('/', authorize(["user","admin"]), createPost)
postRouter.get('/', retrieveallPosts)
postRouter.delete('/', authorize(["admin"]), deletePost)
postRouter.patch('/', updatePost)

export default postRouter