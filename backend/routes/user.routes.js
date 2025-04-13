
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate, isAdmin, isOrganizer } = require('../middleware/auth.middleware');

// Protected routes for all authenticated users
router.get('/tickets', authenticate, userController.getUserTickets);
router.get('/tickets/upcoming', authenticate, userController.getUpcomingTickets);
router.get('/tickets/past', authenticate, userController.getPastTickets);
router.put('/profile', authenticate, userController.updateProfile);
router.put('/change-password', authenticate, userController.changePassword);
router.get('/dashboard', authenticate, userController.getDashboardData);
router.get('/event/:eventId/calendar', authenticate, userController.getEventCalendar);
router.post('/event/:eventId/feedback', authenticate, userController.submitFeedback);

// Admin only routes
router.get('/all', authenticate, isAdmin, userController.getAllUsers);
router.post('/send-reminders', authenticate, isAdmin, userController.sendEventReminders);

module.exports = router;
