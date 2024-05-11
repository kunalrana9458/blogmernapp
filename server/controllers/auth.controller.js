import User from '../models/User.models.js'
import bcrpytjs from 'bcryptjs';

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All Fields are required" });
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
    res.status(500).json({message:error.message})
 }

};
