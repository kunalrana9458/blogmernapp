import express from 'express'
import {verifyToken} from '../utils/verifyUser.js'
import { createComment, editComment, getPostComments, likeComment,deleteComment } from '../controllers/comment.controller.js';
   

const router = express.Router();

router.post('/create',verifyToken,createComment)
router.get('/getPostComments/:postId',getPostComments);
router.put('/likecomment/:commentId',verifyToken,likeComment);
router.put('/editcomment/:commentId',verifyToken,editComment)
router.delete('/deletecomment/:commentId',verifyToken,deleteComment)

export default router