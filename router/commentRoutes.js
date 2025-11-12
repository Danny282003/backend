import express from "express"
import { createComment } from "../controllers/commentController.js"
const router = express.Router()

router.post('/comment/:postId', createComment)

export default router