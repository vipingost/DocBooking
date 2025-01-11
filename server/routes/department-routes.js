const express = require('express');
const { checkToken } = require('../middlewares');
const {
  getDepartment,
  postDepartment,
  getDepartmentById,
  deleteDepartment,
  updateDepartment,
} = require('../controllers/department-controllers');

const router = express.Router();
// router.get('/', checkToken(['ADMIN', 'USER', 'DOCTOR']), getDepartment);
router.get('/', checkToken(['ADMIN', 'USER', 'DOCTOR']), getDepartment);
router.post('/', postDepartment);
router.get('/:id', getDepartmentById);
router.delete('/:id', deleteDepartment);
router.patch('/:id', updateDepartment);

module.exports = router;
