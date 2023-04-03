const Sib=require('sib-api-v3-sdk')
exports.sendEmail=(email,id)=>{
    return new Promise((resolve,reject)=>{
            const Client=Sib.ApiClient.instance
            const apiKey=Client.authentications['api-key']
            apiKey.apiKey=process.env.SENDINBLUE_SMPT
            const sendEmailApi=new Sib.TransactionalEmailsApi()

                const sender={
                    email:process.env.EMAIL_ID,
                    name:'pankaj'
                }
                const recever=[{
                    email:email
                }
            ]

                sendEmailApi.sendTransacEmail({
                    sender,
                    to:recever,
                    subject:'this is for testing api only',
                    textContent:'hi reset your password',
                    htmlContent:
                    `<a href=http://localhost:3000/user/passwordlink/${id}>click hear </a>`
                }).then(e=>{
                    
            resolve(e.messageId)
        }).catch(err=>reject(err))

    })
}

