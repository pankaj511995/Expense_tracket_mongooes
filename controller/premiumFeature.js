const User=require('../models/user');
const Download=require('../models/download')
const {S3BucketUpload}=require('../service/s3bucket')
const {error,premium}=require('../service/repete')

exports.leaderboardOfAll=async(req,res)=>{
    try{
        await premium(req.user.isPremium)
        const user=await User.find().select("name totalExpense").sort([['totalExpense',-1]])
        res.status(200).json(user) 
    }catch(err){
        error(res,'join premium to enjoy this feature','error while printing leaderboard')
    }
}
exports.downloadAllExpenseLink= async(req,res)=>{
    try{
        await premium(req.user.isPremium)
        const exp=await req.user.populate('expenses')
        const location=await S3BucketUpload(JSON.stringify(exp.expenses),req.user.email)
            const loc=await Download.create({location:location,timestamps: true})
            req.user.downloads.push(loc)
            await req.user.save() 
        const url=await req.user.populate('downloads')
        res.status(200).json({Location:url.downloads,link:location})
    }catch(err){
        error(res,'join premium to enjoy this feature','error while downloading all expense')
    }
}

