import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handlelogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const menuClass =
    "flex items-center gap-3 px-3 py-2 rounded-full hover:bg-gray-800 transition";

  return (
    <div className="w-64 px-4 border-r border-gray-800 sticky top-0 h-screen text-white">
      <h1 className="text-green-500 text-2xl font-bold mb-6">
        circle
      </h1>

      <nav className="space-y-2">
        <Link to="/dashboard" className={menuClass}>
           <span>Home</span>
        </Link>

        <Link to="/search" className={menuClass}>
           <span>Search</span>
        </Link>

        <Link to="/follows" className={menuClass}>
           <span>Follows</span>
        </Link>

        <Link to="/profile" className={menuClass}>
           <span>Profile</span>
        </Link>
      </nav>

      <button className="mt-6 bg-green-500 w-full py-2 rounded-full hover:bg-green-600 transition">
        Create Post
      </button>

      <button
        onClick={handlelogout}
        className="mt-3 w-full py-2 border border-gray-600 rounded-full hover:bg-gray-800 transition"
      >
        Logout
      </button>
    </div>
  );
}