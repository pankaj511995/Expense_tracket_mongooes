const User=require('../models/user')
const {error,verify}=require('../service/repete')
exports.authenticate= async(req,res,next)=>{
    try{
        
       const token=await verify(req.headers.authorization,process.env.JWT_TOKEN)
           req.user= await User.findOne({_id:token.id})
                    next()      
    }catch(err){ 
        error(res,'user does not exist','error while authentication')
    }

}
