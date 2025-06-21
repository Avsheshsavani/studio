"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { FinancialNote } from "@/lib/types";
import { UploadCloud, Loader2 } from "lucide-react";
import { useState } from "react";
import { analyzeBill } from "@/ai/flows/analyze-bill-flow";

interface FinancialNoteFormProps {
  onCreate: (note: FinancialNote) => void;
}

export default function FinancialNoteForm({ onCreate }: FinancialNoteFormProps) {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      // Clear title so it can be auto-filled by AI
      setTitle("");
    }
  };

  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file && !title) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please either upload a bill or provide a title.",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      let noteTitle = title;
      let transactions = [];
      let noteTimestamp = Date.now();

      if (file) {
        const photoDataUri = await fileToDataUri(file);
        const analysisResult = await analyzeBill({ photoDataUri });
        
        noteTitle = analysisResult.storeName || "Analyzed Bill";
        noteTimestamp = new Date(analysisResult.transactionDate).getTime() || Date.now();

        transactions = analysisResult.items.map((item, index) => ({
          id: `txn-${Date.now()}-${index}`,
          item: item.description,
          category: "Analyzed", // Default category for AI-extracted items
          amount: item.amount,
          date: noteTimestamp,
        }));

        toast({
          title: "Analysis Complete",
          description: `Extracted ${transactions.length} items from the bill.`,
        });
      }

      const newNote: FinancialNote = {
        id: `note-${Date.now()}`,
        type: "financial",
        title: noteTitle,
        tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        timestamp: noteTimestamp,
        transactions: transactions,
      };
      onCreate(newNote);
    } catch (error) {
      console.error("Failed to analyze bill:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Could not extract details from the bill. Please enter them manually or try another image.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label>Upload a Bill (Optional)</Label>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file-bill"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloud className="w-8 h-8 mb-3 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              {fileName && <p className="text-xs text-muted-foreground">{fileName}</p>}
            </div>
            <input id="dropzone-file-bill" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
          </label>
        </div>
        <p className="text-xs text-muted-foreground">
          If you upload a bill, we'll use AI to automatically fill in the details.
        </p>
      </div>

      <div className="relative flex items-center">
        <div className="flex-grow border-t border-muted"></div>
        <span className="flex-shrink mx-4 text-xs text-muted-foreground">OR</span>
        <div className="flex-grow border-t border-muted"></div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="financial-title">Title</Label>
        <Input
          id="financial-title"
          placeholder="e.g. Monthly Budget, Vacation Costs"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required={!file} // Title is required only if no file is uploaded
          disabled={!!file} // Disable if a file is uploaded to use AI title
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="financial-tags">Tags (comma-separated)</Label>
        <Input
          id="financial-tags"
          placeholder="e.g. budget, expenses, dmart"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isAnalyzing}>
        {isAnalyzing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing Bill...
          </>
        ) : (
          "Create Financial Note"
        )}
      </Button>
    </form>
  );
}
