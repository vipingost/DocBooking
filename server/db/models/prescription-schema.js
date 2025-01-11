const { Schema, model } = require('mongoose');

const prescriptionSchema = Schema(
  {
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'doctors',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    comment: {
      type: String,
      trim: true,
    },
    // hospital: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'hospitals',
    // },
    appointment: {
      type: Schema.Types.ObjectId,
      ref: 'appointments',
    },
  },
  { timestamps: true }
);

const prescription = model('prescriptions', prescriptionSchema);

module.exports = prescription;
