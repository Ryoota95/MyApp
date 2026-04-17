function formatDate(dateString: string) {
  const date = new Date(dateString);

  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });


  return `${time}`;
}

export default function ReplyCard({ reply }: any) {
  return (
    <div className="border-b border-gray-800 p-3 text-white">

  <div className="flex justify-between items-center">

    
    <div className="flex items-center gap-2">
      <p className="font-semibold">{reply.user?.name}</p>

      <p className="text-gray-500 text-sm">
        @{reply.user?.name}
      </p>

      <p className="text-gray-600 text-xs">
        • {formatDate(reply.createdAt)}
      </p>
    </div>

  </div>

  {/* content */}
  <p className="mt-1 text-gray-200">
    {reply.content}
  </p>

</div>
  );
}