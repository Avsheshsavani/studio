"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ProtectedNote } from "@/lib/types";
import { useState } from "react";

interface ProtectedNoteFormProps {
  onSave: (noteData: Partial<ProtectedNote>) => void;
  note?: ProtectedNote;
}

export default function ProtectedNoteForm({ onSave, note }: ProtectedNoteFormProps) {
  const isEditMode = !!note;
  const [title, setTitle] = useState(note?.title || "");
  const [body, setBody] = useState(note?.body || "");
  const [passkey, setPasskey] = useState("");
  const [tags, setTags] = useState(note?.tags.join(", ") || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    if (!isEditMode && !passkey) {
        // Passkey is required for new notes
        alert("Passkey is required to create a protected note.");
        return;
    }
    
    onSave({
      title,
      body,
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          placeholder={isEditMode ? "Enter passkey to re-encrypt/save" : "Enter a passkey to encrypt"}
          value={passkey}
          onChange={(e) => setPasskey(e.target.value)}
          required={!isEditMode}
        />
         <p className="text-xs text-muted-foreground">
            {isEditMode 
            ? "Leave blank to keep existing encryption. Enter a new passkey to re-encrypt."
            : "Uses AES encryption with a key derived from your passkey (PBKDF2)."}
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
        {isEditMode ? "Save Changes" : "Create Protected Note"}
      </Button>
    </form>
  );
}
