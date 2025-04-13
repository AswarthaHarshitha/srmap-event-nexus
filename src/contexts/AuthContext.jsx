
import { createContext, useContext, useState, useEffect } from 'react';

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
          localStorage.setItem('user', JSON.stringify(mockUser));
          localStorage.setItem('token', 'mock-jwt-token-' + Date.now());
          resolve(mockUser);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  },
  
  register: (name, email, password, role = 'student') => {
    // This would be an actual API call in production
    return new Promise((resolve, reject) => {
      setTimeout(() => {
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

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = authAPI.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
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
        register,
        logout,
        updateProfile,
        isAuthenticated: !!user,
        isAdmin,
        isOrganizer,
        isStudent,
        getUserRole,
        getDashboardUrl
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
