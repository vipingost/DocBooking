const express=require('express')

const router =express.Router()
const imageRoute=require('./image-route')
const adminRoutes=require('./admin-routes')
const departmentRoutes=require('./department-routes')
const DoctorRoutes=require('./doctor-routes')

router.use('/upload', imageRoute)
router.use('/admin',adminRoutes)
router.use('/department',departmentRoutes)
router.use('/doctor',DoctorRoutes)


module.exports=router