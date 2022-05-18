import { createContext, useContext, useState } from 'react';

export const CommsContext = createContext(null);

export function CommsContextProvider({ children }) {
  const [message, setMessage] = useState('');

  function handleMessage(m) {
    setMessage(m);
  }

  return (
    <CommsContext.Provider value={{ message, handleMessage }}>
      {children}
    </CommsContext.Provider>
  );
}

export function useCommsContext() {
  const value = useContext(CommsContext);
  if (value === null) {
    throw new Error(
      'You need to wrap the components which use the CommsContext in the CommsContextProvider Component.'
    );
  }

  return value;
}
