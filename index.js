const express=require("express");
const {connection}=require("./config/db");
const {UserRoute}=require("./Routes/user_route");
const {bloggRoute}=require("./Routes/blogg_routes");
const {authentocator}=require("./middleware/Authenticator");
require("dotenv").config();


const app=express();
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome")
})





app.use("/member",UserRoute);
app.use("/blog",authentocator,bloggRoute);



app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
    console.log(`port no is ${process.env.port}`)
})