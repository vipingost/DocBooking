const { Schema, model } = require('mongoose');

const SlotSchema = Schema({
  doctorId: { type: Schema.Types.ObjectId, ref: 'doctors', required: true },
  slot: [
    {
      date: { type: String, required: true },
      slotDetails: [
        {
          starttime: { type: String, required: true },
          endtime: { type: String, required: true },
          patients: [
            {
              userId: { type: Schema.Types.ObjectId, ref: 'users' },
              already: { type: Boolean, default: false },
            },
          ],
          isFull: { type: Boolean, default: false },
        },
      ],
    },
  ],
  booked: { type: Boolean, default: false },
});

const Slot = model('Slot', SlotSchema);
module.exports = Slot;
