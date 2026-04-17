import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReplyCard from "./Replaycard";

function formatDate(dateString: string) {
  const date = new Date(dateString);

  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${time} • ${day} ${month} ${year}`;
}

export default function DetailThread() {
  const { id } = useParams();
  const [thread, setThread] = useState<any>(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3000/api/threads/${id}`);
      const data = await res.json();

      console.log("THREAD:", data); // debug
      setThread(data);
    };

    fetchData();
    fetchReplies()    
    
  }, [id]);

  const [replies, setReplies] = useState<any[]>([]);
  const fetchReplies = async () => {
    const res = await fetch(`http://localhost:3000/api/threads/replies/${id}`,);
    const data = await res.json();
    setReplies(data);
  };

  

const [content, setContent] = useState("");

const handleReply = async () => {
  const token = sessionStorage.getItem("token");

  if (!content.trim()) return;

  try {
    const res = await fetch(`
      http://localhost:3000/api/threads/replies/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      }
    );

    if (!res.ok) throw new Error("failed");

    setContent("");
    fetchReplies();
  } catch (err) {
    console.error("reply gagal:", err);
  }
};

  
  return (
    <div className="text-white p-4">
      {!thread ? (
        <p>Loading...</p>
      ) : (
        <>
        <div className="flex items-center gap-3 p-4 border-b border-gray-800">
  <button
    onClick={() => navigate(-1)}
    className="text-white text-xl"
  >
    ←
  </button>

  <span className="font-bold text-lg">
    Status
  </span>
</div>
          <h1 className="text-xl font-bold">{thread.user?.name}</h1>
          <p className="text-gray-400">@{thread.user?.name}</p>

          <p className="mt-2">{thread.content}</p>
          <p className="text-gray-400">{formatDate(thread.createdAt)}</p>


          {thread.image && (
            <img
              src={`http://localhost:3000/uploads/${thread.image}`}
              className="mt-2 rounded-lg max-h-64 w-full object-cover"
            />
          )}

          

          <div className="flex gap-4 mt-2 text-gray-300">
          <span>❤️ {thread.likesCount}</span>
           <span>💬 {replies.length} Replies</span>
          </div>
           
           
            
            
          <div className="p-4 border-b border-gray-800">
  <textarea
    value={content}
    onChange={(e) => setContent(e.target.value)}
    className="w-full bg-black text-white outline-none"
    placeholder="Write a reply..."
  />

  <button
    onClick={handleReply}
    className="mt-2 bg-blue-500 px-4 py-1 rounded"
  >
    Reply
  </button>
</div>

          {replies.map((Reply) =>
          <ReplyCard key={Reply.id} reply={Reply}/>
          )}
        </>
      )}
    </div>
  );
}