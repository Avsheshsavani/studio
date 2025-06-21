
"use client";
import type { FinancialNote, Note } from "@/lib/types";
import { DollarSign, FileSearch } from "lucide-react";
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
import { useState } from "react";
import { FinancialNoteDetailDialog } from "./financial-note-detail-dialog";

interface FinancialNoteCardProps {
  note: FinancialNote;
  onDelete: (id: string) => void;
  onEdit: (note: Note) => void;
}

export default function FinancialNoteCard({
  note,
  onDelete,
  onEdit,
}: FinancialNoteCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const total = note.transactions.reduce((sum, txn) => sum + txn.amount, 0);

  return (
    <>
      <NoteCardShell
        note={note}
        onDelete={onDelete}
        onEdit={onEdit}
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
                          ₹{txn.amount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="font-bold">Total:</span>
                <span className="font-bold text-lg">₹{total.toFixed(2)}</span>
              </div>
            </>
          ) : (
            <div className="text-center text-sm text-muted-foreground p-8">
              No transactions added yet.
            </div>
          )}
          <Button
            onClick={() => setIsDetailOpen(true)}
            variant="outline"
            size="sm"
            className="w-full gap-2"
          >
            <FileSearch className="w-4 h-4" />
            View Details
          </Button>
        </div>
      </NoteCardShell>
      <FinancialNoteDetailDialog
        isOpen={isDetailOpen}
        setIsOpen={setIsDetailOpen}
        note={note}
      />
    </>
  );
}
