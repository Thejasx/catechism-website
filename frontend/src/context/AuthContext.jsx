import { createContext, useContext, useState } from 'react';

// Create a context for auth state
const AuthContext = createContext({
  token: null,
  user: '',
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState('');

  const login = (newToken, username) => {
    setToken(newToken);
    setUser(username ?? '');
  };

  const logout = () => {
    setToken(null);
    setUser('');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
