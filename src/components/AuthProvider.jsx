import { getUser, login } from '@/api/auth';
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const AuthContext = createContext(undefined);

export default function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.post("http://127.0.0.1:5000/login")

        const { authToken, user } = response;

        setAuthToken(authToken);
        setCurrentUser(user);
      } catch {
        setAuthToken(null);
        setCurrentUser(null);
      }
    }

    fetchUser();
  }, []);

  async function handleLogin() {
    try {
      const response = await login();

      const { authToken, user } = response[1];

      setAuthToken(authToken);
      setCurrentUser(user);
    } catch {
      setAuthToken(null);
      setCurrentUser(null);
    }
  }

  async function handleLogout() {
    setAuthToken(null);
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        authToken,
        currentUser,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used inside of a AuthProvider');
  }

  return context;
}