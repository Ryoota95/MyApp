import { Outlet } from "react-router-dom";
import Sidebar from "../component/sidebar";
import { useLocation } from "react-router-dom";
import RightPanel from "../component/rightpanel";

export default function Mainlayout() {
  const location = useLocation();
  return (
    <div className="flex h-screen bg-black text-white">
        <div className="flex-1">
      <Sidebar />
      </div>

      <div className="flex-[2] border-x border-gray-800 overflow-y-auto  px-4">
        <Outlet />
      </div>

      <div className="flex-1">
        {location.pathname !== "/profile" && <RightPanel />}
      
      </div>
    </div>
  );
}