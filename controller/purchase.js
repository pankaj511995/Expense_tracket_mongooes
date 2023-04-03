const Order=require('../models/orders')
const servicepayment=require('../service/razorpay')
const {error,generateToken}=require('../service/repete')
exports.createOrderId=async(req,res)=>{
  try{
            const order=await servicepayment.createOrder()        
           const or= await Order.create({orderId:order.id})
           req.user.orders.push(or._id)
           await req.user.save()
            res.status(200).json({orderId:order.id,key_id:process.env.RAZ_KEY})
    
}catch(err){
    error(res,'something went wrong','error while creating payment link')
  }
}

exports.updateOrderId=async (req,res)=>{
    try{
        const{razorpay_payment_id,razorpay_order_id}=req.body
        await Order.updateOne({orderId:razorpay_order_id},{paymentId:razorpay_payment_id,status:true})
        req.user.isPremium=true

        req.user.orders=[]
        await req.user.save()
        res.status(200).json({token:generateToken(req.user.id,req.user.name,true)})
    }catch(err){
         error(res,'something went wrong','error while uploading payment link')
    }
}
exports.failOrderStatus=async(req,res)=>{
    try{
        const{ payment_id, order_id}=req.body
       await Order.updateOne({orderId: order_id},{paymentId: payment_id,status:false})
      
    }catch(err){
        error(res,'something went wrong','error while while uploading failed status')
    }
}