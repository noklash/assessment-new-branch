const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10)
    });
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token, user });
});

module.exports = router;