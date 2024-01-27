// src/services/notesService.ts

import { Note } from "../models/note";

import { v4 as uuidv4 } from "uuid";

export function generateUniqueId(): string {
  return uuidv4();
}

const notes: Note[] = []; // Replace with real database logic

export const notesService = {
  createNote: (title: string, body: string): Note => {
    const id = generateUniqueId(); // Replace with your ID generation logic
    const newNote = new Note(id, title, body);
    notes.push(newNote);
    return newNote;
  },

  getAllNotes: (): Note[] => {
    // Add database logic here
    return notes;
  },

  getNoteById: (id: string): Note | undefined => {
    const note = notes.find((note) => note.id === id);
    return note; // This will return undefined if no note is found
  },

  updateNote: (id: string, title: string, body: string): Note | undefined => {
    // Add database logic here
    const note = notes.find((note) => note.id === id);
    if (note) {
      note.title = title;
      note.body = body;
    }
    return note;
  },
  deleteNote: (id: string): void => {
    // Add database logic here
    const index = notes.findIndex((note) => note.id === id);
    if (index !== -1) {
      notes.splice(index, 1);
    }
  },
};
