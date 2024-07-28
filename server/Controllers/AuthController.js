
import bycrpt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../Models/User.js'
// demo get api 

export const getdemo = async(req, res)=>{
    return res.status(200).json({message : "Welcome to the social pedia"})
}
// Login User
export const login = async (req,res)=>{
    try{
        const {email , password} = req.body 
        const user = await User.findOne({email : email}) ;
        if(!user) return res.status(400).json({message:"user does not exis"})
        const isMatch = await bycrpt.compare(password , user.password)
        if(!isMatch)return res.status(400).json({message :"Invalid credentials"})
        const token = jwt.sign({id : user._id } , process.env.JWT_SECRET)
        delete user.password
        res.status(200).json({token , user})
    }
    catch(err){
        res.status(500).json({error: err.message}) ;
    }
}
// Register User
export const register = async (req , res)=>{
     try{
        
        const {
            firstName ,
            lastName ,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body
        
        const allreadyPresentUser = await User.findOne({email : email }) ;
        if(allreadyPresentUser) return res.status(400).json({message:"user already exists madarchod "})

        const salt = await bycrpt.genSalt() ;
        const passwordHash = await bycrpt.hash(password,salt);
        const newUser = new User({
            firstName ,
            lastName ,
            email,
            password:passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile : Math.floor(Math.random()*1000),
            impressions : Math.floor(Math.random()*1000)
        })
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

     }
     catch(err){
        res.status(500).json({error: err.message}) ;
     }
}
