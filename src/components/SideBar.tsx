// Import necessary dependencies and icons
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Plus, Trash } from "@phosphor-icons/react"; // Assuming icons are stored in a separate file
import { Note} from "../hooks/useNotes";

// Sidebar component
function Sidebar(props: {addnote: () => Promise<void>, notes:  Map<string, Note>, deleteNote : (noteID: string) => Promise<void>, setActiveNote: (id: string) => Promise<void>}) {

  return (
    <div className="border-r bg-white px-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex h-full max-h-screen flex-col gap-4">
        <div className="flex h-[60px] items-center justify-between">
          {/* Sidebar header */}
          <a className="flex items-center gap-2 font-semibold text-gray-50" href="#">
            <FileText className="h-6 w-6" />
            <span>Notes</span>
          </a>
          {/* Button for creating a new note */}
          <Button size="icon" variant="ghost" onClick={props.addnote}>
            <Plus className="h-5 w-5" />
            <span className="sr-only">New Note</span>
          </Button>
        </div>
        {/* Sidebar navigation links */}

        {!props.notes && <p className="text-center">No notes to show </p>}
        <ScrollArea className="h-[85%] ">

        <nav className="grid gap-2">
            {props.notes && [...props.notes.entries()].map((item) => (<NotePreview key={item[0]} id={item[0]} note={item[1]} setActiveNote={props.setActiveNote} deleteNote={props.deleteNote}/>))}
        </nav>
        </ScrollArea>

      </div>
    </div>
  );
}

// Export Sidebar component
export default Sidebar;


function NotePreview(props: {id:string, note: Note,deleteNote : (noteID: string) => Promise<void>,setActiveNote: (id: string) => Promise<void> }) {

    return (
    <div
      className=" flex  items-center justify-between rounded-md bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
      onClick={() => props.setActiveNote(props.id)}
    >
      {/* <FileText className="h-4 w-4" /> */}
      <span >{props.note.title}</span>
      <div>
        <Trash
        className="cursor-pointer h-4 w-4 "
        onClick={() => props.deleteNote(props.id)}
        />
      </div>
      
    </div>
    )
}


// <div className="w-1/4 pl-5 pr-2 ">
//         <div className="bg-slate-500 rounded-lg h-full ">
//           <h1 className="text-3xl text-center">Notes</h1>
//           <div
//             className="hover:bg-slate-400 hover:cursor-pointer rounded flex flex-row px-3"
//             onClick={addNote}
//           >
//             <Plus size={32} />
//             <p className="text-xl">New Note</p>
//           </div>

//           <ScrollArea className="h-[85%] ">
//             <div className="px-2">
//               {[...notes.entries()].map((item) => (
//                 <div
//                   key={item[0]}
//                   className={`flex flex-row justify-between rounded ${
//                     item[0] === activeNoteId && "bg-slate-400"
//                   } `}
//                   onClick={() => setActiveNoteData(item[0])}
//                 >
//                   <div className="md:w-32 lg:w-44 xl:w-60 ">
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <p className="text-nowrap text-ellipsis overflow-hidden whitespace-nowrap">
//                             {item[1].title || "Untitled"}
//                           </p>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-slate-100">
//                           <p className="font-normal">{item[1].title}</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>

//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <p className="text-sm font-light text-nowrap text-ellipsis overflow-hidden whitespace-nowrap">
//                             {item[1].created_at}
//                           </p>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-slate-200">
//                           <p>{item[1].created_at}</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                   </div>
//                   <div className="flex items-center ">
//                     <Trash
//                       size={32}
//                       className="cursor-pointer"
//                       onClick={() => deleteNote(item[0])}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </ScrollArea>
//         </div>
//       </div>