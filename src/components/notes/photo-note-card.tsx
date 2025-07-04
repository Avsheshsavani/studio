import type { PhotoNote, Note } from "@/lib/types";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { NoteCardShell } from "./note-card-shell";

interface PhotoNoteCardProps {
  note: PhotoNote;
  onDelete: (id: string) => void;
  onEdit: (note: Note) => void;
}

export default function PhotoNoteCard({ note, onDelete, onEdit }: PhotoNoteCardProps) {
  return (
    <NoteCardShell
      note={note}
      onDelete={onDelete}
      onEdit={onEdit}
      icon={<ImageIcon className="w-5 h-5 text-muted-foreground" />}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-md">
        <Image
          src={note.imageUrl}
          alt={note.title}
          fill
          className="object-cover"
          data-ai-hint={note.imageHint}
        />
      </div>
    </NoteCardShell>
  );
}
