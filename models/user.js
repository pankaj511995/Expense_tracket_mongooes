const mongoose=require('mongoose')
const { Schema } = mongoose;
const user = new mongoose.Schema({
   name:String,
  email: { type: String, unique: true, dropDups: true },
  password:String,
  totalExpense:Number,
  isPremium:{
   type: Boolean,
   default:false,
  },
  forgots: [{ type:Schema.Types.ObjectId, ref: 'forgots' }],
  orders: [{ type:Schema.Types.ObjectId, ref: 'orders' }],
  downloads: [{ type:Schema.Types.ObjectId, ref: 'downloads' }],
  expenses: [{ type:Schema.Types.ObjectId, ref: 'expenses' }]
  
});

module.exports=mongoose.model('users',user)