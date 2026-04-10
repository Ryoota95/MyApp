import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import Dashboard from "../pages/home";
import ProtectedRoute from "./protect";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
      </Routes>
    </BrowserRouter>


  );
}