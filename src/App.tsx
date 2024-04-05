

import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash } from "@phosphor-icons/react";
import { useNotes } from "./hooks/useNotes"

function App() {
  const { notes, activeNote, activeNoteContent, deleteNote, addNote, handleChange, setActiveNoteData } = useNotes();

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
