import React from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./utils/AuthContext";
import Booking from "./components/Booking";
import About from "./components/About";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Booking />} />
            <Route path="/admin" element={<AdminPrivateRoute />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginPrivateRoute />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

const AdminPrivateRoute = () => {
  const { user } = useAuth();

  return user ? <Admin /> : <Navigate to="/login" />;
};

const LoginPrivateRoute = () => {
  const { user } = useAuth();

  return user ? <Navigate to="/admin" /> : <Login />;
};

export default App;
