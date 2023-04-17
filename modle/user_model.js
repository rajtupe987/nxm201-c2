const mogoose=require("mongoose");

const userSchema=mogoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true,default:"User",enum:["User","Moderator"]}
    
});


const userModle=mogoose.model("user",userSchema);


module.exports={
    userModle
}