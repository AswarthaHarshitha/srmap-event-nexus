
# Event Sphere Backend

This is the backend server for the Event Sphere application, providing API endpoints for authentication, event management, and ticket generation.

## Setup Instructions

1. **Install Dependencies**

```bash
cd backend
npm install
```

2. **Environment Variables**

Create a `.env` file in the root of the backend directory with the following variables:

```
MONGODB_URI=mongodb://localhost:27017/event_sphere
JWT_SECRET=your_jwt_secret_key_here
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password
PORT=5000
```

3. **Run the Server**

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Documentation

### Authentication Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Requires authentication)

### Event Routes

- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create a new event (Organizers only)
- `PUT /api/events/:id` - Update event (Organizers only)
- `DELETE /api/events/:id` - Delete event (Organizers only)
- `POST /api/events/:id/register` - Register for an event
- `POST /api/events/verify-payment` - Verify payment and complete registration
- `GET /api/events/organizer/my-events` - Get events created by the current organizer
- `GET /api/events/student/registered` - Get events registered by the current user

### User Routes

- `GET /api/users/tickets` - Get user tickets
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/change-password` - Change password

## Dependencies

- Express - Web framework
- Mongoose - MongoDB object modeling
- JWT - Authentication
- bcryptjs - Password hashing
- nodemailer - Email sending
- qrcode - QR code generation
- Razorpay - Payment gateway integration
