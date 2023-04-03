const url='localhost'
const token=localStorage.getItem('username')
const perpageItem=localStorage.getItem('perpage_item')
const perpage=document.getElementById('per-page')
perpage.addEventListener('click',()=> {
    localStorage.setItem('perpage_item',perpage.value)
    paginationcontent(currentpagedom.value)
} )

document.getElementById('addExpense').addEventListener('click',addExpense)
const addItem=document.getElementById('addItem')
addItem.addEventListener('click',editDeletebtn)
    
function addExpense(e){
    try{    
    e.preventDefault()    
        let obj={
            amount:document.getElementById('amount').value,
            comment:document.getElementById('comment').value,
            catagory:document.getElementById('catagory').value
         }
         
         showAllItemOnScreen(obj,false)
     }catch(e){
            console.log('error while adding ')
        }
    }



async function showAllItemOnScreen(obj,screenload){
    try{
        if(obj.amount===''||obj.comment===''){
                document.getElementById('error').innerHTML='OOh! plaese fill all field'
                setTimeout(()=>document.getElementById('error').innerHTML="",3000)
                return
             }
                let li=document.createElement('li')
                li.appendChild(document.createTextNode(`${obj.amount} : ${obj.comment} : ${obj.catagory} ::`))
                let del=document.createElement('button')
                del.appendChild(document.createTextNode('Delete'))
                del.className='delete'
                li.className='list'
                li.value=obj.amount
                let edit=document.createElement('button')
                edit.appendChild(document.createTextNode('Edit'))
                edit.className='edit'
                li.appendChild(del)
                li.appendChild(edit)
                
            if(screenload){
                addItem.appendChild(li)
                del.value=obj._id
                edit.value=obj._id
               
            }else{
               const value=await axios.post(`http://${url}:3000/expense/addExpense`,obj,{headers:{'authorization':token}})
               const id=value.data
                    del.value=id
                    edit.value=id
                    totalAmount(obj.amount)
                    addItem.appendChild(li)
                
               
            }
     }catch(e){ 
        console.log(e.response.data.message)
         document.getElementById('error').innerHTML=e.response.data.message
        console.log('error while adding item') }            
    
}

async function editDeletebtn (e){
    e.preventDefault()
try{

        const edit=e.target.classList.contains('edit')
        const delet=e.target.classList.contains('delete')
    if(edit || delet){
        const  id=e.target.value
        const amount=  e.target.parentElement.value
    if(edit){
       const value= await axios.get(`http://${url}:3000/expense/ediiAmount/${id}`,{headers:{'authorization':token}})
       console.log(value.data)
        const{amount,comment,catagory}=value.data
                document.getElementById('amount').value=amount
                document.getElementById('comment').value=comment
                document.getElementById('catagory').value=catagory
            
    }
  
   await axios.post(`http://${url}:3000/expense/deleteAmount/${id} `,{amount},{headers:{'authorization':token}})
    totalAmount(-amount)
    addItem.removeChild(e.target.parentElement)//deleting item after successfully deleting from backend
    }
}catch(g){console.log('error while deleting ',g)}
}


const total=document.getElementById('total')
function totalAmount(amount){
            let value=Number(amount)
                total.value=Number(total.value) +value
            total.innerHTML=`Tottal Expense <button class="totalamount" >${total.value}</button>`
          
    }
async function totalgetamount(){
    const value= await axios.get(`http://${url}:3000/expense/totalAmount`,{headers:{'authorization':token}})
    totalAmount(value.data)
}
 
window.addEventListener('DOMContentLoaded',() => {
        perpage.value=localStorage.getItem('perpage_item')
        paginationcontent(0)
        totalgetamount()
    });


const nextpagedom= document.getElementById('nextPage')
const currentpagedom=document.getElementById('currentPage')
const previouspagedom= document.getElementById('previousPage')
const lastpagedom=document.getElementById('lastpage')
const showcurrentpage=(currentPage)=>{
    currentpagedom.value=Number(currentPage)
    currentpagedom.innerHTML=currentPage+1}
const showNextPage=(nextpage)=>{
    nextpagedom.innerHTML=`<button value=${nextpage}>${nextpage+1}</button>`}
const showPreviouspage=(previouspage)=>{
    previouspagedom.innerHTML=`<button value=${previouspage}>${previouspage+1}</button> `}
const showLastPage=(lastpage)=>{
    lastpagedom.innerHTML=`........<button value=${lastpage}>${lastpage+1}</button>`}
nextpagedom.addEventListener('click',changepageNumber)
currentpagedom.addEventListener('click',changepageNumber)
previouspagedom.addEventListener('click',changepageNumber)
lastpagedom.addEventListener('click',changepageNumber)

function changepageNumber(e){
    paginationcontent(Number(e.target.value))
    console.log('click',e.target)
}
async function paginationcontent(pageNo){
    const obj={
        perpage:localStorage.getItem('perpage_item'),
        pageNo:pageNo
    }
    const value= await axios.post(`http://${url}:3000/expense/pagination`,obj,{headers:{'authorization':token}})
    pagination(value.data.pageObj)
    addItem.innerHTML=''
    value.data.expnese.forEach(e=> showAllItemOnScreen(e,true) )
}

function pagination({
    currentPage,
    hasNextpage,
    nextpage,
    hasPreviouspage,
    previouspage,
    lastpage}){
        showcurrentpage(currentPage)
        if(hasNextpage){
            showNextPage(nextpage)
        } else {
            nextpagedom.innerHTML=''
        }
        if(hasPreviouspage){
            showPreviouspage(previouspage)
        }else {
            previouspagedom.innerHTML=''
        }
        if(lastpage<2){
            lastpagedom.innerHTML=''
        }else  {
            showLastPage(lastpage)
        }
        
        
}

    
    
