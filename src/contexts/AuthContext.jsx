
import { createContext, useContext, useState, useEffect } from 'react';
import mockMongoDBConnection from '@/utils/dbConnection';

const AuthContext = createContext();

// Mock authentication API - would be replaced with actual API calls
const authAPI = {
  login: (email, password) => {
    // This would be an actual API call in production
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          // Determine role based on email for demo purposes
          let role = 'student';
          if (email.includes('admin')) {
            role = 'admin';
          } else if (email.includes('organizer') || email.includes('org')) {
            role = 'organizer';
          }
          
          const mockUser = {
            id: Math.random().toString(36).substring(2, 9),
            name: email.split('@')[0].split('.').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            email,
            role,
            department: role === 'student' ? 'Computer Science' : '',
            yearOfStudy: role === 'student' ? Math.floor(Math.random() * 4) + 1 : null,
            registeredEvents: [],
            profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}&backgroundColor=b6e3f4,c0aede,d1d4f9`
          };
          
          // Simulate storing in MongoDB
          console.log('Logging in user and updating in MongoDB:', mockUser);
          
          localStorage.setItem('user', JSON.stringify(mockUser));
          localStorage.setItem('token', 'mock-jwt-token-' + Date.now());
          resolve(mockUser);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  },
  
  socialLogin: (provider, profile) => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          // In a real implementation, this would verify the token with the provider
          // For demo, we'll create a user based on the profile
          let role = 'student'; // Default role for social logins
          if (profile.email.includes('admin')) {
            role = 'admin';
          } else if (profile.email.includes('organizer') || profile.email.includes('org')) {
            role = 'organizer';
          }
          
          const mockUser = {
            id: `${provider}_${Math.random().toString(36).substring(2, 9)}`,
            name: profile.name || profile.email.split('@')[0],
            email: profile.email,
            role,
            department: role === 'student' ? 'Computer Science' : '',
            yearOfStudy: role === 'student' ? Math.floor(Math.random() * 4) + 1 : null,
            registeredEvents: [],
            profileImage: profile.picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.email}&backgroundColor=b6e3f4,c0aede,d1d4f9`,
            socialProvider: provider
          };
          
          // Simulate storing in MongoDB
          const createdUser = await mockMongoDBConnection.createUser({
            provider,
            providerId: profile.id,
            name: profile.name || profile.email.split('@')[0],
            email: profile.email,
            role,
            createdAt: new Date().toISOString()
          });
          
          console.log(`${provider} login successful, user created in MongoDB:`, createdUser);
          
          localStorage.setItem('user', JSON.stringify(mockUser));
          localStorage.setItem('token', `mock-jwt-${provider}-token-` + Date.now());
          resolve(mockUser);
        } catch (error) {
          console.error(`${provider} login error:`, error);
          reject(new Error(`${provider} login failed`));
        }
      }, 800);
    });
  },
  
  // Google OAuth login
  googleLogin: () => {
    // In a real implementation, this would redirect to Google
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate a successful Google login
        const mockGoogleProfile = {
          id: 'google_' + Math.random().toString(36).substring(2, 9),
          name: 'Google User',
          email: `user_${Math.floor(Math.random() * 1000)}@gmail.com`,
          picture: 'https://lh3.googleusercontent.com/a/default-user'
        };
        
        authAPI.socialLogin('google', mockGoogleProfile).then(resolve).catch(reject);
      }, 1000);
    });
  },
  
  // GitHub OAuth login
  githubLogin: () => {
    // In a real implementation, this would redirect to GitHub
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate a successful GitHub login
        const mockGithubProfile = {
          id: 'github_' + Math.random().toString(36).substring(2, 9),
          name: 'GitHub User',
          email: `dev_${Math.floor(Math.random() * 1000)}@github.com`,
          picture: 'https://avatars.githubusercontent.com/u/12345678'
        };
        
        authAPI.socialLogin('github', mockGithubProfile).then(resolve).catch(reject);
      }, 1000);
    });
  },
  
  register: (name, email, password, role = 'student') => {
    // This would be an actual API call in production
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        if (name && email && password) {
          // Override role based on email for demo purposes (this would be removed in production)
          if (email.includes('admin')) {
            role = 'admin';
          } else if (email.includes('organizer') || email.includes('org')) {
            role = 'organizer';
          }
          
          const mockUser = {
            id: Math.random().toString(36).substring(2, 9),
            name,
            email,
            role,
            department: role === 'student' ? 'Computer Science' : '',
            yearOfStudy: role === 'student' ? Math.floor(Math.random() * 4) + 1 : null,
            registeredEvents: [],
            profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}&backgroundColor=b6e3f4,c0aede,d1d4f9`
          };
          
          // Simulate storing in MongoDB
          try {
            const createdUser = await mockMongoDBConnection.createUser({
              name,
              email,
              role,
              password: "***hashed***", // In real app, password would be hashed
              createdAt: new Date().toISOString()
            });
            
            console.log('User created in MongoDB:', createdUser);
          } catch (error) {
            console.error('Error creating user in MongoDB:', error);
          }
          
          localStorage.setItem('user', JSON.stringify(mockUser));
          localStorage.setItem('token', 'mock-jwt-token-' + Date.now());
          resolve(mockUser);
        } else {
          reject(new Error('All fields are required'));
        }
      }, 800);
    });
  },
  
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return Promise.resolve();
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  
  updateProfile: (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUser = { ...currentUser, ...userData };
        
        // Simulate updating in MongoDB
        console.log('Updating user in MongoDB:', updatedUser);
        
        localStorage.setItem('user', JSON.stringify(updatedUser));
        resolve(updatedUser);
      }, 500);
    });
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dbConnected, setDbConnected] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = authAPI.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    
    // Test MongoDB connection
    mockMongoDBConnection.testConnection()
      .then(result => {
        console.log('MongoDB connection test:', result);
        setDbConnected(result.success);
      })
      .catch(err => {
        console.error('MongoDB connection error:', err);
        setDbConnected(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const user = await authAPI.login(email, password);
      setUser(user);
      return user;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await authAPI.googleLogin();
      setUser(user);
      return user;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const githubLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await authAPI.githubLogin();
      setUser(user);
      return user;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, role = 'student') => {
    setLoading(true);
    setError(null);
    try {
      const user = await authAPI.register(name, email, password, role);
      setUser(user);
      return user;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authAPI.logout();
      setUser(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (userData) => {
    setLoading(true);
    try {
      const updatedUser = await authAPI.updateProfile(userData);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isOrganizer = () => {
    return user?.role === 'organizer' || user?.role === 'admin';
  };

  const isStudent = () => {
    return user?.role === 'student';
  };

  const getUserRole = () => {
    return user?.role || 'guest';
  };

  // Get the dashboard URL based on user role
  const getDashboardUrl = () => {
    if (!user) return '/auth/login';
    
    switch (user.role) {
      case 'admin':
        return '/admin';
      case 'organizer':
        return '/organizer';
      default:
        return '/dashboard';
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        googleLogin,
        githubLogin,
        register,
        logout,
        updateProfile,
        isAuthenticated: !!user,
        isAdmin,
        isOrganizer,
        isStudent,
        getUserRole,
        getDashboardUrl,
        dbConnected
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
