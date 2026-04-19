import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ht_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('ht_token') || null);

  const login = (userData, tok) => {
    setUser(userData);
    setToken(tok);
    localStorage.setItem('ht_user', JSON.stringify(userData));
    localStorage.setItem('ht_token', tok);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('ht_user');
    localStorage.removeItem('ht_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
