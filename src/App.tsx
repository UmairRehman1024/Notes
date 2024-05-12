import { Textarea } from "@/components/ui/textarea";
import { useNotes } from "./hooks/useNotes";

import Sidebar from "./components/SideBar";
import Navbar from "./components/NavBar";
import AIInsights from "./components/AIInsights";


function App() {
  // type scoresWithID = {
  //   id: string;
  //   score: Number;
  // };

  const {
    notes,
    activeNoteContent,
    addNote,
    handleChange,
    activeNoteId,
    deleteNote,
    setActiveNoteData,
    updateNotes
  } = useNotes();



  return (
    <div className="flex-1 bg-slate-700 flex flex-row h-dvh   ">
      <div className="grid min-h-screen w-full grid-cols-[280px_1fr_280px] bg-gray-100 dark:bg-gray-950 dark:text-gray-50">
        <Sidebar
          addnote={addNote}
          notes={notes}
          deleteNote={deleteNote}
          setActiveNote={setActiveNoteData}
        />
        <div className="flex flex-col">
          {/* Navbar */}
          {!activeNoteId && <Navbar title={null} />}
          {activeNoteId && (
            <Navbar title={notes.get(activeNoteId)?.title || "Untitled"} />
          )}
          {/* Main text area */}
          <Textarea
            className="h-full resize-none bg-slate-900 "
            onChange={handleChange}
            value={activeNoteContent}
          />
        </div>
        <AIInsights
          notes={notes}
          activeNoteId={activeNoteId}
          setActiveNote={setActiveNoteData}
          activeNoteContent={activeNoteContent}
          updateNotes={updateNotes}
        />
      </div>
    </div>
  );

}

export default App;

