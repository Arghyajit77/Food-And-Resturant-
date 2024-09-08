const express=require('express');
const authMiddlewares = require('../middlewares/authMiddlewares');
const { createFoodController, getAllFoodsController, getSingleFoodController, getFoodByResturantController, deleteFoodController, placeOrderController, orderstatusController } = require('../controllers/foodController');
const { updateCatController } = require('../controllers/categoryController');
const adminMiddlewares = require('../middlewares/adminMiddlewares');
//const adminMiddlewares = require('../middlewares/adminMiddlewares');
const router=express.Router()
//routes
//CREATE FOOD
router.post("/create", authMiddlewares, createFoodController);

//GET ALL FOOD
router.get("/getAll", getAllFoodsController);

// GET SINGLE FOOD
router.get("/get/:id", getSingleFoodController);

// GET  FOOD by rest
router.get("/getByResturant/:id", getFoodByResturantController);

// UPDATE FOOD
router.put("/update/:id", authMiddlewares, updateCatController);

// DELETE FOOD
router.delete("/delete/:id", authMiddlewares, deleteFoodController);
// PLACE ORDER
router.post("/placeorder", authMiddlewares, placeOrderController);
// change order status
router.post("/orderstatus/:id",authMiddlewares,adminMiddlewares,orderstatusController)


module.exports = router;