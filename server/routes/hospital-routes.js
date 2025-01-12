const express = require('express');
const {
  listHospitals,
  addHospital,
  getHospitalById,
  updateHospital,
  deleteHospital,
} = require('../controllers/hospital-controllers');

const router = express.Router();

router.get('/', listHospitals);
router.post('/', addHospital);
router.get('/:id', getHospitalById);
router.patch('/:id', updateHospital);
router.delete('/:id', deleteHospital);

module.exports = router;
