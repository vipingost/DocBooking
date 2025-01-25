const express = require('express');
const { signup, login,getHospitalLocation ,getHospitalsByLocation,getDoctorByHospital,getUserById,updateuserProfile,doSLotBooking, getbookingreciept,Getprescriptionhistory} = require('../controllers/user-controllers');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get(`/getprescriptionhistory/:id`, Getprescriptionhistory);
router.get('/locations', getHospitalLocation);
router.get('/hospitals', getHospitalsByLocation);
router.get('/fetchdoctors', getDoctorByHospital);
router.get('/userprofile/:id', getUserById);
router.patch('/editprofile/:id', updateuserProfile);
router.post('/bookslot',doSLotBooking) 
router.get('/getbookingreciept',getbookingreciept)

module.exports = router;
