
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/event.routes');
const userRoutes = require('./routes/user.routes');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Static files (for serving uploads if needed)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Request logging middleware (for development)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/event_sphere', {
  // No need for useNewUrlParser and useUnifiedTopology in newer Mongoose versions
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Event Sphere API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Server error'
  });
});

// Scheduled tasks setup (example)
// This would typically use a proper scheduler like node-cron
// The following is just a demonstration
const setupScheduledTasks = () => {
  // Check for events that need their status updated (e.g., from upcoming to ongoing, or ongoing to completed)
  setInterval(async () => {
    try {
      const Event = mongoose.model('Event');
      const now = new Date();
      
      // Update upcoming events that have passed their date to completed
      await Event.updateMany(
        { date: { $lt: now }, status: 'upcoming' },
        { $set: { status: 'completed' } }
      );
      
      console.log('Scheduled task: Updated event statuses');
    } catch (error) {
      console.error('Error in scheduled task:', error);
    }
  }, 24 * 60 * 60 * 1000); // Run once a day
};

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  setupScheduledTasks();
});

// Handle uncaught exceptions and rejections
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // In a production environment, you might want to implement a more robust error handling
  // strategy, such as restarting the process via PM2 or similar process manager
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
