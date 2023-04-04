const express =require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const path=require('path')
const bodyparser=require('body-parser')
const cors=require('cors')
const userdata=require('./router/userRout')
const allExpense=require('./router/expenseRout')
const allpremiumfeature=require('./router/prem')
const app=express()
app.use(cors())  
app.use(bodyparser.json({extended :false}))
 

app.use('/user',userdata) 
app.use('/expense',allExpense)
app.use('/premium',allpremiumfeature)

// app.use((req,res)=> {
//     console.log(req.url,'got url ')
//     res.sendFile(path.join(__dirname,`public/${req.url}`))
// })

mongoose.connect(process.env.URL_MONGO).then(()=>{
    app.listen(process.env.PORT)
        console.log('connected')})
.catch(err=>console.log('got error while connecting'))

      