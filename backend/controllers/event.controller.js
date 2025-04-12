
const Event = require('../models/event.model');
const User = require('../models/user.model');
const Ticket = require('../models/ticket.model');
const { generateTicketNumber, generateQRCode, sendTicketEmail } = require('../utils/ticketUtils');
const Razorpay = require('razorpay');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create a new event (organizers only)
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, category, capacity, ticketPrice, image } = req.body;
    
    const event = new Event({
      title,
      description,
      date,
      time,
      location,
      category,
      capacity,
      ticketPrice,
      image,
      organizer: req.user._id
    });
    
    await event.save();
    
    // Add event to organizer's created events
    await User.findByIdAndUpdate(req.user._id, {
      $push: { createdEvents: event._id }
    });
    
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const { category, status } = req.query;
    const filter = {};
    
    if (category) filter.category = category;
    if (status) filter.status = status;
    
    const events = await Event.find(filter)
      .populate('organizer', 'name email')
      .sort({ date: 1 });
    
    res.json({ events });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name email')
      .populate('attendees.userId', 'name email');
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json({ event });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update event (organizers only)
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if the user is the organizer of the event
    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only update events you created' });
    }
    
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete event (organizers only)
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if the user is the organizer of the event
    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only delete events you created' });
    }
    
    await Event.findByIdAndDelete(req.params.id);
    
    // Remove event from organizer's created events
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { createdEvents: req.params.id }
    });
    
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Register for an event (students only)
exports.registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if event is full
    if (event.attendees.length >= event.capacity) {
      return res.status(400).json({ message: 'Event is full' });
    }
    
    // Check if user is already registered
    if (event.isUserRegistered(req.user._id)) {
      return res.status(400).json({ message: 'You are already registered for this event' });
    }
    
    let paymentId = null;
    
    // Handle payment if event is not free
    if (event.ticketPrice > 0) {
      // Create Razorpay order
      const order = await razorpay.orders.create({
        amount: event.ticketPrice * 100, // Razorpay amount is in paisa
        currency: 'INR',
        receipt: `receipt_${req.user._id}_${event._id}`,
        payment_capture: 1
      });
      
      return res.json({
        message: 'Payment required',
        order,
        event: {
          id: event._id,
          title: event.title,
          price: event.ticketPrice
        }
      });
    }
    
    // Generate ticket for free events
    const ticketNumber = generateTicketNumber();
    const qrCode = await generateQRCode(ticketNumber);
    
    // Create ticket
    const ticket = new Ticket({
      eventId: event._id,
      userId: req.user._id,
      ticketNumber,
      qrCode,
      price: 0,
      status: 'active'
    });
    
    await ticket.save();
    
    // Update event with new attendee
    await Event.findByIdAndUpdate(req.params.id, {
      $push: {
        attendees: {
          userId: req.user._id,
          ticketId: ticket._id
        }
      }
    });
    
    // Update user's registered events
    await User.findByIdAndUpdate(req.user._id, {
      $push: { registeredEvents: event._id }
    });
    
    // Send ticket email
    await sendTicketEmail(req.user.email, ticket, event);
    
    res.json({
      message: 'Successfully registered for event',
      ticket
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Verify payment and complete registration
exports.verifyPayment = async (req, res) => {
  try {
    const { eventId, paymentId, orderId, signature } = req.body;
    
    // Verify payment signature (in a real app)
    // const isValid = validateRazorpaySignature(orderId, paymentId, signature);
    // For mock, we'll assume it's valid
    const isValid = true;
    
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid payment' });
    }
    
    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Generate ticket
    const ticketNumber = generateTicketNumber();
    const qrCode = await generateQRCode(ticketNumber);
    
    // Create ticket
    const ticket = new Ticket({
      eventId: event._id,
      userId: req.user._id,
      paymentId,
      ticketNumber,
      qrCode,
      price: event.ticketPrice,
      status: 'active'
    });
    
    await ticket.save();
    
    // Update event with new attendee
    await Event.findByIdAndUpdate(eventId, {
      $push: {
        attendees: {
          userId: req.user._id,
          paymentId,
          ticketId: ticket._id
        }
      }
    });
    
    // Update user's registered events
    await User.findByIdAndUpdate(req.user._id, {
      $push: { registeredEvents: event._id }
    });
    
    // Send ticket email
    await sendTicketEmail(req.user.email, ticket, event);
    
    res.json({
      message: 'Payment successful and registration completed',
      ticket
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get events created by the current organizer
exports.getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user._id })
      .sort({ date: 1 });
    
    res.json({ events });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get events registered by the current user
exports.getRegisteredEvents = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('registeredEvents');
    
    res.json({ events: user.registeredEvents });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
