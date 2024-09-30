const userModel = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")




const signup = async (req,res) => {
   try{
    const {name,email,password} = req.body;
    const user =await userModel.findOne({email})
    if(user){
        res.status(404).json({message:"this user is already exists",success:false})
    }
    const newUserModel = new userModel({name,email,password});
    newUserModel.password = await bcrypt.hash(password,10);
    await newUserModel.save();
    res.status(201).json({message:'signup successfully',success:true})
}catch(err){
  res.status(404).json({message:"internal server error",success:false})
}

}

const login = async (req,res) => {
  try{
   const {email,password} = req.body;
   const user =await userModel.findOne({email})
   if(!user){
       res.status(404).json({message:"this user is not exist please signup first",success:false})
   }
const isPasswordEqual = await bcrypt.compare(password,user.password);
if(!isPasswordEqual){
    res.status(404).json({message:"this user is not exist",success:failure})
  }
  const jwtToken = jwt.sign(
    {email:user.email,_id:user.id},
    process.env.JWT_SECRET,
    {expiresIn:"24h"}
     )
  res.status(201).json({message:' login successfully',success:true,jwtToken,email,name:user.name})
}catch(err){
 res.status(404).json({message:"internal server error",success:false})
}

}


module.exports = { signup , login }
