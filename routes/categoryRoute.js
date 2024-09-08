const express=require('express');
const authMiddlewares = require('../middlewares/authMiddlewares');
const { createcategoryController,getAllCatController,updateCatController,deleteCatController } = require('../controllers/categoryController');
const router=express.Router()
// create category
router.post('/createcategory',authMiddlewares,createcategoryController)
//GET ALL CAT
router.get("/getAll", getAllCatController);

// UPDATE CAT
router.put("/update/:id", authMiddlewares, updateCatController);

// DLEETE CAT
router.delete("/delete/:id", authMiddlewares, deleteCatController);

module.exports = router;