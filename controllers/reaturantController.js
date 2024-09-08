const resturantModel = require("../models/resturantModel");

// CREATE RESTURANT
const createResturantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    // validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "please provide title and address",
      });
    }
    const newResturant = new resturantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newResturant.save();

    res.status(201).send({
      success: true,
      message: "New Resturant Created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Resturant api",
      error,
    });
  }
};
const getallsingle=async(req,res)=>{
try {
    const resturant=await resturantModel.findOne({})
    if(!resturant){
        return res.status(401).send({
            success:false,
            message:"Fill Up The Resturant Portion"
        })
    }
    res.status(200).send({
        success:true,
        totalCount:resturant.length,
        resturant,
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error In Single Element",
       
    })
}
}
const resturantIdController=async(req,res)=>{
try {
    const resturantId = req.params.id;
   // req :refers to the Express.js request object.
//params :is an object within the request object that holds route parameters.
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Resturnat ID",
      });
    }
    //find resturant
    const resturant = await resturantModel.findById(resturantId);
    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "no resturant found",
      });
    }
    res.status(200).send({
      success: true,
      resturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get Resturarnt by id api",
      error,
    });
  }
}
const deleteResturantController=async(req,res)=>{
try {
    const resturantId=req.params.id;
    if(!resturantId){
        return res.status(401).send({
            success:false,
            message:"Fill Up The ResturantId"
        });

    }
   await resturantModel.findByIdAndDelete(resturantId);
    res.status(200).send({
        success:true,
        message:"Delet Successfully",
    })

} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error In Delet Part",
        error,
    });
}
}
module.exports={createResturantController,getallsingle,resturantIdController, deleteResturantController}