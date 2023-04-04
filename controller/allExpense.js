const Expense=require('../models/expense')
const {error,validate}=require('../service/repete')
const mongoose=require('mongoose')

exports.addExpenseAmount=async(req,res)=>{
    const session=await mongoose.startSession()
     session.startTransaction()
    try{ 
        const{amount,comment,catagory}=req.body
        await validate(res,'please fill all details',amount,comment,catagory)
         const exp= await Expense.create([{amount:amount,comment:comment,catagory:catagory}],{session:session})
         req.user.totalExpense=req.user.totalExpense+Number(amount)
         req.user.expenses.push(exp[0]._id)
       await req.user.save({session:session})

       await session.commitTransaction()
        res.status(200).json( exp[0]._id.toString())  
    }catch(e){ 
        await session.abortTransaction()
                error(res,'something went wrong',`${e.message}:error while adding item`)
    }finally{
        await session.endSession()
    }
} 
exports.deleteAmount=async(req,res)=>{
    const session=await mongoose.startSession()
     session.startTransaction()
    try{
           await Expense.deleteOne({_id:req.params.id},{session})
            req.user.totalExpense=req.user.totalExpense-Number(req.body.amount)
                const exp= await req.user.expenses.filter(e=>e._id.toString()!=req.params.id.toString())
                req.user.expenses=exp
            await req.user.save({session})
            
            await session.commitTransaction()
             res.status(200).json({success:true})
         
    }catch(err){   
        
        await session.abortTransaction()
        error(res,'something went wrong',`${err.message}:error while deleting item`)
    }
    finally{
       await session.endSession()
    }
}
 
exports.ediiAmount=async(req,res)=>{
    try{
            const exp = await Expense.findOne({_id:req.params.id})
            res.status(200).json(exp)
     }catch(err){
        error(res,'something went wrong','error while editing item')
     }
}

exports.getTotalAmount=(req,res)=>{
    try{
        res.status(200).json(req.user.totalExpense)
 }catch(err){
    error(res,'something went wrong','error while editing item')
 }
}

exports.paginationofExpense=async(req,res)=>{
    try{
        const{perpage,pageNo}=req.body
        const pageNumber=Number(pageNo)
        const perPage=Number(perpage)

        let count=req.user.expenses.length

        const exp=await req.user.populate([{
            path:'expenses',
            model:'expenses',
            options:{
                skip:pageNumber*perPage,
                limit:perPage
            }
        }])
        let lastpage=(Math.ceil(count/perPage)-1)   
            
        const obj={
            currentPage:pageNumber,
            hasNextpage: lastpage>=pageNumber+1,
            nextpage:pageNumber+1,
            hasPreviouspage:pageNumber>0,
            previouspage:pageNumber-1,
            lastpage:lastpage>pageNumber+1?lastpage:0
        }
        res.status(200).json({expnese:exp.expenses,pageObj:obj})
    }catch(err){
        error(res,'something went wrong','error showing all item')
    }
}
