const paymentbtn=document.getElementById('premiumLink')
let Leaderboradshow=  document.getElementById('showleaderboard')
paymentbtn.addEventListener('click',openRazorPayLink)

async function openRazorPayLink(e){
    e.preventDefault()
    try{
            const response=await  axios.get(`http://${url}:3000/premium/createOrder`,{headers:{'authorization':token}})
            const payopen={
                    "key":response.data.key_id,
                    "order_id":response.data.orderId,
                    "handler":  async(order)=>{
                       const succ= await axios.post(`http://${url}:3000/premium/updateOrder`,order,{headers:{'authorization':token}})
                                localStorage.setItem('username',(succ.data.token))
                                localStorage.setItem('isPremium',JSON.stringify(true))
                                window.location.href='expense.html'
                         }
                    }

            const rzp=new Razorpay(payopen)
            rzp.open()
            rzp.on('payment.failed',(order)=>{
                axios.post(`http://${url}:3000/premium/updateFailedOrder`,order.error.metadata,{headers:{'authorization':token}})
            })

}catch(err){
    console.log('error while creating payment ')
} 
}

function showpremium(){
    try{
    const isPremium=localStorage.getItem('isPremium')
    if(JSON.parse(isPremium)===true){
        document.getElementById('premiumLink').remove()
        document.getElementById('leaderboard').innerHTML=` <button class="btn" >Show Leaderborad </button>` 
        document.getElementById('downloadexpense').innerHTML=` <button class="btn" >Download Expense </button>`
    }
   
}catch(err){
    console.log('error while showing premium button')
}
}
showpremium()


document.getElementById('leaderboard').addEventListener('click',async()=>{//leaderboard
    try{
        const lead=await  axios.get(`http://${url}:3000/premium/leaderboard`,{headers:{'authorization':token}})
        showpremiumlist(lead.data)
    }catch(err){
        console.log('error while showing leaderboard ')
    }
})

document.getElementById('downloadexpense').addEventListener('click',async()=>{
    try{
        const lastexp=await  axios.get(`http://${url}:3000/premium/downloadexpense`,{headers:{'authorization':token}})
        const a = document.createElement("a");
            a.href = lastexp.data.link;
            a.click();
        downloadexp(lastexp.data.Location)
        console.log(lastexp.data.Location)
    }catch(err){
        console.log('error while downloading expenses')
    }
})


function downloadexp(obj){
    Leaderboradshow.innerHTML=''
    let s=''
    obj.forEach((e,i)=>{{
        s+=`<a href=${e.location} > Expense${i+1} </a> at ${e.createdAt.split('T')[0]}<br>`
    }})
    Leaderboradshow.innerHTML=s
}
function showpremiumlist(obj){
    Leaderboradshow.innerHTML=''    
    obj.forEach(e=>{
        const li=document.createElement('li')
        li.appendChild(document.createTextNode(`Name :-> ${e.name}   : : total exp :->${e.totalExpense}`))
        li.className-'listitem'
      Leaderboradshow.appendChild(li)
    })
}