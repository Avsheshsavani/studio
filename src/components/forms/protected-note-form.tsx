"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ProtectedNote } from "@/lib/types";
import { useState } from "react";

interface ProtectedNoteFormProps {
  onCreate: (note: ProtectedNote) => void;
}

export default function ProtectedNoteForm({ onCreate }: ProtectedNoteFormProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [passkey, setPasskey] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !passkey) return;
    const newNote: ProtectedNote = {
      id: `note-${Date.now()}`,
      type: "protected",
      title,
      body,
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      timestamp: Date.now(),
    };
    onCreate(newNote);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="protected-title">Title</Label>
        <Input
          id="protected-title"
          placeholder="Protected note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
       <div className="space-y-2">
        <Label htmlFor="protected-passkey">Passkey</Label>
        <Input
          id="protected-passkey"
          type="password"
          placeholder="Enter a passkey to encrypt"
          value={passkey}
          onChange={(e) => setPasskey(e.target.value)}
          required
        />
         <p className="text-xs text-muted-foreground">
            Uses AES encryption with a key derived from your passkey (PBKDF2).
          </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="protected-body">Body</Label>
        <Textarea
          id="protected-body"
          placeholder="Your secret note content..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="protected-tags">Tags (comma-separated)</Label>
        <Input
          id="protected-tags"
          placeholder="e.g. private, work"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full">
        Create Protected Note
      </Button>
    </form>
  );
}
