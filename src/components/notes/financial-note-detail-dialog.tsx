
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { FinancialNote } from "@/lib/types";

interface FinancialNoteDetailDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  note: FinancialNote;
}

export function FinancialNoteDetailDialog({
  isOpen,
  setIsOpen,
  note,
}: FinancialNoteDetailDialogProps) {
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [formattedTransactions, setFormattedTransactions] = useState<any[]>([]);

  const total = note.transactions.reduce((sum, txn) => sum + txn.amount, 0);
  
  useEffect(() => {
    if (isOpen) {
        setFormattedTransactions(note.transactions.map(txn => ({
            ...txn,
            formattedDate: new Date(txn.date).toLocaleDateString()
        })))
    }
  }, [isOpen, note.transactions])


  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{note.title}</DialogTitle>
            <DialogDescription>
              Detailed view of your financial note.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {note.transactions.length > 0 ? (
              <>
                <ScrollArea className="h-64">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formattedTransactions.map((txn) => (
                        <TableRow key={txn.id}>
                          <TableCell className="font-medium">
                            {txn.item}
                          </TableCell>
                          <TableCell>{txn.category}</TableCell>
                          <TableCell>{txn.formattedDate}</TableCell>
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
                  <span className="font-bold text-lg">
                    ₹{total.toFixed(2)}
                  </span>
                </div>
              </>
            ) : (
              <p className="py-8 text-center text-muted-foreground">No transactions available.</p>
            )}
            {note.receiptImageUrl && (
              <Button
                onClick={() => setIsImagePreviewOpen(true)}
                variant="secondary"
                className="w-full"
              >
                View Uploaded Photo
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {note.receiptImageUrl && (
        <Dialog
          open={isImagePreviewOpen}
          onOpenChange={setIsImagePreviewOpen}
        >
          <DialogContent className="max-w-4xl h-[90vh]">
            <DialogHeader>
              <DialogTitle>Receipt Preview</DialogTitle>
            </DialogHeader>
            <div className="relative h-full">
              <Image
                src={note.receiptImageUrl}
                alt="Receipt"
                fill
                className="object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
