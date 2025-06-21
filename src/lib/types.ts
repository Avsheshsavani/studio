export type NoteType = "simple" | "protected" | "photo" | "financial";

export interface BaseNote {
  id: string;
  type: NoteType;
  title: string;
  timestamp: number;
  tags: string[];
}

export interface SimpleNote extends BaseNote {
  type: "simple";
  body: string;
}

export interface ProtectedNote extends BaseNote {
  type: "protected";
  body: string; // This would be encrypted in a real app
}

export interface PhotoNote extends BaseNote {
  type: "photo";
  imageUrl: string;
  imageHint?: string;
}

export interface FinancialTransaction {
  id: string;
  item: string;
  category: string;
  amount: number;
  date: number;
}

export interface FinancialNote extends BaseNote {
  type: "financial";
  transactions: FinancialTransaction[];
}

export type Note = SimpleNote | ProtectedNote | PhotoNote | FinancialNote;
