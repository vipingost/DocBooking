const { Schema, model } = require('mongoose');

const doctorSchema = Schema(
  {
    firstname: {
      type: String,

      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      // required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'DOCTOR',
      immutable: true,
    },
    image: {
      type: String,
      default: 'http://localhost:8000/images/doc-image.jpg',
    },
    about: {
      type: String,
      // required: true,
      trim: true,
    },
    specialization: {
      type: String,
      // required: true,
      trim: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'departments',
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: 'hospitals',
    },
  },

  { timestamps: true }
);

const Doctor = model('doctors', doctorSchema);

module.exports = Doctor;
