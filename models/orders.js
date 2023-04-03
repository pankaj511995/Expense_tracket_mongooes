const mongoose=require('mongoose')

const order = new mongoose.Schema({
    paymentId:String,
    status:{
        type:Boolean,
        default:false
    }
    ,orderId:String
    
});

module.exports=mongoose.model('orders',order)
