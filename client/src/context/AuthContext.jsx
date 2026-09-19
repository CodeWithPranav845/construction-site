import { createContext, useContext, useEffect, useState } from 'react';
import { TOKEN_KEY } from '../services/api.js';
import { getMe, login as loginRequest } from '../services/authApi.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  // If a token is saved, we must verify it with the server before deciding who is logged in
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem(TOKEN_KEY)));

  useEffect(() => {
    if (!localStorage.getItem(TOKEN_KEY)) return;
    getMe()
      .then(setAdmin)
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setAdmin(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const { token, admin: profile } = await loginRequest(email, password);
    localStorage.setItem(TOKEN_KEY, token);
    setAdmin(profile);
    return profile;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, isAuthenticated: Boolean(admin), login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
