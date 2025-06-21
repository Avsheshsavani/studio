import type { SimpleNote, Note } from "@/lib/types";
import { FileText } from "lucide-react";
import { NoteCardShell } from "./note-card-shell";

interface SimpleNoteCardProps {
  note: SimpleNote;
  onDelete: (id: string) => void;
  onEdit: (note: Note) => void;
}

export default function SimpleNoteCard({
  note,
  onDelete,
  onEdit
}: SimpleNoteCardProps) {
  return (
    <NoteCardShell
      note={note}
      onDelete={onDelete}
      onEdit={onEdit}
      icon={<FileText className="w-5 h-5 text-muted-foreground" />}
    >
      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
        {note.body}
      </p>
    </NoteCardShell>
  );
}
