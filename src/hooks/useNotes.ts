import { useEffect, useState } from "react";
import { readTextFile, removeFile, writeTextFile } from "@tauri-apps/api/fs";
import { save } from "@tauri-apps/api/dialog";
import dayjs from "dayjs";

import { v4 as uuidv4 } from 'uuid';

export interface Note {
  id: string
  title: string;
  created_at: string;
  location: string;
  content: string;
  tags: string[]
  summary: string
}





export const useNotes = () => {

  // new Map<string, number>
  const [notes, setNotes] = useState<Map<string, Note>>(new Map<string, Note>);

  // const [notes, setNotes] = useState<{ [id: string]: Note }>({});
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [activeNoteContent, setActiveNoteContent] = useState<string>("");

  useEffect(() => {
    const getNotesFromStorage = async () => {
      const storedNotes  = JSON.parse(localStorage.getItem("simple_notes_app") || "[]") as { [id: string]: Note };
      const notesMap = new Map<string, Note>(Object.entries(storedNotes ));
      setNotes(notesMap);
    };

    getNotesFromStorage();
  }, []);

  const updateNotes = (updatedNotes: Map<string, Note>) => {

    if (!(updatedNotes instanceof Map)) {
      console.error("updatedNotes is not a Map object.");
      return;
    }
    const serializedNotes: { [id: string]: Note } = {};
    updatedNotes.forEach((value, key) => {
      serializedNotes[key] = value;
    });
    setNotes(updatedNotes);
    localStorage.setItem("simple_notes_app", JSON.stringify(serializedNotes));
  };

  const deleteNote = async (noteID: string) => {
    if (!notes.has(noteID)) return;

    const updatedNotes = new Map(notes);
    const deletedNote = updatedNotes.get(noteID);
    if (deletedNote) {
      await removeFile(deletedNote.location);
      updatedNotes.delete(noteID);
      updateNotes(updatedNotes);

      if (activeNoteId === noteID) {
        setActiveNoteId(null);
        setActiveNoteContent("");
      }
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

      console.log(filePath)

      const title = removeTextAfterLastDot(getStringAfterLastBackslash(filePath))  

      const id = uuidv4()

      // await writeTextFile({ contents: "Content of note file", path: filePath });

      const myNewNote: Note = {
        id,
        title,
        created_at: `${dayjs().format("ddd, DD MMMM YYYY")} at ${dayjs().format("hh:mm A")}`,
        location: filePath,
        content: "",
        tags : [],
        summary: ""
      };

      const updatedNotes = new Map(notes)
      updatedNotes.set(id, myNewNote)

      updateNotes(updatedNotes);
      setActiveNoteId(id);
      
      setActiveNoteContent("");

    } catch (e) {
      console.log(e);
    }
  };

  const setActiveNoteData = async (id: string) => {
    setActiveNoteId(id);
    

    const activeNote = notes.get(id)

    if (!activeNote) {
      setActiveNoteContent("");
      return;
    }



    try {
      const contents = await readTextFile(activeNote.location);
      setActiveNoteContent(contents);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = async ({ target: { value } }: { target: { value: string } }) => {
    if (!activeNoteId) return;
  
    const activeNote = notes.get(activeNoteId);
    if (!activeNote) return;
  
    activeNote.content = value;
  
    const updatedNotes = new Map(notes);
    updatedNotes.set(activeNoteId, activeNote);
  
    updateNotes(updatedNotes);
    setActiveNoteContent(value);
  
    try {
      await writeTextFile(activeNote.location, value);
    } catch (error) {
      console.error("Error writing file:", error);
    }
  };



  const getAllNotes = async() => {
    if (notes.size == 0) throw new Error("notes is empty or is being added from storage");
    let allNotes: string[] = []
    try {
      notes.forEach(async (note) => {
        if (note.id != activeNoteId) 
        {
          allNotes.push( await readTextFile(note.location))
        }
      })
    } catch (error) {
      console.error(error)
    } finally{
      return allNotes
    }
    

    

  }


  function getStringAfterLastBackslash(str: string): string {
    const lastBackslashIndex = str.lastIndexOf("\\");
    if (lastBackslashIndex !== -1) {
        return str.substring(lastBackslashIndex + 1);
    }
    return str; // If no backslash is found, return the original string
  } 

  function removeTextAfterLastDot(str: string): string {
    const lastDotIndex = str.lastIndexOf(".");
    if (lastDotIndex !== -1) {
        return str.substring(0, lastDotIndex);
    }
    return str; // If no dot is found, return the original string
}

  return { notes, updateNotes,  activeNoteId, activeNoteContent, deleteNote, addNote, handleChange, setActiveNoteData, getAllNotes};
};

