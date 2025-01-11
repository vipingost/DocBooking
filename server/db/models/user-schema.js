const { Schema, model } = require('mongoose');

const userSchema = Schema(
  {
    firstname: {
      type: String,

      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
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
      default: 'USER',
      immutable: true,
    },
    image: {
      type: String,
      default: 'http://localhost:8000/image/user.png',
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
    },
    height: {
      type: String,
    },
    bloodgroup: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const User = model('users', userSchema);

module.exports = User;
