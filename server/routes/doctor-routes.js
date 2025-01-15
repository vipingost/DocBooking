const express = require('express');
const {
  signup,
  login,
  getDoctor,
  AddSlot,
} = require('../controllers/doctor-controllers');
const { isDocAuth } = require('../middlewares');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/', getDoctor);
router.post('/add-slot', isDocAuth, AddSlot);

module.exports = router;
