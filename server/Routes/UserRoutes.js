import express from 'express'
import { getUser , addRemoveFriend , getUserFriends } from '../Controllers/UserController.js'
import { verifyToken } from '../Middleware/AuthMiddleWare.js'
const UserRoutes = express.Router() 

UserRoutes.get('/:id' , verifyToken ,  getUser)
UserRoutes.get('/:id/friends', verifyToken , getUserFriends)
UserRoutes.patch('/:id/:friendId' , verifyToken , addRemoveFriend )
export default UserRoutes 
