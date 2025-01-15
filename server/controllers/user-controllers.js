const User = require('../db/models/user-schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .json({ error: true, message: 'Account already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 2);
    const dbresponse = await User.create({
     ...req.body,
      email: email,
      password: hashedPassword,
    });
    return res.status(201).json({ message: 'You are signed up' });
  } catch (e) {
    res.status(500).json({ message: e.message, error: true });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ message: 'Email or Password incorrect', error: true });
    }
    const isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching) {
      return res.status(400).json({ message: 'Email or Password incorrect' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '2D',
      }
    );
    res.status(200).json({
      message: 'You are logged in',
      token: token,
      id: user._id,
      role: 'user',
      name:user.name
    });
  } catch (e) {
    res.status(500).json({ message: e.message, error: true });
  }
};
