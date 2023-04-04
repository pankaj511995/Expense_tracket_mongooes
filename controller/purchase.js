const Order=require('../models/orders')
const servicepayment=require('../service/razorpay')
const mongooes=require('mongoose')
const {error,generateToken}=require('../service/repete')
exports.createOrderId=async(req,res)=>{
    const session=await mongooes.startSession()
    session.startTransaction()
    try{
            const order=await servicepayment.createOrder()        
           const or= await Order.create([{orderId:order.id}],{session:session})
           req.user.orders.push(or[0]._id)
           await req.user.save({session:session})
           await session.commitTransaction()
            res.status(200).json({orderId:order.id,key_id:process.env.RAZ_KEY})
    
}catch(err){
    await session.abortTransaction()
        
    error(res,'something went wrong',`${err.message}error while creating payment link`)
  }
  finally{
    await session.endSession()
  }
}

exports.updateOrderId=async (req,res)=>{
    const session=await mongooes.startSession()
     session.startTransaction()
    try{
        const{razorpay_payment_id,razorpay_order_id}=req.body
        await Order.updateOne({orderId:razorpay_order_id},{paymentId:razorpay_payment_id,status:true},{session:session})
        req.user.isPremium=true        
        await req.user.save({session:session})
        await session.commitTransaction()
        res.status(200).json({token:generateToken(req.user.id,req.user.name,true)})
    }catch(err){
        await session.abortTransaction()
         error(res,'something went wrong',`${err.message}error while uploading payment link`)
    }finally{
        await session.endSession()
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