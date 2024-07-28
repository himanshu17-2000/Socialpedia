import express from 'express'
import { getFeedPosts , getUserPosts , likePost } from '../Controllers/PostController.js'
import { verifyToken } from '../Middleware/AuthMiddleWare.js'

const postRoutes = new express.Router() 


postRoutes.get('/', verifyToken , getFeedPosts) 
postRoutes.get('/:userId/posts', verifyToken , getUserPosts)
postRoutes.patch('/:id/like', verifyToken , likePost)

export default postRoutes 