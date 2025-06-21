"use client";

import type { ProtectedNote, Note } from "@/lib/types";
import { Lock } from "lucide-react";
import { NoteCardShell } from "./note-card-shell";

interface ProtectedNoteCardProps {
  note: ProtectedNote;
  onDelete: (id: string) => void;
  onEdit: (note: Note) => void;
}

export default function ProtectedNoteCard({
  note,
  onDelete,
  onEdit,
}: ProtectedNoteCardProps) {
  return (
    <NoteCardShell
      note={note}
      onDelete={onDelete}
      onEdit={onEdit}
      icon={<Lock className="w-5 h-5 text-muted-foreground" />}
    >
      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
        {note.body}
      </p>
    </NoteCardShell>
  );
}
