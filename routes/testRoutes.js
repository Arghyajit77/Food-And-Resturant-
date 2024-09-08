const express=require('express')
const { testUserController } = require('../controllers/testController')
// router object
const router = express.Router()
// router GET|DELET|PUT|POST
router.get('/test-user',testUserController)
// expoert
module.exports=router