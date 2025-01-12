const express = require('express');
const { signup, login ,getDoctor} = require('../controllers/doctor-controllers');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/', getDoctor);

module.exports = router;
