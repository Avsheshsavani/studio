"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SimpleNote } from "@/lib/types";
import { useState } from "react";

interface SimpleNoteFormProps {
  onSave: (noteData: Partial<SimpleNote>) => void;
  note?: SimpleNote;
}

export default function SimpleNoteForm({ onSave, note }: SimpleNoteFormProps) {
  const isEditMode = !!note;
  const [title, setTitle] = useState(note?.title || "");
  const [body, setBody] = useState(note?.body || "");
  const [tags, setTags] = useState(note?.tags.join(", ") || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    onSave({
      title,
      body,
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="simple-title">Title</Label>
        <Input
          id="simple-title"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="simple-body">Body</Label>
        <Textarea
          id="simple-body"
          placeholder="Your note content..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="simple-tags">Tags (comma-separated)</Label>
        <Input
          id="simple-tags"
          placeholder="e.g. work, ideas, important"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full">
        {isEditMode ? "Save Changes" : "Create Note"}
      </Button>
    </form>
  );
}
