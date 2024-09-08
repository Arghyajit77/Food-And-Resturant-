const categoryModel = require("../models/categoryModel");

const createcategoryController=async(req,res)=>{
try {
    const {title,imageUrl}=req.body;
    if(!title || !imageUrl){
        return res.status(301).send({
            success:false,
            message:"Fill Up In Tittle And ImageUrl",
        });
    }
    const newcreatecategory=new categoryModel({
        title,imageUrl 
    })
    await newcreatecategory.save();
    res.status(200).send({
        success:true,
        message:"Creation Successfully",
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error In Create Category"
    })
}
}
// GET ALL CAT
const getAllCatController = async (req, res) => {
    try {
      const categories = await categoryModel.find({});
      if (!categories) {
        return res.status(404).send({
          success: false,
          message: "No Categories found",
        });
      }
      res.status(200).send({
        success: true,
        totalCat: categories.length,
        categories,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr in get All Categpry API",
        error,
      });
    }
  };
  
  // UPDATE CATE
  const updateCatController = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, imageUrl } = req.body;
      const updatedCategory = await categoryModel.findByIdAndUpdate(
        id,
        { title, imageUrl },
        { new: true }
      );
      if (!updatedCategory) {
        return res.status(500).send({
          success: false,
          message: "No Category Found",
        });
      }
      res.status(200).send({
        success: true,
        message: "Category Updated Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error in update cat api",
        error,
      });
    }
  };
  
  // DLEETE CAT
  const deleteCatController = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(500).send({
          success: false,
          message: "Please provide Category ID",
        });
      }
      const category = await categoryModel.findById(id);
      if (!category) {
        return res.status(500).send({
          success: false,
          message: "No Category Found With this id",
        });
      }
      await categoryModel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "category Deleted succssfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error in Dlete Cat APi",
        error,
      });
    }
  };
module.exports={createcategoryController,getAllCatController,updateCatController,deleteCatController}