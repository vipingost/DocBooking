const express=require('express')
const {signup,login}=require('../controllers/admin-controllers')
const { isAuth } = require('../middlewares')

const router=express.Router()


router.post('/signup',signup)
router.post('/login',login)
router.get('/auth',isAuth)

module.exports=router