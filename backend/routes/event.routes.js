
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');
const { authenticate, isOrganizer, isStudent } = require('../middleware/auth.middleware');

// Public routes
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);

// Organizer routes
router.post('/', authenticate, isOrganizer, eventController.createEvent);
router.put('/:id', authenticate, isOrganizer, eventController.updateEvent);
router.delete('/:id', authenticate, isOrganizer, eventController.deleteEvent);
router.get('/organizer/my-events', authenticate, isOrganizer, eventController.getMyEvents);

// Student routes
router.post('/:id/register', authenticate, eventController.registerForEvent);
router.post('/verify-payment', authenticate, eventController.verifyPayment);
router.get('/student/registered', authenticate, eventController.getRegisteredEvents);

module.exports = router;
