const express = require('express');
const {
  signup,
  login,
  getDoctor,
  AddSlot,
  getDoctorByid,updateDoctor,
} = require('../controllers/doctor-controllers');
const { isDocAuth } = require('../middlewares');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/', getDoctor);
router.get('/:id', getDoctorByid);
router.patch('/:id', updateDoctor);
router.post('/add-slot', isDocAuth, AddSlot);

module.exports = router;
