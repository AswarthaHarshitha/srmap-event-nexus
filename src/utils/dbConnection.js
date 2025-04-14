
// This file simulates MongoDB connection in the client
// In a real application, this would be handled by the backend

const mockMongoDBConnection = {
  isConnected: true,
  connectionString: 'mongodb://localhost:27017/event_sphere',
  
  // Simulated connection test function
  testConnection: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Testing connection to MongoDB: mongodb://localhost:27017/event_sphere");
        resolve({
          success: true,
          message: 'Successfully connected to MongoDB',
          stats: {
            databaseName: 'event_sphere',
            collections: [
              { name: 'users', documentCount: 156, sizeInMB: 2.4 },
              { name: 'events', documentCount: 87, sizeInMB: 8.7 },
              { name: 'tickets', documentCount: 435, sizeInMB: 3.2 },
              { name: 'attendance', documentCount: 382, sizeInMB: 1.5 }
            ],
            totalSizeInMB: 15.8,
            lastBackup: '2023-09-19T02:00:00'
          }
        });
      }, 800);
    });
  },
  
  // CRUD operations with real localStorage persistence
  // These simulate a real MongoDB but store data in the browser
  
  // User operations
  findUsers: (query = {}) => {
    console.log("MongoDB Query: Finding users with query:", query);
    const users = JSON.parse(localStorage.getItem('mongodb_users') || '[]');
    
    // Filter users based on query
    let filteredUsers = [...users];
    
    if (query.role) {
      filteredUsers = filteredUsers.filter(user => user.role === query.role);
    }
    
    if (query.email) {
      filteredUsers = filteredUsers.filter(user => user.email === query.email);
    }
    
    if (query.id || query._id) {
      const searchId = query.id || query._id;
      filteredUsers = filteredUsers.filter(user => user.id === searchId);
    }
    
    console.log(`MongoDB: Found ${filteredUsers.length} users matching query`);
    return Promise.resolve(filteredUsers);
  },
  
  findUserById: (userId) => {
    console.log(`MongoDB Query: Finding user with ID: ${userId}`);
    const users = JSON.parse(localStorage.getItem('mongodb_users') || '[]');
    const user = users.find(u => u.id === userId);
    return Promise.resolve(user || null);
  },
  
  findUserByEmail: (email) => {
    console.log(`MongoDB Query: Finding user with email: ${email}`);
    const users = JSON.parse(localStorage.getItem('mongodb_users') || '[]');
    const user = users.find(u => u.email === email);
    return Promise.resolve(user || null);
  },
  
  createUser: (userData) => {
    console.log('MongoDB: Creating new user:', userData);
    
    // Store in local storage to simulate persistence
    const users = JSON.parse(localStorage.getItem('mongodb_users') || '[]');
    const newUser = {
      ...userData,
      id: `usr${Math.floor(Math.random() * 10000)}`,
      status: 'active',
      joined: new Date().toISOString().split('T')[0]
    };
    
    users.push(newUser);
    localStorage.setItem('mongodb_users', JSON.stringify(users));
    
    console.log('MongoDB: User created successfully:', newUser);
    return Promise.resolve(newUser);
  },
  
  updateUser: (userId, userData) => {
    console.log('MongoDB: Updating user:', userId, userData);
    
    const users = JSON.parse(localStorage.getItem('mongodb_users') || '[]');
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...userData };
      localStorage.setItem('mongodb_users', JSON.stringify(users));
      console.log('MongoDB: User updated successfully:', users[userIndex]);
      return Promise.resolve(users[userIndex]);
    }
    
    console.error('MongoDB: User not found for update:', userId);
    return Promise.reject(new Error('User not found'));
  },
  
  deleteUser: (userId) => {
    console.log('MongoDB: Deleting user:', userId);
    
    const users = JSON.parse(localStorage.getItem('mongodb_users') || '[]');
    const filteredUsers = users.filter(user => user.id !== userId);
    
    localStorage.setItem('mongodb_users', JSON.stringify(filteredUsers));
    console.log('MongoDB: User deleted successfully');
    return Promise.resolve({ success: true });
  },
  
  // Event operations
  findEvents: (query = {}) => {
    console.log("MongoDB Query: Finding events with query:", query);
    const events = JSON.parse(localStorage.getItem('mongodb_events') || '[]');
    
    // Filter events based on query
    let filteredEvents = [...events];
    
    if (query.status) {
      filteredEvents = filteredEvents.filter(event => event.status === query.status);
    }
    
    if (query.category) {
      filteredEvents = filteredEvents.filter(event => event.category === query.category);
    }
    
    if (query.organizerId) {
      filteredEvents = filteredEvents.filter(event => event.organizerId === query.organizerId);
    }
    
    if (query.id || query._id) {
      const searchId = query.id || query._id;
      filteredEvents = filteredEvents.filter(event => event.id === searchId);
    }
    
    // Sort events by date (newest first)
    filteredEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    console.log(`MongoDB: Found ${filteredEvents.length} events matching query`);
    return Promise.resolve(filteredEvents);
  },
  
  findEventById: (eventId) => {
    console.log(`MongoDB Query: Finding event with ID: ${eventId}`);
    const events = JSON.parse(localStorage.getItem('mongodb_events') || '[]');
    const event = events.find(e => e.id === eventId);
    return Promise.resolve(event || null);
  },
  
  createEvent: (eventData) => {
    console.log('MongoDB: Creating new event:', eventData);
    
    // Store in local storage to simulate persistence
    const events = JSON.parse(localStorage.getItem('mongodb_events') || '[]');
    const newEvent = {
      ...eventData,
      id: `evt${Math.floor(Math.random() * 10000)}`,
      status: eventData.status || 'pending',
      registrations: 0,
      createdAt: new Date().toISOString()
    };
    
    events.push(newEvent);
    localStorage.setItem('mongodb_events', JSON.stringify(events));
    
    console.log('MongoDB: Event created successfully:', newEvent);
    return Promise.resolve(newEvent);
  },
  
  updateEvent: (eventId, eventData) => {
    console.log('MongoDB: Updating event:', eventId, eventData);
    
    // Update in local storage
    const events = JSON.parse(localStorage.getItem('mongodb_events') || '[]');
    const eventIndex = events.findIndex(event => event.id === eventId);
    
    if (eventIndex !== -1) {
      events[eventIndex] = { ...events[eventIndex], ...eventData };
      localStorage.setItem('mongodb_events', JSON.stringify(events));
      console.log('MongoDB: Event updated successfully:', events[eventIndex]);
      return Promise.resolve(events[eventIndex]);
    }
    
    console.error('MongoDB: Event not found for update:', eventId);
    return Promise.reject(new Error('Event not found'));
  },
  
  deleteEvent: (eventId) => {
    console.log('MongoDB: Deleting event:', eventId);
    
    // Remove from local storage
    const events = JSON.parse(localStorage.getItem('mongodb_events') || '[]');
    const filteredEvents = events.filter(event => event.id !== eventId);
    
    localStorage.setItem('mongodb_events', JSON.stringify(filteredEvents));
    console.log('MongoDB: Event deleted successfully');
    return Promise.resolve({ success: true });
  },
  
  // Get events for a specific user (organizer)
  getOrganizerEvents: (organizerId) => {
    console.log('MongoDB: Finding events for organizer:', organizerId);
    return mockMongoDBConnection.findEvents({ organizerId });
  },
  
  // Registration and ticket operations
  registerForEvent: (eventId, userId) => {
    console.log('MongoDB: Registering user for event:', userId, eventId);
    
    // Update events in local storage
    const events = JSON.parse(localStorage.getItem('mongodb_events') || '[]');
    const eventIndex = events.findIndex(event => event.id === eventId);
    
    if (eventIndex !== -1) {
      events[eventIndex].registrations += 1;
      localStorage.setItem('mongodb_events', JSON.stringify(events));
      
      // Create a ticket
      const tickets = JSON.parse(localStorage.getItem('mongodb_tickets') || '[]');
      const newTicket = {
        id: `tkt${Math.floor(Math.random() * 10000)}`,
        eventId,
        userId,
        createdAt: new Date().toISOString(),
        qrCode: `QR_${eventId}_${userId}_${Date.now()}`,
        status: 'active'
      };
      
      tickets.push(newTicket);
      localStorage.setItem('mongodb_tickets', JSON.stringify(tickets));
      
      console.log('MongoDB: Registration successful, ticket created:', newTicket);
      return Promise.resolve(newTicket);
    }
    
    console.error('MongoDB: Event not found for registration:', eventId);
    return Promise.reject(new Error('Event not found'));
  },
  
  getUserTickets: (userId) => {
    console.log('MongoDB: Getting tickets for user:', userId);
    const tickets = JSON.parse(localStorage.getItem('mongodb_tickets') || '[]');
    const userTickets = tickets.filter(ticket => ticket.userId === userId);
    
    // Get event details for each ticket
    const events = JSON.parse(localStorage.getItem('mongodb_events') || '[]');
    
    const ticketsWithEventDetails = userTickets.map(ticket => {
      const event = events.find(e => e.id === ticket.eventId) || {};
      return {
        ...ticket,
        event
      };
    });
    
    console.log(`MongoDB: Found ${ticketsWithEventDetails.length} tickets for user ${userId}`);
    return Promise.resolve(ticketsWithEventDetails);
  },
  
  // Analytics operations
  getEventAnalytics: (eventId) => {
    console.log('MongoDB: Getting analytics for event:', eventId);
    
    const tickets = JSON.parse(localStorage.getItem('mongodb_tickets') || '[]');
    const eventTickets = tickets.filter(ticket => ticket.eventId === eventId);
    
    // Generate mock analytics
    const totalRegistrations = eventTickets.length;
    const registrationsByDay = {};
    
    eventTickets.forEach(ticket => {
      const day = ticket.createdAt.split('T')[0];
      registrationsByDay[day] = (registrationsByDay[day] || 0) + 1;
    });
    
    const analytics = {
      totalRegistrations,
      registrationsByDay: Object.entries(registrationsByDay).map(([date, count]) => ({ date, count })),
      demographics: {
        male: Math.floor(totalRegistrations * 0.6),
        female: Math.floor(totalRegistrations * 0.4),
        departments: {
          'Computer Science': Math.floor(totalRegistrations * 0.4),
          'Mechanical Engineering': Math.floor(totalRegistrations * 0.2),
          'Electrical Engineering': Math.floor(totalRegistrations * 0.15),
          'Civil Engineering': Math.floor(totalRegistrations * 0.1),
          'Others': Math.floor(totalRegistrations * 0.15)
        }
      }
    };
    
    console.log('MongoDB: Event analytics generated:', analytics);
    return Promise.resolve(analytics);
  },
  
  // System operations (for admin)
  getSystemStats: () => {
    console.log('MongoDB: Getting system stats');
    
    const users = JSON.parse(localStorage.getItem('mongodb_users') || '[]');
    const events = JSON.parse(localStorage.getItem('mongodb_events') || '[]');
    const tickets = JSON.parse(localStorage.getItem('mongodb_tickets') || '[]');
    
    const stats = {
      totalUsers: users.length,
      totalEvents: events.length,
      totalRegistrations: tickets.length,
      recentUsers: users.slice(-5).reverse(),
      recentEvents: events.slice(-5).reverse(),
      usersByRole: {
        student: users.filter(user => user.role === 'student').length,
        organizer: users.filter(user => user.role === 'organizer').length,
        admin: users.filter(user => user.role === 'admin').length
      },
      eventsByStatus: {
        pending: events.filter(event => event.status === 'pending').length,
        approved: events.filter(event => event.status === 'approved').length,
        rejected: events.filter(event => event.status === 'rejected').length,
        completed: events.filter(event => event.status === 'completed').length
      }
    };
    
    console.log('MongoDB: System stats generated:', stats);
    return Promise.resolve(stats);
  },
  
  // Initialize with sample data if storage is empty
  initializeWithSampleData: () => {
    console.log('MongoDB: Checking if initialization is needed');
    
    // Check if we already have data
    const users = JSON.parse(localStorage.getItem('mongodb_users') || '[]');
    const events = JSON.parse(localStorage.getItem('mongodb_events') || '[]');
    
    if (users.length === 0) {
      console.log('MongoDB: Initializing users collection with sample data');
      
      // Sample users
      const sampleUsers = [
        {
          id: 'usr1',
          name: 'Admin User',
          email: 'admin@srm.edu.in',
          role: 'admin',
          department: '',
          status: 'active',
          joined: '2023-01-15',
          profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin@srm.edu.in&backgroundColor=b6e3f4,c0aede,d1d4f9'
        },
        {
          id: 'usr2',
          name: 'Event Organizer',
          email: 'organizer@srm.edu.in',
          role: 'organizer',
          department: 'Student Affairs',
          status: 'active',
          joined: '2023-02-10',
          profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=organizer@srm.edu.in&backgroundColor=b6e3f4,c0aede,d1d4f9'
        },
        {
          id: 'usr3',
          name: 'Student One',
          email: 'student1@srm.edu.in',
          role: 'student',
          department: 'Computer Science',
          yearOfStudy: 2,
          status: 'active',
          joined: '2023-03-05',
          profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student1@srm.edu.in&backgroundColor=b6e3f4,c0aede,d1d4f9'
        },
        {
          id: 'usr4',
          name: 'Student Two',
          email: 'student2@srm.edu.in',
          role: 'student',
          department: 'Mechanical Engineering',
          yearOfStudy: 3,
          status: 'active',
          joined: '2023-03-08',
          profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student2@srm.edu.in&backgroundColor=b6e3f4,c0aede,d1d4f9'
        }
      ];
      
      localStorage.setItem('mongodb_users', JSON.stringify(sampleUsers));
    }
    
    if (events.length === 0) {
      console.log('MongoDB: Initializing events collection with sample data');
      
      // Sample events
      const sampleEvents = [
        {
          id: 'evt1',
          title: 'Web Development Workshop',
          description: 'Learn the basics of web development with HTML, CSS, and JavaScript. This workshop is perfect for beginners looking to start their journey in web development.',
          date: '2023-10-15',
          time: '10:00 AM - 12:00 PM',
          location: 'Main Auditorium, Block 1',
          category: 'Tech',
          status: 'approved',
          registrations: 87,
          capacity: 100,
          organizerId: 'usr2',
          image: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
          createdAt: '2023-09-15T10:30:00Z'
        },
        {
          id: 'evt2',
          title: 'Entrepreneurship Summit',
          description: 'Connect with successful entrepreneurs and learn from their experiences. This summit will feature talks from industry leaders and networking opportunities.',
          date: '2023-11-05',
          time: '09:00 AM - 05:00 PM',
          location: 'Convention Center',
          category: 'Business',
          status: 'pending',
          registrations: 0,
          capacity: 150,
          organizerId: 'usr2',
          image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
          createdAt: '2023-09-20T15:45:00Z'
        },
        {
          id: 'evt3',
          title: 'Cultural Fest 2023',
          description: 'Annual cultural festival featuring music, dance, and art performances. Join us for a celebration of diversity and talent.',
          date: '2023-12-10',
          time: '06:00 PM - 10:00 PM',
          location: 'University Ground',
          category: 'Cultural',
          status: 'approved',
          registrations: 254,
          capacity: 1000,
          organizerId: 'usr2',
          image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          createdAt: '2023-09-18T12:20:00Z'
        },
        {
          id: 'evt4',
          title: 'Hackathon 2023',
          description: 'A 24-hour coding marathon where students can showcase their technical skills and creativity. Form teams and compete for exciting prizes.',
          date: '2023-10-25',
          time: '09:00 AM - 09:00 AM (Next day)',
          location: 'Tech Building, 3rd Floor',
          category: 'Tech',
          status: 'approved',
          registrations: 42,
          capacity: 50,
          organizerId: 'usr2',
          image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          createdAt: '2023-09-25T09:15:00Z'
        },
        {
          id: 'evt5',
          title: 'Career Fair 2023',
          description: 'Connect with potential employers from various industries. Bring your resume and dress professionally for on-the-spot interviews.',
          date: '2023-11-15',
          time: '10:00 AM - 04:00 PM',
          location: 'Multi-Purpose Hall',
          category: 'Career',
          status: 'approved',
          registrations: 156,
          capacity: 300,
          organizerId: 'usr2',
          image: 'https://images.unsplash.com/photo-1560523159-4a9692d222f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          createdAt: '2023-09-22T14:30:00Z'
        }
      ];
      
      localStorage.setItem('mongodb_events', JSON.stringify(sampleEvents));
      
      // Create some sample tickets for the approved events
      const sampleTickets = [
        {
          id: 'tkt1',
          eventId: 'evt1',
          userId: 'usr3',
          createdAt: '2023-09-16T11:30:00Z',
          qrCode: 'QR_evt1_usr3_1695123000000',
          status: 'active'
        },
        {
          id: 'tkt2',
          eventId: 'evt3',
          userId: 'usr3',
          createdAt: '2023-09-19T10:15:00Z',
          qrCode: 'QR_evt3_usr3_1695209700000',
          status: 'active'
        },
        {
          id: 'tkt3',
          eventId: 'evt4',
          userId: 'usr3',
          createdAt: '2023-09-26T14:45:00Z',
          qrCode: 'QR_evt4_usr3_1695385500000',
          status: 'active'
        },
        {
          id: 'tkt4',
          eventId: 'evt1',
          userId: 'usr4',
          createdAt: '2023-09-17T09:20:00Z',
          qrCode: 'QR_evt1_usr4_1695029400000',
          status: 'active'
        },
        {
          id: 'tkt5',
          eventId: 'evt5',
          userId: 'usr4',
          createdAt: '2023-09-23T16:10:00Z',
          qrCode: 'QR_evt5_usr4_1695477000000',
          status: 'active'
        }
      ];
      
      localStorage.setItem('mongodb_tickets', JSON.stringify(sampleTickets));
    }
    
    return Promise.resolve({ success: true, message: 'Database initialized with sample data if needed' });
  }
};

// Initialize the mock database with sample data
mockMongoDBConnection.initializeWithSampleData();

export default mockMongoDBConnection;
