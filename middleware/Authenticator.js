
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const {userModle}=require("../modle/user_model");
const {blacklist}=require("../blacklist")
require("dotenv").config();


const authentocator=async(req,res,next)=>{

  try {
    let token=req?.headers?.authorization;

    if(!token){
        return res.status(401).send({message:"No athorize toekn is not there.."})
    }else{
      jwt.verify(token,process.env.key,(err,decoded)=>{
        if(decoded){
          req.body.userId=decoded.userId;
          next()
        }
      })
    }

    token=req.headers.authorization.split(" ")[1];

    if(blacklist.includes(token)){
        return res.status(401).send({"msg":"not Athorized..."})
    }

    const validettoken=jwt.verify(token,process.env.key);

    if(!validettoken){
        return res.status(401).send(({"msg":"not Athorized..."}))
    }
   const {userId}=validettoken;
   const user=await userModle.findOne({_id:userId});
   const role=user?.role;
   req.role=role;
   next();


  } catch (error) {
    return res.status(500).send(({"msg":"something went wrong",error:error.message}))
  }
};


module.exports={
    authentocator
}