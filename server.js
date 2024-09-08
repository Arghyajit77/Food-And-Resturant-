//import express from "express"
const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const dotenv=require('dotenv');
const connectDb = require('./config/db');

//configure env
dotenv.config();
// rest object
const app=express();
// middelware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
//databse config
connectDb();
// route
app.use("/api/v1/test",require('./routes/testRoutes'));
app.use("/api/v1/auth",require('./routes/authRoute'));
app.use("/api/v1/User",require('./routes/userRoutes'));
app.use("/api/v1/resturant", require("./routes/resturantRoute"));
app.use("/api/v1/category", require("./routes/categoryRoute"));
app.use("/api/v1/food", require("./routes/foodRoute"));
app.get("/",(req,res)=>{
    return res.status(200).send("Welcome to foodapp")
})
//port
const PORT=process.env.PORT || 7777;
// listner
app.listen(PORT, () => {
    console.log(
     `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`
    );
  });