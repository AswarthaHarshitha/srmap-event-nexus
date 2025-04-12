
const QRCode = require('qrcode');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Generate a unique ticket number
exports.generateTicketNumber = () => {
  const prefix = 'EVENT';
  const timestamp = Date.now().toString().slice(-6);
  const random = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

// Generate QR code for a ticket
exports.generateQRCode = async (ticketNumber) => {
  try {
    return await QRCode.toDataURL(ticketNumber);
  } catch (error) {
    console.error('Error generating QR code:', error);
    return null;
  }
};

// Send ticket via email
exports.sendTicketEmail = async (email, ticket, event) => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    
    // Format the event date
    const eventDate = new Date(event.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Your Ticket for ${event.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h1 style="color: #4A148C; text-align: center;">Event Sphere</h1>
          <h2 style="color: #333;">Your ticket has been confirmed!</h2>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #4A148C;">${event.title}</h3>
            <p><strong>Date:</strong> ${eventDate}</p>
            <p><strong>Time:</strong> ${event.time}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Ticket Number:</strong> ${ticket.ticketNumber}</p>
          </div>
          <div style="text-align: center; margin: 20px 0;">
            <img src="${ticket.qrCode}" alt="Ticket QR Code" style="max-width: 200px; height: auto;">
          </div>
          <p style="text-align: center; color: #666; font-size: 14px;">Please present this QR code at the event entrance.</p>
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #888; font-size: 12px;">
            <p>This is an automated email, please do not reply.</p>
            <p>&copy; ${new Date().getFullYear()} Event Sphere. All rights reserved.</p>
          </div>
        </div>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`Ticket email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Error sending ticket email:', error);
    return false;
  }
};
