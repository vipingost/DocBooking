const express = require('express');
const { signup, login,getHospitalLocation ,getHospitalsByLocation,getDoctorByHospital,getUserById,updateuserProfile,doSLotBooking, getbookingreciept} = require('../controllers/user-controllers');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/locations', getHospitalLocation);
router.get('/hospitals', getHospitalsByLocation);
router.get('/fetchdoctors', getDoctorByHospital);
router.get('/userprofile:id', getUserById);
router.patch('/:id', updateuserProfile);
router.post('/bookslot',doSLotBooking) 
router.get('/getbookingreciept',getbookingreciept)

module.exports = router;
