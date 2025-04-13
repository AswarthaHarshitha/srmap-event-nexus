
const User = require('../models/user.model');
const Ticket = require('../models/ticket.model');
const Event = require('../models/event.model');
const { sendReminderEmail } = require('../utils/ticketUtils');

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    
    const users = await User.find().select('-password');
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user tickets
exports.getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user._id })
      .populate({
        path: 'eventId',
        select: 'title description date time location category organizer image status',
        populate: {
          path: 'organizer',
          select: 'name email'
        }
      })
      .sort({ purchasedAt: -1 });
      
    res.json({ tickets });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get upcoming tickets
exports.getUpcomingTickets = async (req, res) => {
  try {
    const currentDate = new Date();
    
    // Find tickets for events that haven't happened yet
    const tickets = await Ticket.find({ 
      userId: req.user._id,
      status: 'active'
    }).populate({
      path: 'eventId',
      match: { 
        date: { $gte: currentDate },
        status: { $nin: ['cancelled', 'completed'] }
      },
      select: 'title date time location category image status'
    }).sort({ 'eventId.date': 1 });
    
    // Filter out tickets whose events didn't match the criteria (will be null)
    const validTickets = tickets.filter(ticket => ticket.eventId !== null);
    
    res.json({ tickets: validTickets });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get past tickets
exports.getPastTickets = async (req, res) => {
  try {
    const currentDate = new Date();
    
    // Find tickets for events that have already happened
    const tickets = await Ticket.find({ 
      userId: req.user._id
    }).populate({
      path: 'eventId',
      match: { 
        $or: [
          { date: { $lt: currentDate } },
          { status: 'completed' }
        ]
      },
      select: 'title date time location category image status'
    }).sort({ 'eventId.date': -1 });
    
    // Filter out tickets whose events didn't match the criteria (will be null)
    const validTickets = tickets.filter(ticket => ticket.eventId !== null);
    
    res.json({ tickets: validTickets });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, profilePicture, interests, department, yearOfStudy, contactNumber } = req.body;
    
    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (profilePicture) updatedFields.profilePicture = profilePicture;
    if (interests) updatedFields.interests = interests;
    if (department) updatedFields.department = department;
    if (yearOfStudy) updatedFields.yearOfStudy = yearOfStudy;
    if (contactNumber) updatedFields.contactNumber = contactNumber;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      updatedFields,
      { new: true, runValidators: true }
    ).select('-password');
    
    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findById(req.user._id);
    
    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }
    
    // Update password
    user.password = newPassword;
    await user.save();
    
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user dashboard data
exports.getDashboardData = async (req, res) => {
  try {
    // Get user with their registered events
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate({
        path: 'registeredEvents',
        select: 'title date time location category image status',
        options: { sort: { date: 1 } }
      });
    
    // Get user's upcoming tickets
    const upcomingTickets = await Ticket.find({ 
      userId: req.user._id,
      status: 'active'
    }).populate({
      path: 'eventId',
      match: { 
        date: { $gte: new Date() },
        status: { $nin: ['cancelled', 'completed'] }
      },
      select: 'title date time location category image status'
    }).sort({ 'eventId.date': 1 })
    .limit(5);
    
    // Filter out tickets whose events didn't match the criteria
    const validUpcomingTickets = upcomingTickets.filter(ticket => ticket.eventId !== null);
    
    // For organizers, get their created events
    let createdEvents = [];
    if (req.user.role === 'organizer' || req.user.role === 'admin') {
      createdEvents = await Event.find({ organizer: req.user._id })
        .select('title date time location category image status attendees')
        .sort({ date: 1 });
    }
    
    // Get recommended events based on user interests
    let recommendedEvents = [];
    if (user.interests && user.interests.length > 0) {
      // Find events that match user interests, exclude already registered events
      const registeredEventIds = user.registeredEvents.map(event => event._id);
      
      recommendedEvents = await Event.find({
        category: { $in: user.interests },
        _id: { $nin: registeredEventIds },
        date: { $gte: new Date() },
        status: 'upcoming'
      })
      .select('title date time location category image')
      .sort({ date: 1 })
      .limit(3);
    }
    
    // Calculate statistics
    const stats = {
      registered: user.registeredEvents.length,
      upcoming: validUpcomingTickets.length,
      created: createdEvents.length
    };
    
    res.json({
      user,
      stats,
      upcomingTickets: validUpcomingTickets,
      createdEvents,
      recommendedEvents
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Send reminders for upcoming events
exports.sendEventReminders = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
    
    // Find events happening tomorrow
    const upcomingEvents = await Event.find({
      date: {
        $gte: tomorrow,
        $lt: dayAfterTomorrow
      },
      status: 'upcoming'
    });
    
    let remindersSent = 0;
    
    // For each event, find tickets and send reminders
    for (const event of upcomingEvents) {
      const tickets = await Ticket.find({
        eventId: event._id,
        status: 'active'
      }).populate('userId', 'email');
      
      for (const ticket of tickets) {
        if (ticket.userId && ticket.userId.email) {
          await sendReminderEmail(ticket.userId.email, event, ticket.ticketNumber);
          remindersSent++;
        }
      }
    }
    
    res.json({ 
      message: `Successfully sent ${remindersSent} reminders for events happening tomorrow`,
      count: remindersSent
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add event to user's calendar (generate iCal file)
exports.getEventCalendar = async (req, res) => {
  try {
    const { eventId } = req.params;
    
    // Check if user is registered for this event
    const ticket = await Ticket.findOne({ 
      userId: req.user._id,
      eventId,
      status: 'active'
    });
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found or not active' });
    }
    
    // Get event details
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Create iCal data
    const startDate = new Date(event.date);
    const [hours, minutes] = event.time.split(':');
    startDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 2); // Assuming 2-hour event
    
    const icalData = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
DTSTART:${startDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}
DTEND:${endDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}
LOCATION:${event.location}
DESCRIPTION:${event.description}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR
    `.trim();
    
    // Set headers for file download
    res.setHeader('Content-Type', 'text/calendar');
    res.setHeader('Content-Disposition', `attachment; filename="${event.title.replace(/\s+/g, '_')}.ics"`);
    
    res.send(icalData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Submit feedback for an event
exports.submitFeedback = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { rating, comments } = req.body;
    
    // Check if user attended this event
    const ticket = await Ticket.findOne({ 
      userId: req.user._id,
      eventId
    });
    
    if (!ticket) {
      return res.status(404).json({ message: 'You must have a ticket to provide feedback' });
    }
    
    // Get event to check if it's past
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    const currentDate = new Date();
    if (new Date(event.date) > currentDate && event.status !== 'completed') {
      return res.status(400).json({ message: 'You can only provide feedback for past events' });
    }
    
    // Add feedback to event
    await Event.findByIdAndUpdate(eventId, {
      $push: {
        feedback: {
          userId: req.user._id,
          rating,
          comments,
          submittedAt: new Date()
        }
      }
    });
    
    res.json({ message: 'Feedback submitted successfully. Thank you!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
