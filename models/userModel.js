const mongoose =require("mongoose")
const userSchema=new mongoose.Schema({
userName:{
    type:String,
    required:[true,'user name is required']
},
email:{
    type:String,
    required:[true,'email is required']
},
password:{
    type:String,
    required:[true,'password is required']
},
address:{
    type:String,
    required:[true,'address is required']
},
phone:{
    type:String,
    required:[true,'phone is required']
},
answere:{
 type:String,
 required:[true,'Answere is required']
},
usertype:{
    type:String,
    required:[true,'user is required'],
    default:'client',
    enum:['client','admin','vendor','driver']
},
/*profile: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
  },
  answer: {
    type: String,
    required: [true, "Asnwer is required"],
  },*/
},
{ timestamps: true }
);

//export
module.exports = mongoose.model("User", userSchema);