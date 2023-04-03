const mongoose=require('mongoose')

const download = new mongoose.Schema({
    location:String,
    createdAt: { type : Date, default: Date.now }
})

module.exports=mongoose.model('downloads',download)
