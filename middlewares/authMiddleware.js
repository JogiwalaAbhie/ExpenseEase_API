const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');
const User = require('../models/User');


const auth = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), secret);
    const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        req.user = user;
        next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
