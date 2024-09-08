const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");
const createFoodController=async(req,res)=>{
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturant,
      rating,
    } = req.body;

    if (!title || !description || !price || !resturant) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all fields",
      });
    }
    const newFood = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturant,
      rating,
    });

    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New Food Item Created",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create food api",
      error,
    });
  }
};
// GET ALLL FOODS
const getAllFoodsController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "no food items was found",
      });
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erro In Get ALL Foods API",
      error,
    });
  }
};

// GET SINGLE FOOD
const getSingleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "please provide id",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with htis id",
      });
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get SIngle Food API",
      error,
    });
  }
};
// get food by resturant
// GET FOOD BY RESTURANT
const getFoodByResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "please provide id",
      });
    }
    const food = await foodModel.find({ resturnat: resturantId });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with htis id",
      });
    }
    res.status(200).send({
      success: true,
      message: "food base on restuatrn",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get SIngle Food API",
      error,
    });
  }
};
// UPDATE FOOD ITEm
const updateFoodController = async (req, res) => {
  try {
    const foodID = req.params.id;
    if (!foodID) {
      return res.status(404).send({
        success: false,
        message: "no food id was found",
      });
    }
    const food = await foodModel.findById(foodID);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found",
      });
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating,
    } = req.body;
    const updatedFood = await foodModel.findByIdAndUpdate(
      foodID,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        catgeory,
        code,
        isAvailabe,
        resturnat,
        rating,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Food Item Was Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr In Update Food API",
      error,
    });
  }
};

// DELETE FOOD
const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "provide food id",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with id",
      });
    }
    await foodModel.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "Food Item Dleeted ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror In Delete Food APi",
      error,
    });
  }
};
const placeOrderController=async(req,res)=>{
try {
  const {cart}=req.body;
  if(!cart){
    return res.status(401).send({
      success:false,
      message:"Provide the cart details"
    })
  }
  let total=0;
  //calculate
  cart.map((i)=>{
total+=i.price;
  })
  const neworder= new orderModel({
     foods:cart,
     payment:total,
     buyer:req.body.id
  })
  await neworder.save()
  res.status(200).send({
    success:true,
    message:"Place Order Successfully"
  })
} catch (error) {
  console.log(error)
  res.status(500).send({
    success:false,
    message:"Error In Order Place"
  })
}
}
const orderstatusController=async(req,res)=>{
try {
  const orderId=req.params.id;
  if(!orderId){
    return res.status(402).send({
      success:false,
      message:"Fill up the userId"
    })
  }
  const {status}=req.body;
 const order=await orderModel.findByIdAndUpdate(
  orderId,
  { status },
  { new: true }
 )
 res.status(200).send({
  success:true,
  message:"Status Update Successfully"
 })
} catch (error) {
  console.log(error)
  res.status(500).send({
    success:false,
    message:"Order Status Cant be update"
  })
}
}




module.exports={createFoodController,
  getSingleFoodController,
  getAllFoodsController,
  getFoodByResturantController,updateFoodController,deleteFoodController
  ,placeOrderController,orderstatusController}