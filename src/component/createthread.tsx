import { useState } from "react";

export default function CreateThread() {
  const [content, setContent] = useState("");

  const handlePost = () => {
    console.log(content);
    setContent("");
  };

  return (
    <div className="border border-gray-800 p-4 rounded-xl mb-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What is happening?!"
        className="w-full bg-transparent outline-none resize-none text-sm"
      />

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