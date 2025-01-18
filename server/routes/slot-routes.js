const express = require('express');
const { getSlot, getSlotById,getSlotByDoctor } = require('../controllers/slot-controllers');

const router = express.Router();

router.get('/', getSlot);
router.get('/:id', getSlotById);
router.get('/doctor/:id', getSlotByDoctor);

module.exports = router;
