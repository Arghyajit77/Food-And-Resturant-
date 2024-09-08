const testUserController=async(req,res)=>{
try {
    res.status(200).send('test user data api'
    )
    
} catch (error) {
    console.log(error)

}


}





module.exports={testUserController}