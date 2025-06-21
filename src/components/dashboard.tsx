"use client";

import { Feather, Plus, Search, LogOut, ArrowLeft } from "lucide-react";
import React, { useState, useMemo } from "react";
import type { Note, NoteType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NewNoteDialog } from "@/components/new-note-dialog";
import { ThemeToggle } from "@/components/theme-toggle";
import FinancialNoteCard from "./notes/financial-note-card";
import PhotoNoteCard from "./notes/photo-note-card";
import ProtectedNoteCard from "./notes/protected-note-card";
import SimpleNoteCard from "./notes/simple-note-card";
import { useAuth } from "@/contexts/auth-context";
import { CategoryDirectory } from "./category-directory";
import { EditNoteDialog } from "./edit-note-dialog";

interface DashboardProps {
  initialNotes: Note[];
}

const categoryDetails: Record<NoteType, { name: string }> = {
  simple: { name: "Simple Notes" },
  photo: { name: "Photo Notes" },
  protected: { name: "Protected Notes" },
  financial: { name: "Financial Notes" },
};

export function Dashboard({ initialNotes }: DashboardProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewNoteDialogOpen, setIsNewNoteDialogOpen] = useState(false);
  const [isEditNoteDialogOpen, setIsEditNoteDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<NoteType | null>(
    null
  );
  const { logout } = useAuth();

  const addNote = (note: Note) => {
    setNotes((prevNotes) => [note, ...prevNotes]);
    // After adding, switch to the category of the new note
    setSelectedCategory(note.type);
  };

  const updateNote = (updatedNote: Note) => {
    setNotes(notes => notes.map(n => n.id === updatedNote.id ? updatedNote : n));
    setEditingNote(null);
  };

  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };
  
  const handleEditClick = (note: Note) => {
    setEditingNote(note);
    setIsEditNoteDialogOpen(true);
  }

  const notesByCategory = useMemo(() => {
    return notes.reduce((acc, note) => {
      (acc[note.type] = acc[note.type] || []).push(note);
      return acc;
    }, {} as Record<NoteType, Note[]>);
  }, [notes]);

  const filteredNotes = useMemo(() => {
    if (!selectedCategory) return [];
    const categoryNotes = notesByCategory[selectedCategory] || [];
    if (!searchQuery) return categoryNotes;

    return categoryNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [notesByCategory, selectedCategory, searchQuery]);

  const renderNotesGrid = () => {
    if (!selectedCategory) return null;

    if (filteredNotes.length > 0) {
      return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredNotes.map((note) => {
            switch (note.type) {
              case "simple":
                return (
                  <SimpleNoteCard
                    key={note.id}
                    note={note}
                    onDelete={deleteNote}
                    onEdit={handleEditClick}
                  />
                );
              case "protected":
                return (
                  <ProtectedNoteCard
                    key={note.id}
                    note={note}
                    onDelete={deleteNote}
                    onEdit={handleEditClick}
                  />
                );
              case "photo":
                return (
                  <PhotoNoteCard
                    key={note.id}
                    note={note}
                    onDelete={deleteNote}
                    onEdit={handleEditClick}
                  />
                );
              case "financial":
                return (
                  <FinancialNoteCard
                    key={note.id}
                    note={note}
                    onDelete={deleteNote}
                    onEdit={handleEditClick}
                  />
                );
              default:
                return null;
            }
          })}
        </div>
      );
    } else {
      return (
        <div className="flex h-[50vh] flex-col items-center justify-center rounded-xl border border-dashed">
          <h2 className="text-2xl font-bold tracking-tight">No notes found</h2>
          <p className="text-muted-foreground">
            {searchQuery
              ? "Try a different search term."
              : `Create a new note in the '${categoryDetails[selectedCategory].name}' category.`}
          </p>
        </div>
      );
    }
  };

  const renderCategoryDirectories = () => (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {(Object.keys(categoryDetails) as NoteType[]).map((category) => (
        <CategoryDirectory
          key={category}
          category={category}
          noteCount={(notesByCategory[category] || []).length}
          onClick={() => setSelectedCategory(category)}
        />
      ))}
    </div>
  );

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
        {selectedCategory ? (
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => {
              setSelectedCategory(null);
              setSearchQuery("");
            }}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        ) : (
          <div className="flex items-center gap-2 text-lg font-semibold md:text-base">
            <Feather className="h-6 w-6 text-primary" />
          </div>
        )}
        <h1 className="font-headline text-xl font-bold tracking-tight">
          {selectedCategory
            ? categoryDetails[selectedCategory].name
            : "FeatherNote"}
        </h1>
        <div className="relative ml-auto flex-1 md:grow-0">
          {selectedCategory && (
            <>
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search notes..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </>
          )}
        </div>
        <ThemeToggle />
        <Button onClick={() => setIsNewNoteDialogOpen(true)} className="gap-1">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New Note</span>
        </Button>
        <Button
          onClick={logout}
          variant="outline"
          size="icon"
          aria-label="Log out"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </header>

      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <NewNoteDialog
          isOpen={isNewNoteDialogOpen}
          setIsOpen={setIsNewNoteDialogOpen}
          onNoteCreate={addNote}
        />
        <EditNoteDialog
            isOpen={isEditNoteDialogOpen}
            setIsOpen={setIsEditNoteDialogOpen}
            note={editingNote}
            onNoteUpdate={updateNote}
        />
        {selectedCategory ? renderNotesGrid() : renderCategoryDirectories()}
      </main>
    </div>
  );
}
