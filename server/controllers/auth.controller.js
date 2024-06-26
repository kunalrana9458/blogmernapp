import User from '../models/User.models.js'
import bcrpytjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"

dotenv.config();

export const signup = async (req, res,next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400,'All Fields Are required'));
  }

  const hashedPassword = bcrpytjs.hashSync(password,10);

  const newUser = new User({
    username,
    email,
    password:hashedPassword
  });

 try {
    await newUser.save();
    res.json({message:"User Created Successfully"});
 } catch (error) {
    next(error);
 }
};

export const signin = async (req,res,next) => {
  const {email,password} = req.body;

  if(!email || !password || email === '' || password === ''){
    return next((errorHandler(400,'All Fields Are required')));
  }
  
  try {
    const validUser = await User.findOne({email});
    if(!validUser) {
      return next(errorHandler(404,'user Not Found'));
    }
    const validPassword = bcrpytjs.compareSync(password,validUser.password);
    if(!validPassword){
      return next(errorHandler(400,'Invalid Password'));
    }

    const payload = {
      email:validUser.email,
      id:validUser._id,
      isAdmin:validUser.isAdmin,
    }
    
    const token = jwt.sign(payload,process.env.JWT_SECRET);
    const {password:pass,...rest} = validUser._doc;
      
    res.status(200).cookie('access_token',token,{
      httpOnly:true
    }).json(rest)
  } catch (error) {
    return error.message; 
  }
}

export const google = async(req,res) => {
  const {email,name,googlePhotoUrl} = req.body;
  try {
    const user = await User.findOne({email})
    if(user){
      const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
      const{password,...rest}  = user._doc;
      res.status(200).cookie('access_token',token,{
        httpOnly:true,
      }).json(rest);
    } else{
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcrpytjs.hashSync(generatedPassword,10);
      const newUser = new User({
        username:name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
        email,
        password:hashedPassword,
        profilePicture:googlePhotoUrl,

        
      });
      await newUser.save();
      const token = jwt.sign({id:newUser._id,isAdmin:newUser.isAdmin},process.env.JWT_SECRET);
      const {password,...rest} = newUser._doc;
      res.status(200)
      .cookies('access_token',token,{
        httpOnly:true,
      })
      .json(rest);
    }
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:'Internal Server Error',
    })
  }
}