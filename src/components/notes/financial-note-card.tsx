import type { FinancialNote } from "@/lib/types";
import { DollarSign, Download } from "lucide-react";
import { NoteCardShell } from "./note-card-shell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

interface FinancialNoteCardProps {
  note: FinancialNote;
  onDelete: (id: string) => void;
}

export default function FinancialNoteCard({
  note,
  onDelete,
}: FinancialNoteCardProps) {
  const { toast } = useToast();

  const total = note.transactions.reduce((sum, txn) => sum + txn.amount, 0);

  const handleExport = () => {
    // This is a simulated export
    console.log("Exporting to CSV:", note.transactions);
    toast({
      title: "Export Initiated",
      description: "Check the console for exported data.",
    });
  };

  return (
    <NoteCardShell
      note={note}
      onDelete={onDelete}
      icon={<DollarSign className="w-5 h-5 text-muted-foreground" />}
    >
      <div className="space-y-4">
        {note.transactions.length > 0 ? (
          <>
            <ScrollArea className="h-48">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {note.transactions.map((txn) => (
                    <TableRow key={txn.id}>
                      <TableCell className="font-medium">{txn.item}</TableCell>
                      <TableCell className="text-right">
                        ${txn.amount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="font-bold">Total:</span>
              <span className="font-bold text-lg">${total.toFixed(2)}</span>
            </div>
          </>
        ) : (
          <div className="text-center text-sm text-muted-foreground p-8">
            No transactions added yet.
          </div>
        )}
        <Button onClick={handleExport} variant="outline" size="sm" className="w-full gap-2">
            <Download className="w-4 h-4"/>
            Export as CSV
        </Button>
      </div>
    </NoteCardShell>
  );
}
