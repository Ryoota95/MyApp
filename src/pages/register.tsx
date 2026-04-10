import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: any) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Register berhasil!");
      navigate("/login");
    } else {
      alert(data.message);
    }
  };

  return (
  <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-4">
    <div className="w-full max-w-sm">
      <p className="text-green-500 text-2xl font-medium mb-1">Null</p>
      <p className="text-white text-xl font-medium mb-6">Register to Null</p>

      <form onSubmit={handleRegister} className="flex flex-col gap-3">

        <input
          type="text"
          placeholder="Name *"
          onChange={(e) => setName(e.target.value)}
          className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-md px-4 py-2.5 text-white text-sm placeholder-gray-500 outline-none focus:border-green-500"
        />

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

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full py-2.5 text-sm font-medium transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  </div>
);
}