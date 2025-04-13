
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Middleware to verify JWT token
exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware to check if user is an organizer
exports.isOrganizer = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  if (req.user.role === 'organizer' || req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ 
      message: 'Access denied. Only organizers can perform this action.',
      requiredRole: 'organizer',
      currentRole: req.user.role
    });
  }
};

// Middleware to check if user is a student
exports.isStudent = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  if (req.user.role === 'student' || req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ 
      message: 'Access denied. Only students can perform this action.',
      requiredRole: 'student',
      currentRole: req.user.role
    });
  }
};

// Middleware to check if user is an admin
exports.isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  if (req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ 
      message: 'Access denied. Admin privileges required.',
      requiredRole: 'admin',
      currentRole: req.user.role
    });
  }
};

// Middleware to check if user is the event organizer or an admin
exports.isEventOrganizer = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    // If user is admin, allow access
    if (req.user.role === 'admin') {
      return next();
    }
    
    const Event = require('../models/event.model');
    const eventId = req.params.id || req.body.eventId;
    
    if (!eventId) {
      return res.status(400).json({ message: 'Event ID is required' });
    }
    
    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if user is the organizer of this event
    if (event.organizer.toString() === req.user._id.toString()) {
      return next();
    }
    
    res.status(403).json({ 
      message: 'Access denied. You can only manage events you created.',
      isOrganizer: false
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
