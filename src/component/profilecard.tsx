import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { setProfile } from "@/features/profile/profileSlice";
import { useNavigate } from "react-router-dom";

export default function ProfileCard() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state: any) => state.profile);
  const navigate = useNavigate()
  

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const fetchProfile = async () => {
      const res = await fetch("http://localhost:3000/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      dispatch(setProfile(data));
    };

    fetchProfile();
  }, [dispatch]);

  console.log(profile);
  

  return (
  <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-white/10">
    {/* Banner */}
    <div className="h-24 bg-gradient-to-r from-lime-300 via-yellow-200 to-amber-400" />

    {/* Info */}
    <div className="px-4 pb-4">
      <div className="flex justify-between items-end -mt-8 mb-3">
        <img
          src={profile.avatar
            ? `http://localhost:3000/${profile.avatar}`
            : `https://ui-avatars.com/api/?name=${profile.name}`}
          className="w-16 h-16 rounded-full border-4 border-zinc-900 object-cover"
        />
        <button 
        onClick={() => navigate("/edit-profile")}
        className="text-white text-sm border border-white/30 rounded-full px-4 py-1">
          Edit Profile
        </button>
      </div>

      <h2 className="text-white font-semibold text-base">✦ {profile.name} ✦</h2>
      <p className="text-zinc-500 text-xs mb-1">@{profile.name}</p>
      <p className="text-zinc-300 text-sm mb-3">{profile.bio}</p>

      <div className="flex gap-4 text-sm">
        <span><strong className="text-white">{profile.following}</strong> <span className="text-zinc-500">Following</span></span>
        <span><strong className="text-white">{profile.followers}</strong> <span className="text-zinc-500">Followers</span></span>
      </div>
    </div>
  </div>
)
}