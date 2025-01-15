const mongoose = require('mongoose');

// Define the schema
const SlotSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  slot: [
    {
      date: { type: String, required: true }, // Date string (e.g., "2025-01-21")
      slotDetails: [
        {
          starttime: { type: String, required: true }, // Slot start time (e.g., "06:00")
          endtime: { type: String, required: true }, // Slot end time (e.g., "07:00")
        },
      ],
    },
  ],
  booked: { type: Boolean, default: false }, // Whether the doctor is booked
});

module.exports = mongoose.model('Slot', SlotSchema);
