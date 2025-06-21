"use client";

import type { ProtectedNote } from "@/lib/types";
import { Lock, Unlock, ShieldAlert } from "lucide-react";
import { NoteCardShell } from "./note-card-shell";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

interface ProtectedNoteCardProps {
  note: ProtectedNote;
  onDelete: (id: string) => void;
}

export default function ProtectedNoteCard({
  note,
  onDelete,
}: ProtectedNoteCardProps) {
  const [isLocked, setIsLocked] = useState(true);
  const [passkey, setPasskey] = useState("");
  const { toast } = useToast();

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would involve decryption.
    // Here we just check a dummy password.
    if (passkey === "password") {
      setIsLocked(false);
      toast({ title: "Note unlocked successfully." });
    } else {
      toast({
        variant: "destructive",
        title: "Incorrect Passkey",
        description: "The passkey you entered is incorrect.",
      });
    }
  };

  return (
    <NoteCardShell
      note={note}
      onDelete={onDelete}
      icon={
        isLocked ? (
          <Lock className="w-5 h-5 text-muted-foreground" />
        ) : (
          <Unlock className="w-5 h-5 text-muted-foreground" />
        )
      }
    >
      {isLocked ? (
        <form
          onSubmit={handleUnlock}
          className="space-y-3 p-4 bg-muted/50 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-500" />
            <p className="text-sm font-medium">This note is protected.</p>
          </div>
          <Input
            type="password"
            placeholder="Enter passkey to unlock"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
          />
          <Button type="submit" size="sm" className="w-full">
            Unlock
          </Button>
        </form>
      ) : (
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
          {note.body}
        </p>
      )}
    </NoteCardShell>
  );
}
