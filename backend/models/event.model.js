
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comments: {
    type: String,
    maxlength: 500
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['academic', 'cultural', 'sports', 'technical', 'workshop', 'other']
  },
  capacity: {
    type: Number,
    required: true
  },
  ticketPrice: {
    type: Number,
    default: 0
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  attendees: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    paymentId: String,
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket'
    },
    registeredAt: {
      type: Date,
      default: Date.now
    }
  }],
  feedback: [feedbackSchema],
  image: {
    type: String
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  featuredEvent: {
    type: Boolean,
    default: false
  },
  tags: [String],
  registrationDeadline: {
    type: Date
  },
  additionalInfo: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual for checking if event is full
eventSchema.virtual('isFull').get(function() {
  return this.attendees.length >= this.capacity;
});

// Virtual for average rating
eventSchema.virtual('averageRating').get(function() {
  if (!this.feedback || this.feedback.length === 0) return 0;
  
  const sum = this.feedback.reduce((total, item) => total + item.rating, 0);
  return Math.round((sum / this.feedback.length) * 10) / 10; // Round to 1 decimal
});

// Method to check if a user is registered
eventSchema.methods.isUserRegistered = function(userId) {
  return this.attendees.some(attendee => 
    attendee.userId && attendee.userId.toString() === userId.toString()
  );
};

// Add pre-save hook to set registrationDeadline if not specified
eventSchema.pre('save', function(next) {
  if (!this.registrationDeadline) {
    // Default to 1 day before the event
    const deadline = new Date(this.date);
    deadline.setDate(deadline.getDate() - 1);
    this.registrationDeadline = deadline;
  }
  next();
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
