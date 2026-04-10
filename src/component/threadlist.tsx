import ThreadCard from "./threadcard";

export default function ThreadList({ threads }: { threads: any[] }) {
  return (
    <div className="thread-list">
      {threads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </div>
  );
}