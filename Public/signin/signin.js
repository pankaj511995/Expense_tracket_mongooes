const url='localhost'
document.querySelector('#signin').addEventListener('click', async (e)=>{
    try{
                e.preventDefault()
                let obj={
                    email:document.getElementById('email').value,
                    password:document.getElementById('password').value
                 }
            const tok=  await axios.post(`http://${url}:3000/user/signin`,obj)
            localStorage.setItem('username',(tok.data.token))
            localStorage.setItem('isPremium',parseJwt(tok.data.token).isPremium)
            window.location.href='../expense/expense.html'
                message('success')
                    
     }catch(e){  
        message(e.response.data.message)
        console.log('error while sign in ',e)}           
})
function message(e){
    document.getElementById('error').innerHTML=e
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}