const { Schema, model } = require('mongoose');

const hospitalSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
      trim: true,
    },
    phonenumber: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: 'http://localhost:8000/images/no-image.jpg',
    },
    department: [{ type: Schema.Types.ObjectId, ref: 'departments' }],
  },
  { timestamps: true }
);

const Hospital = model('hospitals', hospitalSchema);

module.exports = Hospital;
