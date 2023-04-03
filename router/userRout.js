const {Router}=require('express')
const controller=require('../controller/userdetails')
const forgotpassword=require('../controller/forgotpassword')

const router=Router()

router.post('/signup',controller.signupUser)
router.post('/signin',controller.signinUser)
router.post('/forgotPassword',forgotpassword.forgotPasswordLink)
router.get('/passwordlink/:id',forgotpassword.sendPasswordLink)
router.get('/updatepassword/:id',forgotpassword.updatePassword)

module.exports=router 