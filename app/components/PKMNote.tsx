export default function PKMNote({ note }: { note: Note }) {
  return (
    <div className="border-2 rounded-lg bg-background">
      <div className="border-b-2 p-2 border-dashed">{note.content}</div>
      <div className="text-sm px-2 py-1">
        {note.createdDate.toLocaleString()}
      </div>
    </div>
  );
}
