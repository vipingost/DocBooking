const { Schema, model } = require('mongoose');

const appointmentSchema = Schema(
  {
    date: {
      type: String,
      required: true,
    },
    startTime:{
      type:String,
      required:true,
    },
    bookedSlotTime:{
      type:String,
      required:true,
    },
    endTime:{
      type:String,
      required:true,
    },
  /*  slot: {
      type: Schema.Types.ObjectId,
      ref: 'Slot',
    },*/
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'doctors',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  //   department: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'departments',
  //   },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: 'hospitals',
    },
  },
  { timestamps: true }
);

const Appointment = model('appointments', appointmentSchema);

module.exports = Appointment;
