const Expense=require('../models/expense')
const {error,validate}=require('../service/repete')

exports.addExpenseAmount=async(req,res)=>{
    
    try{ 
        const{amount,comment,catagory}=req.body
        await validate(res,'please fill all details',amount,comment,catagory)
         const exp= await Expense.create({amount:amount,comment:comment,catagory:catagory})
         req.user.totalExpense=req.user.totalExpense+Number(amount)
         req.user.expenses.push(exp._id)
        req.user.save()
        res.status(200).json( exp._id.toString()) 

    }catch(e){ 
        error(res,'something went wrong','error while adding item')
    } 
} 
exports.deleteAmount=async(req,res)=>{
    try{
           await Expense.deleteOne({_id:req.params.id})
            req.user.totalExpense=req.user.totalExpense-Number(req.body.amount)
        const exp= req.user.expenses.filter(e=>e._id.toString()!=req.params.id.toString())
        req.user.expenses=exp
        req.user.save()
             res.status(200).json({success:true})
        
    }catch(err){
        error(res,'something went wrong','error while deleting item')
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
