"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Folder, Lock } from "lucide-react";
import type { NoteType } from "@/lib/types";

const categoryDetails: Record<NoteType, { name: string }> = {
  simple: { name: "Simple Notes" },
  photo: { name: "Photo Notes" },
  protected: { name: "Protected Notes" },
  financial: { name: "Financial Notes" },
};

interface CategoryDirectoryProps {
  category: NoteType;
  noteCount: number;
  onClick: () => void;
  isLocked?: boolean;
}

export function CategoryDirectory({
  category,
  noteCount,
  onClick,
  isLocked,
}: CategoryDirectoryProps) {
  const details = categoryDetails[category];

  return (
    <Card
      className="cursor-pointer transition-shadow hover:shadow-lg"
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-muted">
          {isLocked ? (
            <Lock className="h-6 w-6 text-primary" />
          ) : (
            <Folder className="h-6 w-6 text-primary" />
          )}
        </div>
        <div className="flex-1">
          <CardTitle>{details.name}</CardTitle>
          <CardDescription>
            {noteCount} note{noteCount !== 1 ? "s" : ""}
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
