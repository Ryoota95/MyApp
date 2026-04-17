import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import Dashboard from "../pages/home";
import ProtectedRoute from "./protect";
import DetailThread from "@/component/Detailthread";
import Mainlayout from "@/layouts/layout";
import EditProfile from "@/component/editprofil";
import Follows from "@/pages/follows";
import ProfileCard from "@/component/profilecard";
import Search from "@/pages/search";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

      
        <Route path="/" element={<Mainlayout />}>

          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Detail */}
          <Route path="thread/:id" element={<DetailThread />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/follows" element={<Follows />} />
           <Route path="/profile" element={<ProfileCard />} />
           <Route path="/search" element={<Search />} />

        </Route>

        {/* Auth (di luar layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}