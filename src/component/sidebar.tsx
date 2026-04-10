import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();
    const handlelogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }
  return (
    <div className="w-64 p-4 border-r border-gray-800">
      <h1 className="text-green-500 text-2xl font-bold mb-6">
        circle
      </h1>

      <nav className="space-y-4">
        <Link to="/">🏠 Home</Link>
        <p>🔍 Search</p>
        <p>👥 Follows</p>
        <p>👤 Profile</p>
      </nav>

      <button className="mt-6 bg-green-500 w-full py-2 rounded-full">
        Create Post
      </button>

       <button onClick={handlelogout}>Logout</button>
    </div>
  );
}