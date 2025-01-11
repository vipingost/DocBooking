const { Schema, model } = require('mongoose');

const departmentSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    about: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: 'http://localhost:8000/images/no-image.jpg',
    },
  },
  { timestamps: true }
);

const Department = model('departments', departmentSchema);

module.exports = Department;
