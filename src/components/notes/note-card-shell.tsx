"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import type { Note } from "@/lib/types";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface NoteCardShellProps {
  note: Note;
  onDelete: (id: string) => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export function NoteCardShell({
  note,
  onDelete,
  icon,
  children,
}: NoteCardShellProps) {
  const [formattedDate, setFormattedDate] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // This will only run on the client, after the initial render,
    // preventing the server/client mismatch.
    setFormattedDate(
      new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(note.timestamp))
    );
  }, [note.timestamp]);

  const handleEdit = () => {
    toast({
      title: "Edit Action",
      description: `Editing for "${note.title}" is a work in progress.`,
    });
  };

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-muted">
          {icon}
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg">{note.title}</CardTitle>
          <CardDescription>{formattedDate || <>&nbsp;</>}</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 -mr-2">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEdit}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => onDelete(note.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex-1">{children}</CardContent>
      {note.tags.length > 0 && (
        <CardFooter className="flex flex-wrap gap-1">
          {note.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </CardFooter>
      )}
    </Card>
  );
}
