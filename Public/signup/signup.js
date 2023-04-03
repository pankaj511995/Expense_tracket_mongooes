const url='localhost'
document.querySelector('#signup').addEventListener('click', (e)=>{
    e.preventDefault()
    
        let obj={
            name:document.getElementById('name').value,
            email:document.getElementById('email').value,
            password:document.getElementById('password').value
         }
        axios.post(`http://${url}:3000/user/signup`,obj).then(e=>{
            window.location.href='../signin/signin.html'
        //   message('success')
        }).catch(e=> {
            message(e.response.data.message)
       
            
        })                        
        
    })
function message(e){
    document.getElementById('error').innerHTML=e
    setTimeout(()=>document.getElementById('error').innerHTML='' ,4000)
}