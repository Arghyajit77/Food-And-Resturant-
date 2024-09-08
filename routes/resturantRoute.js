const express=require('express');
const authMiddlewares = require('../middlewares/authMiddlewares');
const {createResturantController, getallsingle, resturantIdController, deleteResturantController } = require('../controllers/reaturantController');

const router=express.Router()
router.post('/createresturant',authMiddlewares,createResturantController)
// all element get
router.get('/getsingle',getallsingle);
// get resturant id
router.get('/get/:id',resturantIdController)
// delet
router.delete("/delete/:id", authMiddlewares, deleteResturantController);
module.exports = router;