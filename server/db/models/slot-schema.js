const { Schema, model } = require('mongoose');


const SlotSchema = Schema({
  doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  slot: [
    {
      date: { type: String, required: true },
      slotDetails: [
        {
          starttime: { type: String, required: true }, 
          endtime: { type: String, required: true }, 
        },
      ],
    },
  ],
  booked: { type: Boolean, default: false }, 
});

const Slot = model('Slot', SlotSchema);
module.exports = Slot
