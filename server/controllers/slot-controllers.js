const Slot = require('../db/models/slot-schema');

module.exports.getSlot = async (req, res) => {
  try {
    const dbResponse = await Slot.find();
    return res.status(200).json(dbResponse);
  } catch (error) {
    return res.status(500).json({ message: error.message, error: true });
  }
};

module.exports.getSlotById = async (req, res) => {
  try {
    const { id } = req.params;
    const slot = await Slot.findById(id);
    return res.status(200).json(slot);
  } catch (e) {
    res.status(500).json({ message: e.message, error: true });
  }
};

module.exports.getSlotByDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const slot = await Slot.find({doctorId:id});
    return res.status(200).json(slot);
  } catch (e) {
    res.status(500).json({ message: e.message, error: true });
  }
};
