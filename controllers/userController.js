const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const getUserController=async(req,res)=>{
try {
    const user=await userModel.findById({_id:req.body.id})
    if(!user){
        return res.status(401).send({
            success:false,
            message:"User Cant Available"
        })
    }
    user.password=undefined;
    // response
    res.status(200).send({
        success:true,
        message:"User Get Successfully",
        user,
    });
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"User Not Find"
    })
}
    
}

// update
const updateUserController=async(req,res)=>{
try {
    const user=await userModel.findById({_id:req.body.id});
    if(!user){
   return res.status(401).send({
    success:false,
    message:"User Not Found",
   });
    }
    //update
    const{userName,address,phone}=req.body;
    if(userName)user.userName=userName;// when latest username will come then it will be replace by this
    if(address)user.address=address;
    if(phone)user.phone=phone;
    // save
    await user.save();
    res.status(200).send({
        success:true,
        message:"Update Sucessfully",
        user,
    });
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Cannot Update"
    })
}
}
// reset paswword
const resetpasswordController=async(req,res)=>{
try {
    const {email,newPassword,answere}=req.body;
    if(!email || !newPassword ||!answere){
        return res.status(401).send({
            success:false,
            message:"Fill Up All Field",
        })
    }
    const user=await userModel.findOne({email,answere})
    if(!user){
        return res.status(500).send({
            success:false,
            message:"Invalid In User",
        })
    }
   //hashing password
   var salt = bcrypt.genSaltSync(10);
   const hashedPassword = await bcrypt.hash(newPassword, salt);
   user.password = hashedPassword;
   await user.save();
   res.status(200).send({
     success: true,
     message: "Password Reset SUccessfully",
   });
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Password Not Reset",
        error,
    });
}
}
// update password
const updatepasswordController=async(req,res)=>{
try {
    const user=await userModel.findById({_id:req.body.id});
    if(!user){
        return res.status(401).send({
            success:false,
            message:"User Not Defined"
        })
    }
    const {oldPassword,newPassword}=req.body;
    if(!oldPassword || !newPassword){
        return res.status(402).send({
            success:false,
            message:"Paswword  Not Defined"
        })
    }
     //check user password  | compare password
     const isMatch = await bcrypt.compare(oldPassword, user.password);
     if (!isMatch) {
       return res.status(500).send({
         success: false,
         message: "Invalid Credentials",
       });
     }
      //hashing password
   var salt = bcrypt.genSaltSync(10);
   const hashedPassword = await bcrypt.hash(newPassword, salt);
   user.password = hashedPassword;
   await user.save();
   res.status(200).send({
     success: true,
     message: "Password Reset SUccessfully",
   });
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"INvalid Password"
    })
}
}
// delet user
const deletuser=async(req,res)=>{
try {
    await userModel.findByIdAndDelete(req.params.id)
    return res.status(200).send({
        success:true,
        message:"Delet Account Successfully"
    })
} catch (error) {
   console.log(error)
   res.status(500).send({
    success:false,
    message:"PROFILE Is Not Delet"
   }) 
}
}
module.exports={getUserController,updateUserController,resetpasswordController,updatepasswordController,deletuser}