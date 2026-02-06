const UserModel = require("../model/user.model");

const  signup =(req,res)=>{
  try  {
res.send("success")
    }
    catch (err){
        res.status(500).json({message:err.message})
    }
}
const login = async(req,res)=>{
    try{
const user =await UserModel.create(req.body)
res.status(200).json({message:'User created successfully'}
)
    }
    catch(err){

        res.status(500).json({message:err.message})
    }
}
    

module.exports = {
    signup
}