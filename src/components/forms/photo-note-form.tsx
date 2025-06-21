"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PhotoNote } from "@/lib/types";
import { UploadCloud } from "lucide-react";
import { useState } from "react";

interface PhotoNoteFormProps {
  onCreate: (note: PhotoNote) => void;
}

export default function PhotoNoteForm({ onCreate }: PhotoNoteFormProps) {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [fileName, setFileName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    const newNote: PhotoNote = {
      id: `note-${Date.now()}`,
      type: "photo",
      title,
      imageUrl: "https://placehold.co/600x400.png",
      imageHint: "abstract art",
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      timestamp: Date.now(),
    };
    onCreate(newNote);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="photo-title">Title</Label>
        <Input
          id="photo-title"
          placeholder="Photo note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Photo</Label>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloud className="w-8 h-8 mb-3 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              {fileName && <p className="text-xs text-muted-foreground">{fileName}</p>}
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
          </label>
        </div>
        <p className="text-xs text-muted-foreground">
          Image will be compressed on upload.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="photo-tags">Tags (comma-separated)</Label>
        <Input
          id="photo-tags"
          placeholder="e.g. travel, inspiration"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full">
        Create Photo Note
      </Button>
    </form>
  );
}
