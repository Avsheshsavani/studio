"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  FileText,
  Image as ImageIcon,
  Lock,
  DollarSign,
} from "lucide-react";

import FinancialNoteForm from "./forms/financial-note-form";
import PhotoNoteForm from "./forms/photo-note-form";
import ProtectedNoteForm from "./forms/protected-note-form";
import SimpleNoteForm from "./forms/simple-note-form";
import type { Note, NoteType } from "@/lib/types";

interface NewNoteDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onNoteCreate: (note: Note) => void;
}

export function NewNoteDialog({
  isOpen,
  setIsOpen,
  onNoteCreate,
}: NewNoteDialogProps) {
  
  const handleSave = (noteData: Partial<Note>, type: NoteType) => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      timestamp: noteData.timestamp || Date.now(),
      type: type,
      title: noteData.title || "Untitled",
      tags: noteData.tags || [],
      // Type-specific properties
      ...noteData,
    } as Note;

    onNoteCreate(newNote);
    setIsOpen(false);
  };


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Create a new note</DialogTitle>
          <DialogDescription>
            Choose the type of note you want to create.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="simple" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="simple" className="flex-col h-auto py-2 gap-1">
              <FileText className="w-5 h-5" />
              Simple
            </TabsTrigger>
            <TabsTrigger value="photo" className="flex-col h-auto py-2 gap-1">
              <ImageIcon className="w-5 h-5" />
              Photo
            </TabsTrigger>
            <TabsTrigger value="protected" className="flex-col h-auto py-2 gap-1">
              <Lock className="w-5 h-5" />
              Protected
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex-col h-auto py-2 gap-1">
              <DollarSign className="w-5 h-5" />
              Financial
            </TabsTrigger>
          </TabsList>
          <TabsContent value="simple">
            <SimpleNoteForm onSave={(data) => handleSave(data, "simple")} />
          </TabsContent>
          <TabsContent value="photo">
            <PhotoNoteForm onSave={(data) => handleSave(data, "photo")} />
          </TabsContent>
          <TabsContent value="protected">
            <ProtectedNoteForm onSave={(data) => handleSave(data, "protected")} />
          </TabsContent>
          <TabsContent value="financial">
            <FinancialNoteForm onSave={(data) => handleSave(data, "financial")} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
