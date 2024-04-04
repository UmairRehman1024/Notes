
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { readTextFile, removeFile, writeTextFile } from "@tauri-apps/api/fs";
import dayjs from "dayjs";
import {save } from "@tauri-apps/api/dialog";

const getNotes = () => {
  return JSON.parse(localStorage.getItem("simple_notes_app") || "");
};

const setNotesOnLocalStorage = (newValue: string): void => {
  localStorage.setItem("simple_notes_app", newValue);
};

function App() {

  const [notes, setNotes] = useState<Array<Record<string, string>>>([]);
  const [activeNote, setActiveNote] = useState(0);
  const [activeNoteContent, setActiveNoteContent] = useState("");

  const updateNotes = (notes: Array<Record<string, string>>) => {
    setNotes([...notes]);
    setNotesOnLocalStorage(JSON.stringify(notes));
  };

  const deleteNote = async (noteID: number) => {
    await removeFile(notes[noteID].location);
    console.log("before: " + notes)
    notes.splice(noteID, 1);
    console.log("after: " + notes)
    // reason we used spread operator is because if we didn't,
    // it would send the same object reference and useState wasn't updating it
    updateNotes(notes);

    if (activeNote >= noteID) {
      setActiveNoteData(activeNote >= 1 ? activeNote - 1 : 0);
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

      if (!filePath) return

      await writeTextFile({contents: "Content of note file", path: filePath});

      const myNewNote = {
            title: "NewNote",
            created_at: `${dayjs().format("ddd, DD MMMM YYYY")} at ${dayjs().format(
              "hh:mm A"
            )}`,
            location: filePath,
          };

      console.log(notes)
      updateNotes([{ ...myNewNote }, ...notes]);
      setActiveNote(0);
      setActiveNoteContent("");

    } catch (e) {
        console.log(e);
    }
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
      try {
        const contents = await readTextFile(notes[index].location);
        setActiveNoteContent(contents);
      } catch (err) {
        console.error(err);
      }
      
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
    <div className="h-screen bg-slate-700 flex flex-row">

      {/* SideBar */}
      <div className="w-1/4 py-5 pl-5 pr-2 h-full">
        <div className="bg-slate-600 rounded-lg h-full ">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl  ">Notes</h1>
            <div className="hover:bg-slate-500 hover:cursor-pointer rounded flex flex-row px-3" onClick={addNote}>
             <Plus size={32}/>
             <p className="text-xl">New Note</p>
            </div>
            <div className="container h-full px-2">
            {notes.map((item, index) => (
              <div
                key={`${item.title}_${index}`}
                className={`flex flex-row rounded ${
                  index === activeNote && "bg-slate-500"
                }`}
                onClick={() => setActiveNoteData(index)}
              >
                <div className="">
                  <p className="">
                    {item.title || "Untitled"}
                  </p>
                  <p className="text-sm  text-">
                    {item.created_at}
                  </p>
                </div>

                <div className="flex items-center">

                  <Trash size={32} className="cursor-pointer" onClick={() => deleteNote(index)}/>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="w-3/4 py-5 pr-5 pl-2 h-full">
        <Textarea className="h-full resize-none bg-slate-300"
        onChange={handleChange}
        value={activeNoteContent}/>

      </div>
    </div>

      
  );
}

export default App;
