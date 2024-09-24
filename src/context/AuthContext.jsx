import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { LOGIN_USER_URL } from "../constants/apiConstants";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if there is a token in localStorage when the app starts
    const token = localStorage.getItem('userToken');
    
    if (token) {
      // If there is a token, set the auth to true and fetch the user data
      setAuth(true);

      // Optionally, you can make an API request to verify the token and fetch user data
      axios.get(LOGIN_USER_URL, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          console.log("asdasd",response.data);
          setUser(response.data);
        })
        .catch(() => {
          // If token is invalid, clear localStorage and set auth to false
          localStorage.removeItem('userToken');
          setAuth(false);
          setUser(null);
        });
    }
  }, []); // Run only once when the app is mounted

  return (
    <AuthContext.Provider value={{ auth, setAuth, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
