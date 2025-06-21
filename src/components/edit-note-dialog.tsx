
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Note, SimpleNote, ProtectedNote, PhotoNote, FinancialNote } from "@/lib/types";

import FinancialNoteForm from "./forms/financial-note-form";
import PhotoNoteForm from "./forms/photo-note-form";
import ProtectedNoteForm from "./forms/protected-note-form";
import SimpleNoteForm from "./forms/simple-note-form";

interface EditNoteDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  note: Note | null;
  onNoteUpdate: (note: Note) => void;
}

export function EditNoteDialog({
  isOpen,
  setIsOpen,
  note,
  onNoteUpdate,
}: EditNoteDialogProps) {
  if (!note) {
    return null;
  }

  const handleSave = (updatedData: Partial<Note>) => {
    const updatedNote: Note = {
      ...note,
      ...updatedData,
      timestamp: Date.now(), // Update timestamp on edit
    };
    onNoteUpdate(updatedNote);
    setIsOpen(false);
  };

  const renderForm = () => {
    switch (note.type) {
      case "simple":
        return (
          <SimpleNoteForm
            onSave={handleSave}
            note={note as SimpleNote}
          />
        );
      case "photo":
        return (
          <PhotoNoteForm
            onSave={handleSave}
            note={note as PhotoNote}
          />
        );
      case "protected":
        return (
          <ProtectedNoteForm
            onSave={handleSave}
            note={note as ProtectedNote}
          />
        );
      case "financial":
          return (
            <FinancialNoteForm
              onSave={handleSave}
              note={note as FinancialNote}
            />
          );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Edit: {note.title}</DialogTitle>
           <DialogDescription>
            Modify the details of your note below.
          </DialogDescription>
        </DialogHeader>
        <div className="pt-4">{renderForm()}</div>
      </DialogContent>
    </Dialog>
  );
}
