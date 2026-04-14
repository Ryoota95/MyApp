import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function ThreadCard({ thread }: any) {
  const [liked, setLiked] = useState(false);

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
                {thread.user.name}
              </p>
              <p className="text-gray-400 text-sm">
                @{thread.user.username}
              </p>
            </div>

            <p className="text-sm mt-1 text-gray-200">
              {thread.content}
            </p>

            <div className="flex gap-4 mt-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300"
                onClick={() => setLiked(!liked)}
              >
                {liked ? "❤️ Liked" : "🤍 Like"}
              </Button>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}