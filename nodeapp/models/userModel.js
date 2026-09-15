const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      minlength: [3, 'Username must be at least 3 characters long'],
      maxlength: [50, 'Username must be at most 50 characters long'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique:true,
      trim: true,
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email is invalid'],
    },
    mobile: {
      type: String,
      required: [true, 'Mobile is required'],
      unique:true,
      match: [/^\d{10}$/, 'Mobile must be a 10 digit number'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: {
        values: ['owner', 'supplier'],
        message: 'Role must be either "owner" or "supplier"',
      },
    },
  },
  { timestamps: true }
);


module.exports = mongoose.models.User || mongoose.model('User', userSchema);