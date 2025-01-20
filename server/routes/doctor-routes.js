const express = require('express');
const {
  signup,
  login,
  getDoctor,
  AddSlot,
  getDoctorByid,updateDoctor,
  getDoctorAppointments,getPatientDetails,getUserprescription,DoAddPrescription
} = require('../controllers/doctor-controllers');
const { isDocAuth } = require('../middlewares');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/userprescription',getUserprescription);
router.get('/getappointments', getDoctorAppointments);
router.get('/getpatients',getPatientDetails)
router.get('/', getDoctor);
router.get('/:id', getDoctorByid);
router.patch('/:id', updateDoctor);
router.post('/addprescription', DoAddPrescription);
router.post('/add-slot', isDocAuth, AddSlot);

module.exports = router;
