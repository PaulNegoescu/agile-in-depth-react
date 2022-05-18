import { createContext, useContext } from 'react';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';

const tokenStorageKey = 'token';
const userStorageKey = 'user';

export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
  const [token, setToken, removeToken] = useLocalStorageState(tokenStorageKey);
  const [user, setUser, removeUser] = useLocalStorageState(userStorageKey);

  function login(data) {
    setToken(data.accessToken);
    setUser(data.user);
  }

  function logout() {
    removeToken();
    removeUser();
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const value = useContext(AuthContext);

  if (value === null) {
    throw new Error('Please wrap your components in the AuthContextProvider!');
  }

  return value;
}
