const {Router}=require('express')
const controller=require('../controller/allExpense')
const {authenticate}=require('../middleware/autho')

const router=Router()

router.post('/addExpense',authenticate,controller.addExpenseAmount)
router.post('/deleteAmount/:id',authenticate,controller.deleteAmount)
router.get('/ediiAmount/:id',authenticate,controller.ediiAmount)
router.post('/pagination',authenticate ,controller.paginationofExpense)
router.get('/totalAmount',authenticate ,controller.getTotalAmount)

module.exports=router 