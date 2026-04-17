import { useState } from "react";
import axios from "axios";

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const [users, setUsers] = useState<any[]>([]);

  const handleSearch = async () => {
  const token = localStorage.getItem("token");

  try {
    
    const res = await axios.get(
      `http://localhost:3000/auth/users?search=${keyword}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    
    const followingRes = await axios.get(
      `http://localhost:3000/api/v1/follows?type=following`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const followingIds = followingRes.data.data.map(
      (item: any) => item.following?.id
    );

    const data = res.data.data.map((user: any) => ({
      ...user,
      isFollowing: followingIds.some((id: number) => Number(id) === Number(user.id)),
    }));

    setUsers(data);
  } catch (error) {
    console.error(error);
  }
};
  const handleFollow = async (userId: number) => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:3000/api/v1/follows",
      { followingId: userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    
    setUsers((prev: any[]) =>
      prev.map((user) =>
        user.id === userId
          ? { ...user, isFollowing: true }
          : user
      )
    );
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="text-white p-6">
      <h1 className="text-xl font-bold mb-4">Search Users</h1>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search user..."
          className="bg-gray-800 px-3 py-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-green-500 px-4 rounded"
        >
          Search
        </button>
      </div>

      {/* Result */}
      <div className="space-y-3">
        {users.map((user: any) => (
          <div
            key={user.id}
            className="flex justify-between border p-3 rounded"
          >
            <div>
              <p>{user.name}</p>
              <p className="text-gray-400">@{user.name}</p>
            </div>

            <button
  onClick={() => !user.isFollowing && handleFollow(user.id)}
  disabled={user.isFollowing}
  className={`px-3 py-1 rounded-full border ${
    user.isFollowing
      ? "opacity-50 cursor-not-allowed"
      : "hover:bg-gray-700"
  }`}
>
  {user.isFollowing ? "Following" : "Follow"}
</button>
          </div>
        ))}
      </div>
    </div>
  );
}