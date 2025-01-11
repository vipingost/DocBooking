const { Schema, model } = require('mongoose');

const adminSchema = Schema(
  {
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
      default: 'ADMIN',
      immutable: true,
    },
  },
  { timestamps: true }
);

const Admin = model('admins', adminSchema);

module.exports = Admin;
