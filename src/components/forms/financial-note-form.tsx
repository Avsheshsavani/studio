"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FinancialNote } from "@/lib/types";
import { useState } from "react";

interface FinancialNoteFormProps {
  onCreate: (note: FinancialNote) => void;
}

export default function FinancialNoteForm({ onCreate }: FinancialNoteFormProps) {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    const newNote: FinancialNote = {
      id: `note-${Date.now()}`,
      type: "financial",
      title,
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      timestamp: Date.now(),
      transactions: [],
    };
    onCreate(newNote);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
        <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
                You can add individual transactions after creating the financial note.
            </p>
        </div>
      <div className="space-y-2">
        <Label htmlFor="financial-title">Title</Label>
        <Input
          id="financial-title"
          placeholder="e.g. Monthly Budget, Vacation Costs"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="financial-tags">Tags (comma-separated)</Label>
        <Input
          id="financial-tags"
          placeholder="e.g. budget, expenses"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full">
        Create Financial Note
      </Button>
    </form>
  );
}
