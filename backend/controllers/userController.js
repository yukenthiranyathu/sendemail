const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { sendWelcomeEmail } = require('../services/mailService');

const signup = (req, res) => {
  const { email, password } = req.body;
  
  User.findByEmail(email, (err, existingUser) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ error: 'Error hashing password' });

      User.create({ email, password: hashedPassword }, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error creating user' });
        
        sendWelcomeEmail(email);
        res.status(201).json({ message: 'User created' });
      });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(400).json({ error: 'User not found' });

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: 'Error comparing passwords' });
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

      res.status(200).json({ message: 'Login successful' });
    });
  });
};

module.exports = { signup, login };
