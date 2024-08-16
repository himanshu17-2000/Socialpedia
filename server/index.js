import express from 'express'
import bodyParser from 'body-parser'
import mongoose  from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import authRoutes from "./Routes/AuthRoutes.js"
import userRoutes from "./Routes/UserRoutes.js"
import postRoutes from "./Routes/PostRoutes.js"
import { register } from "./Controllers/AuthController.js"
import { createPost } from './Controllers/PostController.js'
import { verifyToken } from './Middleware/AuthMiddleWare.js'
import { users , posts } from './Data/index.js'
import User from './Models/User.js'
import Post from './Models/Post.js'
/* configuration */

const __filename = fileURLToPath(import.meta.url) 
const __dirname  = path.dirname(__filename); 
dotenv.config() ;
const app = express() 
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy :"cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit  :"30mb" , extended : true}))
app.use(bodyParser.urlencoded({limit :"30mb" , extended :true}))
app.use(cors())
app.use("/assets" , express.static(path.join(__dirname , "public/assets")))

// file Storage 
const storage = multer.diskStorage({
    destination : function(req , file ,cb){
        cb(null, "public/assets")
    },
    filename: function(req,file,cb){
        cb(null, file.originalname);
    }
});
const upload = multer({storage})



//routes with  files  
app.post("/auth/register" , upload.single("picture") , register)
app.post('/posts', verifyToken , upload.single("picture"), createPost)


//Routes 
app.use('/auth', authRoutes)
app.use('/users', userRoutes ) 
app.use('/posts' , postRoutes)


// mongoose setup 
const port = process.env.PORT  || 5000 
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Mongo connected")
    app.listen( port , ()=> console.log(`Server running at ${port}`))
    // User.insertMany(users);
    // Post.insertMany(posts);
})

