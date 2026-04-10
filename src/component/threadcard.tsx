import { useState } from "react";

export default function ThreadCard({ thread }: any) {
   const [liked, setliked] = useState(false);

  return (
    <div className="border border-gray-800 p-4 rounded-xl">
      <div className="flex gap-3">
        
        <img
          src={thread.user.avatar}
          className="w-10 h-10 rounded-full"
        />

        <div>
          <div className="flex gap-2">
            <p className="font-semibold">{thread.user.name}</p>
            <p className="text-gray-400 text-sm">
              {thread.user.username}
            </p>
          </div>

          <p className="text-sm mt-1">{thread.content}</p>

          <div className="flex gap-4 text-gray-400 text-sm mt-3">
            <button onClick={() => setliked (!liked)}>{liked? "❤️ liked" : "🤍 like"}</button>
          </div>
        </div>

      </div>
    </div>
  );
}