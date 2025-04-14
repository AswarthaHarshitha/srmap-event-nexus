
// This file simulates MongoDB connection in the client
// In a real application, this would be handled by the backend

const mockMongoDBConnection = {
  isConnected: true,
  connectionString: 'mongodb://localhost:27017/event_sphere',
  
  // Simulated connection test function
  testConnection: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
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
  
  // Mock CRUD operations
  findUsers: (query = {}) => {
    // In real implementation, this would call the backend API
    return Promise.resolve([
      { 
        id: "usr1", 
        name: "John Doe", 
        email: "john.doe@srm.edu.in", 
        role: "student", 
        department: "Computer Science",
        status: "active",
        joined: "2023-05-15" 
      },
      { 
        id: "usr2", 
        name: "Jane Smith", 
        email: "jane.smith@srm.edu.in", 
        role: "student", 
        department: "Mechanical Engineering",
        status: "active",
        joined: "2023-06-22" 
      },
      // More mock users...
    ]);
  },
  
  findEvents: (query = {}) => {
    // In real implementation, this would call the backend API
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    return Promise.resolve(events.length > 0 ? events : [
      {
        id: "evt1",
        title: "Web Development Workshop",
        description: "Learn the basics of web development with HTML, CSS, and JavaScript",
        date: "2025-10-15",
        time: "10:00 AM - 12:00 PM",
        location: "Main Auditorium, Block 1",
        category: "Tech",
        status: "approved",
        registrations: 87,
        capacity: 100,
        image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
      },
      // More mock events...
    ]);
  },
  
  createUser: (userData) => {
    // In real implementation, this would call the backend API
    console.log('Creating new user in MongoDB:', userData);
    
    // Store in local storage to simulate persistence
    const users = JSON.parse(localStorage.getItem('mongodb_users') || '[]');
    const newUser = {
      ...userData,
      id: `usr${Math.floor(Math.random() * 1000)}`,
      status: 'active',
      joined: new Date().toISOString().split('T')[0]
    };
    
    users.push(newUser);
    localStorage.setItem('mongodb_users', JSON.stringify(users));
    
    return Promise.resolve(newUser);
  },
  
  createEvent: (eventData) => {
    // In real implementation, this would call the backend API
    console.log('Creating new event in MongoDB:', eventData);
    
    // Store in local storage to simulate persistence
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const newEvent = {
      ...eventData,
      id: `evt${Math.floor(Math.random() * 1000)}`,
      status: eventData.status || 'pending',
      registrations: 0,
      createdAt: new Date().toISOString()
    };
    
    events.push(newEvent);
    localStorage.setItem('events', JSON.stringify(events));
    
    return Promise.resolve(newEvent);
  },
  
  updateEvent: (eventId, eventData) => {
    console.log('Updating event in MongoDB:', eventId, eventData);
    
    // Update in local storage
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const eventIndex = events.findIndex(event => event.id === eventId);
    
    if (eventIndex !== -1) {
      events[eventIndex] = { ...events[eventIndex], ...eventData };
      localStorage.setItem('events', JSON.stringify(events));
      return Promise.resolve(events[eventIndex]);
    }
    
    return Promise.reject(new Error('Event not found'));
  },
  
  deleteEvent: (eventId) => {
    console.log('Deleting event from MongoDB:', eventId);
    
    // Remove from local storage
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const filteredEvents = events.filter(event => event.id !== eventId);
    
    localStorage.setItem('events', JSON.stringify(filteredEvents));
    return Promise.resolve({ success: true });
  },
  
  // Get events for a specific user (organizer)
  getOrganizerEvents: (organizerId) => {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    return Promise.resolve(events.filter(event => event.organizerId === organizerId));
  },
  
  // Register user for an event
  registerForEvent: (eventId, userId) => {
    console.log('Registering user for event in MongoDB:', userId, eventId);
    
    // Update events in local storage
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const eventIndex = events.findIndex(event => event.id === eventId);
    
    if (eventIndex !== -1) {
      events[eventIndex].registrations += 1;
      localStorage.setItem('events', JSON.stringify(events));
      
      // Create a ticket
      const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
      const newTicket = {
        id: `tkt${Math.floor(Math.random() * 10000)}`,
        eventId,
        userId,
        createdAt: new Date().toISOString(),
        qrCode: `QR_${eventId}_${userId}_${Date.now()}`,
        status: 'active'
      };
      
      tickets.push(newTicket);
      localStorage.setItem('tickets', JSON.stringify(tickets));
      
      return Promise.resolve(newTicket);
    }
    
    return Promise.reject(new Error('Event not found'));
  }
};

export default mockMongoDBConnection;
