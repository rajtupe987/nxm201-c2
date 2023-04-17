const athorization=(passedRole)=>{
    return (req,res,next)=>{
        const userrole=req.role;

        if(passedRole.includes(userrole)){
            next();
        }else{
            return res.status(500).send({"msg":"You are Unothorised"})
        }
    }
};


module.exports={
    athorization
}