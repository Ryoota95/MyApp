import { useState } from "react";
import type React from "react";
import { ImagePlus} from "lucide-react"

type Thread = {
  id: string,
  content: string,
  image?: string | null
}

type Props = {
   setThreads: React.Dispatch<React.SetStateAction<Thread[]>>
}

export default function CreateThread({ setThreads }: Props) {
  const [content, setContent] = useState("");
    const [file, setfile] = useState<File | null>(null);

  const handlePost = async () => {
   if (!content) return;

   const formData: FormData = new FormData();
     formData.append("content", content);

     if(file){
       formData.append("image", file);
     }


   const token = sessionStorage.getItem("token")
   
   try {

    const res = await fetch("http://localhost:3000/api/threads",{
      method: "POST",
      body: formData,
      headers: {
      Authorization: `Bearer ${token}`,
      },
    

    });

    

    setContent("");
const newThread = await res.json();

setThreads((prev) => [newThread,...prev])
    
    
   } catch (error) {
    console.error(error);
    
   }
  };

  return (
    <div className="border border-gray-800 p-4 rounded-xl mb-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What is happening?!"
        className="w-full bg-transparent outline-none resize-none text-sm"
      />
    

      <input type="file"
      accept="image/*"
      id="fileuploud"
      className="hidden"
      onChange={(e) => setfile(e.target.files?.[0] || null)}
      />

      <label htmlFor="fileuploud" className="cursor-pointer">
        <ImagePlus size={20}/>
      </label>

      <div className="flex justify-end mt-2">
        <button
          onClick={handlePost}
          className="bg-green-500 px-4 py-1 rounded-full"
        >
          Post
        </button>
      </div>
    </div>
  );
}