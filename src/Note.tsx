import { useEffect, useState } from "react";
// import {
//   getNotes,
//   setNotes as setNotesOnLocalStorage,
// } from "./helpers/getFromLocalStorage";
import dayjs from "dayjs";
import { writeTextFile, readTextFile, removeFile } from "@tauri-apps/api/fs";
import { save } from "@tauri-apps/api/dialog";
import { Note, Plus, Trash } from "@phosphor-icons/react";
import { Textarea } from "@/components/ui/textarea";

const getNotes = () => {
    return JSON.parse(localStorage.getItem("simple_notes_app") || "");
  };
  
const setNotesOnLocalStorage = (newValue: string): void => {
    localStorage.setItem("simple_notes_app", newValue);
  };

function NotePage() {
  const [notes, setNotes] = useState<Array<Record<string, string>>>([]);
  const [activeNote, setActiveNote] = useState(0);
  const [activeNoteContent, setActiveNoteContent] = useState("");

  const updateNotes = (notes: Array<Record<string, string>>) => {
    setNotes([...notes]);
    setNotesOnLocalStorage(JSON.stringify(notes));
  };

  const deleteNote = async (noteID: number) => {
    await removeFile(notes[noteID].location);

    notes.splice(noteID, 1);
    // reason we used spread operator is because if we didn't,
    // it would send the same object reference and useState wasn't updating it
    updateNotes(notes);

    if (activeNote >= noteID) {
      setActiveNoteData(activeNote >= 1 ? activeNote - 1 : 0);
    }
  };

  const addNote = async () => {
    const savePath = await save();
    console.log("before save")
    if (!savePath) return;

    await writeTextFile(`${savePath}.txt`, "");

    const myNewNote = {
      title: "NewNote",
      created_at: `${dayjs().format("ddd, DD MMMM YYYY")} at ${dayjs().format(
        "hh:mm A"
      )}`,
      location: `${savePath}.txt`,
    };

    console.log(notes)
    updateNotes([{ ...myNewNote }, ...notes]);
    setActiveNote(0);
    setActiveNoteContent("");
  };

  const handleChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    if (notes.length === 0) return;

    const header = value.split(/\r?\n/)[0];
    if (notes.length !== 0 && notes[activeNote].title !== header) {
      notes[activeNote].title = header;
      updateNotes([...notes]);
    }

    setActiveNoteContent(value);
    writeTextFile(notes[activeNote].location, value);
  };

  const setActiveNoteData = async (index: number) => {
    setActiveNote(index);

    if (notes.length === 0) setActiveNoteContent("");
    else {
      const contents = await readTextFile(notes[index].location);
      setActiveNoteContent(contents);
    }
  };

  useEffect(() => {
    const getNotesFromStorage = async () => {
      const myNotes = await getNotes();

      setNotes(myNotes);
    };

    getNotesFromStorage();
  }, []);

  return (
    <div className="h-screen bg-slate-200 flex flex-row">
      <div className="w-1/4 py-5 pl-5 pr-2 h-full">
        <div className="container__left__header">
          <div className="flex flex-row justify-between border">
            <Note size={32} />
            <p className="text-3xl">My Notes</p>
          </div>
          <div className="flex flex-row " onClick={addNote}>
            <Plus size={32} />
            <p className="text-xl">New Note</p>
          </div>
        </div>
        <div className="bg-red-500 container h-full">
          {notes.map((item, index) => (
            <div
              key={`${item.title}_${index}`}
              className={`h-5 bg-blue-300 border flex flex-row ${
                index === activeNote && "active"
              }`}
              onClick={() => setActiveNoteData(index)}
            >
              <div className="container__left__content__row__left">
                <p className="container__left__content__row__left__title">
                  {item.title || "Untitled"}
                </p>
                <p className="container__left__content__row__left__date">
                  {item.created_at}
                </p>
              </div>

              
              <Trash size={32} onClick={() => deleteNote(index)}/>
            </div>
          ))}
        </div>
      </div>
      <div className="w-3/4 py-5 pr-5 pl-2 h-full ">
        <p className="container__right__date">
          {notes[activeNote]?.created_at}
        </p>
        {/* <textarea
          name="note_input"
          placeholder="Write Your Note Here"
          onChange={handleChange}
          value={activeNoteContent}
        ></textarea> */}
        <Textarea 
        name="note_input"
            className="h-full resize-none bg-slate-300"
            onChange={handleChange}
            value={activeNoteContent}
            />
      </div>
    </div>
  );
}

export default NotePage; 