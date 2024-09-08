const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

// register
/*const registerController=async(req,res)=>{
try {
    const {username,email,password,address,phone,}=req.body
 if(!username ||!email ||!password||!address||!phone){
    res.status(200).send({
        success:false,
        message:"Please Fill This Blank Position"
 })
// existing coustomer
const  existingcoustomer=await userModel.findOne({email})
  if(existingcoustomer){
    res.status(200).send({
        success:false,
        message:"Already Register kindly login"
    })
}
// create new user
const user=userModel.create({
    username,
    email,
    password,
    address,
    phone,
});
res.status(200).send({
    success:true,
    message:"registation sucessfully"
})
}
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Invalid Registration",
        error,
    });
}
}*/
const registerController = async (req, res) => {
    try {
      const { userName, email, password, phone, address,answere } = req.body;
      //validation
      if (!userName || !email || !password || !address || !phone || !answere) {
        return res.status(500).send({
          success: false,
          message: "Please Provide All Fields",
        });
      }
      // chekc user
      const exisiting = await userModel.findOne({ email });
      if (exisiting) {
        return res.status(500).send({
          success: false,
          message: "Email Already Registerd please Login",
        });
      }
      //hashing password
      var salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      //create new user
      const user = await userModel.create({
        userName,
        email,
        password:hashedPassword,
        address,
        phone,
        answere,
      });
      res.status(201).send({
        success: true,
        message: "Successfully Registered",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Register API",
        error,
      });
    }
  };

  //login
  /*const loginController=async(req,res)=>{
  try {
    const {email,password}=req.body
    if(!email|| !password){
      return res.status(400).send({
        success:false,
        message:"Invalid In Email And Password"
      });
    }
    // check user
    const user=await userModel.findOne({email})
    if(!user){
      return res.status(500).send({
        success:false,
        message:"invalid user"
      })
    }
    res.status(200).send({
      success:true,
      message:"Login Sucessfully",
      user,
    })
     //check user password  | compare password
     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) {
       return res.status(500).send({
         success: false,
         message: "Invalid Credentials",
       });
     }
     // token
     const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
       expiresIn: "7d",
     });
     res.status(200).send({
       success: true,
       message: "Login Successfully",
       user:{
        _id: user._id,
        userName: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,},
        token,
     });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Invalid In Login"
    });
  }
  }*/
  const loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
      //validfatuion
      if (!email || !password) {
        return res.status(500).send({
          success: false,
          message: "Please PRovide EMail OR Password",
        });
      }
      //check user
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User Not Found",
        });
      }
      //check user password  | compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(500).send({
          success: false,
          message: "Invalid Credentials",
        });
      }
      // token
      const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      user.password = undefined;
      res.status(200).send({
        success: true,
        message: "Login Successfully",
        token,
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Login API",
        error,
      });
    }
  };
module.exports={registerController,loginController}