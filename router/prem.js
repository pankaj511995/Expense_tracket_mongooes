const {Router}=require('express')
const controller=require('../controller/purchase')
const {authenticate}=require('../middleware/autho')
const {leaderboardOfAll,downloadAllExpenseLink}=require('../controller/premiumFeature')

const router=Router()

router.get('/createOrder',authenticate,controller.createOrderId)
router.post('/updateOrder',authenticate,controller.updateOrderId)
router.post('/updateFailedOrder',authenticate,controller.failOrderStatus)
router.get('/leaderboard',authenticate,leaderboardOfAll)
router.get('/downloadexpense',authenticate,downloadAllExpenseLink)



module.exports=router 