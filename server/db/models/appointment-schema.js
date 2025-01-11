const { Schema, model } = require('mongoose');

const appointmentSchema = Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    slot: {
      type: Schema.Types.ObjectId,
      ref: 'slots',
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'doctors',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    // department: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'departments',
    // },
    // hospital: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'hospitals',
    // },
  },
  { timestamps: true }
);

const Appointment = model('appointments', appointmentSchema);

module.exports = Appointment;
