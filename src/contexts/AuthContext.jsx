
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Mock authentication API - would be replaced with actual API calls
const authAPI = {
  login: (email, password) => {
    // This would be an actual API call in production
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const mockUser = {
            id: '1',
            name: 'SRM Student',
            email,
            role: email.includes('admin') ? 'admin' : 'user',
            profileImage: 'https://i.pravatar.cc/150?u=' + email
          };
          localStorage.setItem('user', JSON.stringify(mockUser));
          localStorage.setItem('token', 'mock-jwt-token');
          resolve(mockUser);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  },
  
  register: (name, email, password) => {
    // This would be an actual API call in production
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          const mockUser = {
            id: '1',
            name,
            email,
            role: 'user',
            profileImage: 'https://i.pravatar.cc/150?u=' + email
          };
          localStorage.setItem('user', JSON.stringify(mockUser));
          localStorage.setItem('token', 'mock-jwt-token');
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

  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const user = await authAPI.register(name, email, password);
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

  const isAdmin = () => {
    return user?.role === 'admin';
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
        isAuthenticated: !!user,
        isAdmin
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
