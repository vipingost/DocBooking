const express = require('express');
const { signup, login,getHospitalLocation ,getHospitalsByLocation,getDoctorByHospital,getUserById,updateuserProfile} = require('../controllers/user-controllers');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/locations', getHospitalLocation);
router.get('/hospitals', getHospitalsByLocation);
router.get('/fetchdoctors', getDoctorByHospital);
router.get('/:id', getUserById);
router.patch('/:id', updateuserProfile);

module.exports = router;
