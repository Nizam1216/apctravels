import React, { useState, useEffect, createContext } from "react";
import jwtDecode from "jwt-decode";
// import { Navigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken.user);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    setLoading(false);
  }, []);

  const loginUser = (authToken) => {
    try {
      const decodedToken = jwtDecode(authToken);
      setUser(decodedToken.user);
      localStorage.setItem("token", authToken);
    } catch (error) {
      console.error("Invalid authToken:", error);
    }
  };

  const logoutUser = (e) => {
    setUser(false);
    localStorage.removeItem("token");
  };

  const checkUserStatus = () => {
    return !!user;
  };

  const contextData = {
    user,
    loginUser,
    logoutUser,
    checkUserStatus,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export default AuthContext;
