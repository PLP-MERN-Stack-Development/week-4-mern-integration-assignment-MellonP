import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// Protect routes - user must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Get token from cookies
  token = req.cookies.jwt;

  if (!token) {
    // Alternatively check Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    req.user = await User.findById(decoded.id).select('-password');

    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
});

// Admin middleware - must be admin
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as admin');
  }
};

export { protect, admin };