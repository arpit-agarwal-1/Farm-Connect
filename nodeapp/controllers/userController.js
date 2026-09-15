const { generateToken } = require('../authUtils');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.getUserByEmailAndPassword = async (req, res) => {
  try {
    const { email,password} = req.body || {};
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password is wrong" });
    }
    const token = generateToken(user._id);
    return res.status(200).json({
      username: user.userName,
      role: user.role,
      token,
      id: user._id,
      password: user.password,
      email:user.email
    });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Internal Server Error' });
  }
};

exports.addUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    await User.create({
      ...req.body,
      password: hashedPassword
    });
    return res.status(201).json({ message: 'User Added Successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Internal Server Error' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email, mobile} = req.body || {};
    const user = await User.findOne({ email, mobile });
    if (!user) {
      return res.status(404).json({ message: 'User not found or mobile number does not match' });
    }
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json({ message: err.message || 'Internal Server Error' });
  }
}
