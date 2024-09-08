const express=require('express');
const { getUserController, updateUserController, resetpasswordController, updatepasswordController, deletuser } = require('../controllers/userController');
const authMiddlewares = require('../middlewares/authMiddlewares');

const router=express.Router()
router.get('/getUser',authMiddlewares,getUserController)
router.put('/updateuser',authMiddlewares,updateUserController)
router.post('/resetpassword',authMiddlewares,resetpasswordController)
router.post('/updatepassword',authMiddlewares,updatepasswordController)
router.delete('/deletuser/:id',authMiddlewares,deletuser)
module.exports = router;