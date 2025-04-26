import { createContext, useContext, useState, useEffect } from 'react';
import { login, register, logout } from '../services/auth';
import parseJwt from '../utils/jwt'
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app load
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and fetch user data
      const decoded = parseJwt(token);
      setUser(decoded);
    }
    setLoading(false);
  }, []);

  const signIn = async (credentials) => {
    const { token, user } = await login(credentials);
    localStorage.setItem('token', token);
    setUser(user);
  };

  const signUp = async (userData) => {
    const { token, user } = await register(userData);
    localStorage.setItem('token', token);
    setUser(user);
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}