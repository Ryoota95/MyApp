import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/index";
import { setCredentials } from "../store/slices/authslice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();



  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      dispatch(setCredentials({ user: data.user, token: data.token }));
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      alert(data.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  return (
  <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-4">
    <div className="w-full max-w-sm">
      <p className="text-green-500 text-2xl font-medium mb-1">Null</p>
      <p className="text-white text-xl font-medium mb-6">Login to Null</p>

      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email *"
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-md px-4 py-2.5 text-white text-sm placeholder-gray-500 outline-none focus:border-green-500"
        />

        <input
          type="password"
          placeholder="Password *"
          onChange={(e) => setPassword(e.target.value)}
          className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-md px-4 py-2.5 text-white text-sm placeholder-gray-500 outline-none focus:border-green-500"
        />

        <div className="text-right -mt-1">
          <a href="#" className="text-xs text-gray-500 hover:text-gray-300">Forgot password?</a>
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full py-2.5 text-sm font-medium transition-colors"
        >
          Login
        </button>

        <p className="text-center text-xs text-gray-500 mt-1">
          Don't have an account yet?{" "}
          <a href="/register" className="text-green-500 hover:underline">Create account</a>
        </p>
      </form>
    </div>
  </div>
);
}