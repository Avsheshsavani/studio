import { db, auth } from '@/lib/firebase-config';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy, DocumentData, serverTimestamp } from 'firebase/firestore';
import type { Note } from '@/lib/types';

const notesCollection = (uid: string) => collection(db, 'users', uid, 'notes');

// Helper to convert Firestore doc to Note object
const fromFirestore = (doc: DocumentData): Note => {
  const data = doc.data();
  // Firestore timestamps need to be converted to JS numbers
  const timestamp = data.timestamp?.toMillis ? data.timestamp.toMillis() : data.timestamp;
  return { id: doc.id, ...data, timestamp } as Note;
};

export async function getNotes(): Promise<Note[]> {
    const user = auth.currentUser;
    if (!user) {
        console.error("User not authenticated, but getNotes was called.");
        return [];
    };

    const q = query(notesCollection(user.uid), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(fromFirestore);
}

export async function addNote(noteData: Omit<Note, 'id'>): Promise<Note> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const docRef = await addDoc(notesCollection(user.uid), {
        ...noteData,
        // Use server timestamp for consistency
        timestamp: serverTimestamp() 
    });
    
    // We don't get the server timestamp back immediately, so we'll use client time for the immediate UI update.
    // The correct time will be loaded on the next fetch.
    return {
        id: docRef.id,
        ...noteData,
        timestamp: Date.now() 
    } as Note;
}

export async function updateNote(note: Note): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const { id, ...noteData } = note;
    const noteRef = doc(db, 'users', user.uid, 'notes', id);
    
    await updateDoc(noteRef, {
        ...noteData,
        timestamp: serverTimestamp()
    });
}

export async function deleteNote(noteId: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const noteRef = doc(db, 'users', user.uid, 'notes', noteId);
    await deleteDoc(noteRef);
}
