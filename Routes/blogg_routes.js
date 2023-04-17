
const express=require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const {bloggModle}=require("../modle/blogg_model");
const {athorization}=require("../middleware/Authorization")
require("dotenv").config();


const bloggRoute=express.Router();


bloggRoute.get("/",athorization(["User"]),async(req,res)=>{
    try {
        const {userId}=req.body;
        const blog=await bloggModle.find({$and:[{userId}]});
        res.status(200).send({msg:"your blogs",blog})
    } catch (error) {
        res.status(400).send(error.message)
    }
})



bloggRoute.post("/add",athorization(["User"]),async(req,res)=>{
    try {
        const userdata=req.body;
        const newblog=new bloggModle(userdata);
        await newblog.save();
        res.status(200).send({"msg":"blogg created"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
});


bloggRoute.patch("/update/:id",athorization(["User"]),async(req,res)=>{
    try {
        const userdata=req.body;
        const id=req.params.id;
        const updateddata=await bloggModle.findByIdAndUpdate(id,userdata);
        res.status(200).send({"msg":"blogg updated"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
});


bloggRoute.delete("/delete/:id",athorization(["User","Moderator"]),async(req,res)=>{
    try {
        const userdata=req.body;
        const id=req.params.id;
        const deletedddata=await bloggModle.findByIdAndDelete(id,userdata);
        res.status(200).send({"msg":"blogg deleted",deletedddata})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
});


module.exports={
    bloggRoute
}