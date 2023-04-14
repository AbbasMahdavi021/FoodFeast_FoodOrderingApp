/*
 * save user to local storage so that it persists across page refreshes.
 * Can be accessed from any component using the useContext hook.
 */

import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const setPersistedUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  return (
    <UserContext.Provider value={{ user, setUser: setPersistedUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
