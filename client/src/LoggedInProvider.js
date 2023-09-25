import React, { createContext, useEffect, useState } from 'react';

import Auth from './utils/auth';

const LoggedInContext = createContext();

export function LoggedInProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const status = Auth.loggedIn();
    setLoggedIn(status);
  });

  return (
    <LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </LoggedInContext.Provider>
  );
}

export default LoggedInContext;
