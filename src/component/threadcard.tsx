import { useEffect , useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { socket } from "@/lib/socket";
import { useNavigate } from "react-router-dom";




export default function ThreadCard({ thread }: any) {
    const [liked, setliked] = useState(thread.isliked || false);
    const [likecount, setlikecount] = useState(thread.likes?.length || 0) 
    console.log("socket id", socket.id, "connected", socket.connected);
    const navigate = useNavigate();
     
    useEffect(() => {
      if(!thread) return;

      setliked(thread.isliked || false);
      setlikecount(thread.likes?.length || 0);
    }, [thread]);

    useEffect(() => {
      console.log("useeffect socket jalan", thread.id);
      
      
      
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  const handleLikeEvent = ({ data }: any) => {
    console.log("handleevent", data);
    console.log("threadid", thread.id, typeof thread.id);
     console.log("datathreadid", data.thread.id, typeof data.thread.id);
    
    
    if (data.threadId !== thread.id) return;

    console.log("total like", data.totallikes);
    

    const isMe = data.userId === user.id;
    setlikecount(data.totallikes);

    if (isMe) {
      setliked(data.action === "like");
    }
  };

  socket.on("thread:like",handleLikeEvent)

  

  return () => {
    socket.off("thread:like", handleLikeEvent); 
  };
}, [thread.id]);
    
    const handlelike = async () => {
       
      const token = sessionStorage.getItem("token");
      console.log("token:", token)

      const prevliked = liked;
      const prevcount = likecount;

      setliked((prev: boolean) => !prev);
      setlikecount((prev: number) => prevliked ? prev - 1 : prev + 1);
      
try {
      const res = await fetch("http://localhost:3000/auth/like",{
      method: "POST",
      headers: {"content-type": "application/json",
      Authorization: `Bearer ${token}`,
      },
    
     body: JSON.stringify({ threadId: thread.id}),
    });
     if (!res.ok) throw new Error("gagal");
  } catch (err){
   console.error("like gagal, rollback state", err);
   setliked(prevliked)
   setlikecount(prevcount)

  } 
     
     

    
     

    }

  return (
    <Card className="bg-black border-gray-800 text-white">
      <CardContent className="p-4">
        <div className="flex gap-3">
          
          <Avatar>
            <AvatarImage src="/src/assets/img/alya.jpg"/>
          </Avatar>

          <div className="flex-1">
            <div className="flex gap-2 items-center">
              <p className="font-semibold text-white">
                {thread.user?.name || "unknown"}
              </p>
              <p className="text-gray-400 text-sm">
                @{thread.user?.name || "unknown"}
              </p>
            </div>

            <p className="text-sm mt-1 text-gray-200">
              {thread.content}
            </p>

            {thread.image && (
          <img src={`http://localhost:3000/uploads/${thread.image}`}
           className="mt-2 rounded-lg max-h-64 w-full object-cover"
          />

            )}

            <div className="flex gap-4 mt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();

                  handlelike();
                }}
                 className={liked ? "text-red-500" : "text-gray-300"}
              >
                <span>
                  {liked? "❤️" : "🤍" }{likecount}
                  </span>
              </Button>
              <Button
              variant="ghost"
               size="sm"
              onClick={(e) => {
                 e.stopPropagation();
                 navigate(`/thread/${thread.id}`);
                }}
               className="text-gray-300"
                 >
              <span>💬 {thread._count?.replys ?? thread.replys?.length ?? 0}</span>
               </Button>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}