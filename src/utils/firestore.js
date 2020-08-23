import db from "../firebase";

export const saveNote = async (note) => {
  await db
    .collection("notebooks")
    .doc(note.notebook)
    .collection("notes")
    .doc(note.id)
    .set({ ...note }, { merge: true });
};

export const addNote = async (notebook, newNote) =>
  await db
    .collection(`notebooks/${notebook}/notes`)
    .doc(newNote.id)
    .set(newNote);

export const deleteNote = async (notebook, noteId) => {
  await db.collection(`notebooks/${notebook}/notes`).doc(noteId).delete();
};

export const deleteNotebook = async (notebook) => {
  await db.collection("notebooks").doc(notebook).delete();
};

export const addNotebook = async (name) =>
  await db.collection("notebooks").doc(name).set({ name });

export const updateNoteFromDb = async (note, data) =>
  await db
    .collection("notebooks")
    .doc(note.notebook)
    .collection("notes")
    .doc(note.id)
    .set({ ...data }, { merge: true });
