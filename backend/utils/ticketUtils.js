
const QRCode = require('qrcode');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Generate a unique ticket number
exports.generateTicketNumber = () => {
  const prefix = 'SRMEVENT';
  const timestamp = Date.now().toString().slice(-6);
  const random = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

// Generate QR code for a ticket
exports.generateQRCode = async (ticketNumber) => {
  try {
    return await QRCode.toDataURL(ticketNumber, {
      errorCorrectionLevel: 'H',
      margin: 1,
      color: {
        dark: '#4A148C',  // SRM color
        light: '#FFFFFF'
      }
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    return null;
  }
};

// Format date for emails
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
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
    const eventDate = formatDate(event.date);
    
    // Email content
    const mailOptions = {
      from: `"SRM Event Sphere" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Your Ticket for ${event.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://tse2.mm.bing.net/th?id=OIP.xRiZIS_0QzBn0UdNitYlfgAAAA&pid=Api&P=0&h=180" alt="SRM Logo" style="height: 60px;">
            <h1 style="color: #4A148C; margin-top: 10px;">Event Sphere</h1>
          </div>
          
          <div style="background-color: #f8f4fc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #4A148C; margin-top: 0;">Your ticket is confirmed!</h2>
            <p style="color: #555;">Thank you for registering. We look forward to seeing you at the event!</p>
            
            <div style="background-color: white; padding: 15px; border-radius: 8px; border-left: 4px solid #4A148C; margin: 20px 0;">
              <h3 style="color: #4A148C; margin-top: 0;">${event.title}</h3>
              <p style="margin-bottom: 5px;"><strong>Date:</strong> ${eventDate}</p>
              <p style="margin-bottom: 5px;"><strong>Time:</strong> ${event.time}</p>
              <p style="margin-bottom: 5px;"><strong>Location:</strong> ${event.location}</p>
              <p style="margin-bottom: 5px;"><strong>Category:</strong> ${event.category}</p>
              <p style="margin-bottom: 0;"><strong>Ticket Number:</strong> ${ticket.ticketNumber}</p>
            </div>
          </div>
          
          <div style="text-align: center; margin: 20px 0;">
            <p style="color: #555; margin-bottom: 10px;">Please present this QR code at the event entrance:</p>
            <img src="${ticket.qrCode}" alt="Ticket QR Code" style="max-width: 200px; border: 1px solid #ddd; padding: 10px; border-radius: 8px;">
          </div>
          
          <div style="background-color: #f8f4fc; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <h3 style="color: #4A148C; margin-top: 0;">Important Information:</h3>
            <ul style="color: #555; padding-left: 20px;">
              <li>Please arrive 15 minutes before the event starts</li>
              <li>Keep your ticket handy, either on your phone or as a printout</li>
              <li>For any queries, contact event organizers at organizers@srm.edu</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #888; font-size: 12px;">
            <p>This is an automated email, please do not reply.</p>
            <p>© ${new Date().getFullYear()} SRM Event Sphere. All rights reserved.</p>
            <div style="margin-top: 10px;">
              <a href="https://www.srmist.edu.in" style="color: #4A148C; text-decoration: none; margin: 0 10px;">Website</a> | 
              <a href="https://www.instagram.com/srmistedu" style="color: #4A148C; text-decoration: none; margin: 0 10px;">Instagram</a> | 
              <a href="https://www.facebook.com/SRMUniversityOfficial" style="color: #4A148C; text-decoration: none; margin: 0 10px;">Facebook</a>
            </div>
          </div>
        </div>
      `
    };
    
    // Add calendar invite (iCal format)
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
    
    mailOptions.attachments = [
      {
        filename: 'event-invite.ics',
        content: icalData,
        contentType: 'text/calendar'
      }
    ];
    
    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`Ticket email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Error sending ticket email:', error);
    return false;
  }
};

// Send event reminder email
exports.sendReminderEmail = async (email, event, ticketNumber) => {
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
    const eventDate = formatDate(event.date);
    
    // Email content
    const mailOptions = {
      from: `"SRM Event Sphere" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Reminder: ${event.title} is Tomorrow!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://tse2.mm.bing.net/th?id=OIP.xRiZIS_0QzBn0UdNitYlfgAAAA&pid=Api&P=0&h=180" alt="SRM Logo" style="height: 60px;">
            <h1 style="color: #4A148C; margin-top: 10px;">Event Reminder</h1>
          </div>
          
          <div style="background-color: #f8f4fc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #4A148C; margin-top: 0;">Your event is tomorrow!</h2>
            <p style="color: #555;">This is a friendly reminder that you are registered for an event happening tomorrow.</p>
            
            <div style="background-color: white; padding: 15px; border-radius: 8px; border-left: 4px solid #4A148C; margin: 20px 0;">
              <h3 style="color: #4A148C; margin-top: 0;">${event.title}</h3>
              <p style="margin-bottom: 5px;"><strong>Date:</strong> ${eventDate}</p>
              <p style="margin-bottom: 5px;"><strong>Time:</strong> ${event.time}</p>
              <p style="margin-bottom: 5px;"><strong>Location:</strong> ${event.location}</p>
              <p style="margin-bottom: 0;"><strong>Ticket Number:</strong> ${ticketNumber}</p>
            </div>
          </div>
          
          <div style="background-color: #f8f4fc; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <h3 style="color: #4A148C; margin-top: 0;">Reminder:</h3>
            <ul style="color: #555; padding-left: 20px;">
              <li>Please arrive 15 minutes before the event starts</li>
              <li>Don't forget to bring your ticket or QR code</li>
              <li>For any last-minute queries, contact event organizers at organizers@srm.edu</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #888; font-size: 12px;">
            <p>This is an automated email, please do not reply.</p>
            <p>© ${new Date().getFullYear()} SRM Event Sphere. All rights reserved.</p>
          </div>
        </div>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`Reminder email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Error sending reminder email:', error);
    return false;
  }
};
