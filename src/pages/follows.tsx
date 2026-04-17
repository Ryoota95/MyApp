import { useEffect, useState } from "react";
import axios from "axios";

export default function Follows() {
  const [users, setUsers] = useState<any[]>([]);
  const [type, setType] = useState<"followers" | "following">("followers");
  const [loading, setLoading] = useState(false);

  const fetchFollows = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      // GET FOLLOWERS / FOLLOWING (MAIN DATA)
      const res = await axios.get(
        `http://localhost:3000/api/v1/follows?type=${type}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // GET FOLLOWING LIST (LOGIN USER ONLY)
      const followingRes = await axios.get(
        `http://localhost:3000/api/v1/follows?type=following`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // CLEAN FOLLOWING IDS (OUTBOUND RELATION ONLY)
      const followingIds = followingRes.data.data
        .map((item: any) => Number(item.following?.id))
        .filter((id: number) => !isNaN(id));

      // MAP DATA SESUAI TYPE
      const finalData = res.data.data.map((item: any) => {
        const user =
          type === "followers"
            ? item.follower
            : item.following;

        if (!user) return item;

        return {
          ...item,
          user,
          isFollowing: followingIds.includes(Number(user.id)),
        };
      });

      setUsers(finalData);
    } catch (error) {
      console.error("Failed fetch follows", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowToggle = async (
    userId: number,
    isFollowing: boolean
  ) => {
    const token = localStorage.getItem("token");

    try {
      if (isFollowing) {
        await axios.delete(
          "http://localhost:3000/api/v1/follows",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: {
              followingId: userId,
            },
          }
        );
      } else {
        await axios.post(
          "http://localhost:3000/api/v1/follows",
          {
            followingId: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // REFRESH DATA (SOURCE OF TRUTH)
      fetchFollows();
    } catch (error) {
      console.error("Follow toggle failed", error);
    }
  };

  useEffect(() => {
    fetchFollows();
  }, [type]);

  return (
    <div className="text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Follows</h1>

      {/* TABS */}
      <div className="flex gap-8 border-b border-gray-700 mb-6">
        <button
          onClick={() => setType("followers")}
          className={`pb-2 ${
            type === "followers"
              ? "border-b-2 border-green-500 text-green-500"
              : "text-gray-400"
          }`}
        >
          Followers
        </button>

        <button
          onClick={() => setType("following")}
          className={`pb-2 ${
            type === "following"
              ? "border-b-2 border-green-500 text-green-500"
              : "text-gray-400"
          }`}
        >
          Following
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          users.map((item: any) => {
            const user = item.user;

            if (!user) return null;

            return (
              <div
                key={item.id}
                className="flex justify-between items-center border border-gray-700 rounded-xl p-4"
              >
                <div>
                  <p className="font-semibold">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    @{user.name}
                  </p>
                </div>

                <button
                  type="button"
                  disabled={
                    type === "followers" &&
                    item.isFollowing
                  }
                  onClick={() =>
                    handleFollowToggle(
                      user.id,
                      item.isFollowing
                    )
                  }
                  className={`px-4 py-1 border rounded-full ${
                    type === "followers" &&
                    item.isFollowing
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {type === "following"
                    ? "Unfollow"
                    : item.isFollowing
                    ? "Following"
                    : "Folback"}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}