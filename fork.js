const os=require('os')
const app=require('express')()
const cluster=require('cluster')
const cpu=os.cpus().length//number of cup
const mongoose=require('mongoose')
require('dotenv').config()
const path=require('path')
const bodyparser=require('body-parser')
const cors=require('cors')
const userdata=require('./router/userRout')
const allExpense=require('./router/expenseRout')
const allpremiumfeature=require('./router/prem')
app.use(cors())  
app.use(bodyparser.json({extended :false}))



// app.use((req,res)=> {
//     console.log(req.url,'got url ')
//     res.sendFile(path.join(__dirname,`public/${req.url}`))
// })


if(cluster.isPrimary){
    console.log(`mastre at ${process.pid}`)
    for(let i=0;i<cpu;i++){
        cluster.fork()
    }
    cluster.on('exit',()=>{
        cluster.fork()
    })
}else{

    
app.use('/user',userdata) 
app.use('/expense',allExpense)
app.use('/premium',allpremiumfeature)

mongoose.connect(process.env.URL_MONGO).then(()=>{
    app.listen(process.env.PORT)
        console.log('connected',`at ${process.pid}`)})
.catch(err=>console.log('got error while connecting'))
     
}
