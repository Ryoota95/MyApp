import { useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { setProfile } from "@/features/profile/profileSlice";
import { useNavigate } from "react-router-dom";


export default function EditProfile() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state: any) => state.profile);
  const navigate = useNavigate()

  const [name, setName] = useState(profile.name || "");
  const [bio, setBio] = useState(profile.bio || "");

  const handleUpdate = async () => {
    const token = sessionStorage.getItem("token");
    

    const res = await fetch("http://localhost:3000/api/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, bio }),
    });

    const data = await res.json();

    
    dispatch(setProfile(data));

    alert("Profile berhasil diupdate!");

    setTimeout(() => {
        navigate("/dashboard");
    }, 500)
  };

  return (
    <div className="p-4 bg-zinc-900 rounded-xl">
      <h2 className="text-white mb-4">Edit Profile</h2>

      <input
        className="w-full mb-2 p-2 rounded bg-zinc-800 text-white"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />

      <textarea
        className="w-full mb-2 p-2 rounded bg-zinc-800 text-white"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio"
      />

      <button
        onClick={handleUpdate}
        className="bg-green-500 px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
}