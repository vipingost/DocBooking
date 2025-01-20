const express=require('express')

const router =express.Router()
const imageRoute=require('./image-route')
const adminRoutes=require('./admin-routes')
const departmentRoutes=require('./department-routes')
const DoctorRoutes=require('./doctor-routes')
const HospitalRoutes=require('./hospital-routes')
const UserRoutes= require('./user-routes')
const SlotRoute = require('./slot-routes')
const QrcodeRoute=require('./qr-imagerouite')

router.use('/upload', imageRoute)
router.use('/qrcode', QrcodeRoute)
router.use('/admin',adminRoutes)
router.use('/department',departmentRoutes)
router.use('/doctor',DoctorRoutes)
router.use('/hospital',HospitalRoutes)
router.use('/user',UserRoutes)
router.use('/slot',SlotRoute)


module.exports=router