const jwt=require('jsonwebtoken')

const bcrypt=require('bcrypt')

exports.validate=(res,message,one,two,three)=>{
    return new Promise((resolve,reject)=>{
        if(one==='' ||two==='' || three===''){
             return res.status(400).json({message:message})
        }else{
            resolve('success')
        }
     })}
 exports.error=(res,message,consoleError)=>{
    res.status(400).json({message:message})
        console.log(consoleError)   
 }
exports.premium=(res,isPremium)=>{
    return new Promise((resolve,reject)=>{
        if(isPremium===false) {
            return res.status(400).json({message:'join premium to enjoy this feature'})
        }else{
            resolve('yes he is premium')
        }        
    })
}

exports.generateToken=(id,name,isPremium)=>jwt.sign({id,name,isPremium},process.env.JWT_TOKEN)
exports.verify=(token,secrate)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token,secrate,(err,token)=>{
            if(token){
               resolve(token)
            }else{
                reject(err)
            }
        })
    })
}

exports.bcryptpassword=(password)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.hash(password,Number(process.env.SALT),async(err,hash)=>{
            if(hash){
                resolve(hash)
            }
           if(err){
            reject(err)
           }
        })       
    })
}

exports.compair=(res,p1,p2)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.compare(p1,p2,((err,result)=>{
            if(result)  {
              resolve(result)
            }else{
                return res.status(400).json({message:"incorrect password"}) 
              
            }
        }))
    })
} 


