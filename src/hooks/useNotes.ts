import { useEffect, useState } from "react";
import { readTextFile, removeFile, writeTextFile } from "@tauri-apps/api/fs";
import { save } from "@tauri-apps/api/dialog";
import dayjs from "dayjs";

export interface Note {
  title: string;
  created_at: string;
  location: string;
}

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<number>(0);
  const [activeNoteContent, setActiveNoteContent] = useState<string>("");

  useEffect(() => {
    const getNotesFromStorage = async () => {
      const myNotes = JSON.parse(localStorage.getItem("simple_notes_app") || "[]") as Note[];
      setNotes(myNotes);
    };

    getNotesFromStorage();
  }, []);

  const updateNotes = (updatedNotes: Note[]) => {
    setNotes(updatedNotes);
    localStorage.setItem("simple_notes_app", JSON.stringify(updatedNotes));
  };

  const deleteNote = async (noteID: number) => {
    await removeFile(notes[noteID].location);

    const updatedNotes = [...notes];
    updatedNotes.splice(noteID, 1);
    updateNotes(updatedNotes);

    if (activeNote >= noteID) {
      setActiveNote(activeNote >= 1 ? activeNote - 1 : 0);
    }
  };

  const addNote = async () => {
    try {
      const filePath = await save({
        filters: [{
          name: "Note",
          extensions: ['txt']
        }]
      });

      if (!filePath) return;

      await writeTextFile({ contents: "Content of note file", path: filePath });

      const myNewNote: Note = {
        title: "NewNote",
        created_at: `${dayjs().format("ddd, DD MMMM YYYY")} at ${dayjs().format("hh:mm A")}`,
        location: filePath,
      };

      updateNotes([{ ...myNewNote }, ...notes]);
      setActiveNote(0);
      setActiveNoteContent("");

    } catch (e) {
      console.log(e);
    }
  };

  const setActiveNoteData = async (index: number) => {
    setActiveNote(index);

    if (notes.length === 0) setActiveNoteContent("");
    else {
      try {
        const contents = await readTextFile(notes[index].location);
        setActiveNoteContent(contents);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleChange = ({ target: { value } }: { target: { value: string } }) => {
    if (notes.length === 0) return;

    const header = value.split(/\r?\n/)[0];
    if (notes.length !== 0 && notes[activeNote].title !== header) {
      notes[activeNote].title = header;
      updateNotes([...notes]);
    }

    setActiveNoteContent(value);
    writeTextFile(notes[activeNote].location, value);
  };

  return { notes, activeNote, activeNoteContent, deleteNote, addNote, handleChange, setActiveNoteData };
};

