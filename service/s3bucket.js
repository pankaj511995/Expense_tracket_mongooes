const AWS=require('aws-sdk')
exports.S3BucketUpload=(data,email)=>{
    const filename=`expenseAll${email}/${new Date().getTime()}.txt`
    return new Promise((resolve,reject)=>{ 
            const S3Bucket=new AWS.S3({
                accessKeyId:process.env.AWS_KEY,
                secretAccessKey:process.env.AWS_SECRATE
            })
      const params={
                Bucket:process.env.BUCKET_NAME,
                Key:filename,
                Body:data,
                ACL:'public-read'
            }
   S3Bucket.upload(params,((err,filename)=>{
                if(filename){
                    resolve(filename.Location)
                }else{
                    reject(err)
                }
            }))
})
}