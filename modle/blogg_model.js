const mogoose=require("mongoose");

const blogSchema=mogoose.Schema({
    Title:{type:String,required:true},
    content:{type:String,required:true},
    likes:{type:Number,required:true},
    comments:{type:Number,required:true}
    
});


const bloggModle=mogoose.model("blogg",blogSchema);


module.exports={
    bloggModle
}