const express=require('express')

const router =express.Router()
const imageRoute=require('./image-route')
const adminRoutes=require('./admin-routes')
const departmentRoutes=require('./department-routes')
const DoctorRoutes=require('./doctor-routes')
const HospitalRoutes=require('./hospital-routes')
const UserRoutes= require('./user-routes')

router.use('/upload', imageRoute)
router.use('/admin',adminRoutes)
router.use('/department',departmentRoutes)
router.use('/doctor',DoctorRoutes)
router.use('/hospital',HospitalRoutes)
router.use('/user',UserRoutes)


module.exports=router