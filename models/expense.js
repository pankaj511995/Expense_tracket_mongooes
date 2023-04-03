const mongoose=require('mongoose')

const expense = new mongoose.Schema({
    amount:Number,
    comment:String,
    catagory:String
        
});

module.exports=mongoose.model('expenses',expense)
