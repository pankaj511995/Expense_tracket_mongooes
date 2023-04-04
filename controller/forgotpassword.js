const User=require('../models/user')
const forgotPassword=require('../models/forgotPassword')
const {sendEmail}=require('../service/email')
const {error,bcryptpassword}=require('../service/repete')

exports.forgotPasswordLink=async(req,res)=>{
    try{
         
    const user=await User.findOne({email:req.body.email})
    if(user){
            
           const forgot= await forgotPassword.create ({isActive:true,userId:user._id})
           const p1=sendEmail(req.body.email,forgot._id.toString())
           const p2= User.findOneAndUpdate(user._id,{$push:{forgots:forgot._id}},{new:true,useFindAndModify:false})

            await Promise.all([p1,p2])
        res.status(200).json({message:'sent email'})
    }else throw new Error() 
}catch(err){
    error(res,'something went wrong','error while sending forgot email link')
} 
}
exports.sendPasswordLink=async(req,res)=>{
    const f=await forgotPassword.findOne({_id:req.params.id})
    
            if(f.isActive){
                await forgotPassword.updateOne({_id:req.params.id},{isActive:false})
                    res.status(200).send(`
                    <form action="/user/updatepassword/${req.params.id}" method="get">
                        <label for="password">Enter your New password:-</label><br>
                        <input  name="password" type="password"><br>
                        <button>Reset password</button>
                </form>
                
                    `)
                }else{
                    res.send('<strong>Sorry link can open once only</strong>')
                }
}
 
exports.updatePassword=async(req,res)=>{
    try{
            const f=await forgotPassword.findOne({_id:req.params.id})
             const hash=await  bcryptpassword(req.query.password)
              await User.updateOne({_id:f.userId},{password:hash})
               res.status(200).send(`<h1>password has been changed</h1>`)
            
    }catch(err){
        error(res,'something went wrong','error while updating reset password')
    }
} 