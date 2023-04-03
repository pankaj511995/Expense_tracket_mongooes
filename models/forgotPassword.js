const mongoose=require('mongoose')

const forgetpassword = new mongoose.Schema({
    isActive:{
   type: Boolean,
   default:false
  },
  userId:String
});

module.exports=mongoose.model('forgots',forgetpassword)

