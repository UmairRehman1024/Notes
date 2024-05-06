import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash } from "@phosphor-icons/react";
import { useNotes, Note } from "./hooks/useNotes";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import OpenAI from "openai";
import { HfInference } from "@huggingface/inference";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {
  LocalDocumentIndex,
  LocalIndex,
  MetadataTypes,
  QueryResult,
} from "vectra";
import path from "path";
import { appLocalDataDir } from "@tauri-apps/api/path";

import * as lancedb from "vectordb";
import { QdrantClient } from "@qdrant/js-client-rest";

import {
  Pinecone,
  PineconeRecord,
  QueryResponse,
  RecordMetadata,
  ScoredPineconeRecord,
} from "@pinecone-database/pinecone";
import Sidebar from "./components/SideBar";
import Navbar from "./components/NavBar";
import AIInsights from "./components/AIInsights";

const getIndexFromId = (map: Map<string, Note>, id: string | null): number => {
  let index = 0;
  for (const [key, _] of map.entries()) {
    if (key === id) {
      return index;
    }
    index++;
  }
  // Return -1 if the ID is not found
  return -1;
};

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

  //   const client = new QdrantClient({
  //     url:  import.meta.env.VITE_QDRANT_URL,
  //     apiKey:  import.meta.env.VITE_QRANT_API_KEY,
  // })
  // let index: LocalIndex;

  // useEffect(() => {
  //   const getLocalIndex = async () => {
  //     index = new LocalIndex(await appLocalDataDir())
  //     console.log("index: " + index)
  //   };

  //   getLocalIndex();
  // }, []);

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

  {
    /* SideBar
      <div className="w-1/4 pl-5 pr-2 ">
        <div className="bg-slate-500 rounded-lg h-full ">
          <h1 className="text-3xl text-center">Notes</h1>
          <div
            className="hover:bg-slate-400 hover:cursor-pointer rounded flex flex-row px-3"
            onClick={addNote}
          >
            <Plus size={32} />
            <p className="text-xl">New Note</p>
          </div>

          <ScrollArea className="h-[85%] ">
            <div className="px-2">
              {[...notes.entries()].map((item) => (
                <div
                  key={item[0]}
                  className={`flex flex-row justify-between rounded ${
                    item[0] === activeNoteId && "bg-slate-400"
                  } `}
                  onClick={() => setActiveNoteData(item[0])}
                >
                  <div className="md:w-32 lg:w-44 xl:w-60 ">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="text-nowrap text-ellipsis overflow-hidden whitespace-nowrap">
                            {item[1].title || "Untitled"}
                          </p>
                        </TooltipTrigger>
                        <TooltipContent className="bg-slate-100">
                          <p className="font-normal">{item[1].title}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="text-sm font-light text-nowrap text-ellipsis overflow-hidden whitespace-nowrap">
                            {item[1].created_at}
                          </p>
                        </TooltipTrigger>
                        <TooltipContent className="bg-slate-200">
                          <p>{item[1].created_at}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center ">
                    <Trash
                      size={32}
                      className="cursor-pointer"
                      onClick={() => deleteNote(item[0])}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main */
  }
  //     <div className="w-1/2  px-2  h-screen ">
  //       <Textarea
  //         className="h-full resize-none bg-slate-300"
  //         onChange={handleChange}
  //         value={activeNoteContent}
  //       />
  //     </div>

  //     {/* AI section */}
  //     <div className="w-1/4 h-screen px-2  ">
  //       <div className="bg-slate-500 h-full rounded ">
  //         <p className="text-center">AI Stuff</p>
  //         <div className="flex flex-col justify-center">
  //           <Button
  //             className="border"
  //             variant={"default"}
  //             onClick={handleSummarise}
  //             disabled={!activeNoteId}
  //           >
  //             Summarise
  //           </Button>
  //           <div className="flex justify-center">
  //             <ClipLoader
  //               className=""
  //               loading={summaryLoading}
  //               size={64}
  //               aria-label="Loading Spinner"
  //             />
  //           </div>

  //           {summary && (
  //             <Textarea
  //               className="bg-slate-400"
  //               readOnly
  //               value={summary?.toString()}
  //             ></Textarea>
  //           )}

  //           <Button className=" border"
  //           onClick={handleSimilarNotes}
  //           disabled={!activeNoteId}>
  //             Get Similar Notes
  //           </Button>
  //           <div className="flex justify-center">
  //             <ClipLoader
  //               className=""
  //               loading={similarLoading}
  //               size={64}
  //               aria-label="Loading Spinner"
  //             />
  //           </div>

  //           {similarNotes &&
  //             similarNotes.map((note) => (
  //               <div
  //                 key={note.id}
  //                 onClick={() => setActiveNoteData(note.id)}
  //                 className="w-fit cursor-pointer border shadow bg-slate-300"
  //               >
  //                 {notes.get(note.id)?.title}
  //               </div>
  //             ))}

  //           <Button className=" border"
  //           onClick={handleSimilarNotesEmbedding}
  //           disabled={!activeNoteId}>
  //             Get Similar Notes using Embeddings
  //           </Button>
  //           <div className="flex justify-center">
  //             <ClipLoader
  //               className=""
  //               loading={similarEmbeddingLoading}
  //               size={64}
  //               aria-label="Loading Spinner"
  //             />
  //           </div>

  //           {similarNotesEmbedding &&
  //             similarNotesEmbedding.matches.map((note) => (
  //               <div
  //                 key={note.id}
  //                 onClick={() => setActiveNoteData(note.id.toString())}
  //                 className="w-fit cursor-pointer border shadow bg-slate-300"
  //               >
  //                 {notes.get(note.id.toString())?.title}
  //               </div>
  //             ))}

  //             <Button className=" border "
  //             onClick={handleTags}
  //             disabled={!activeNoteId}>
  //               Get Tags
  //             </Button>
  //             <div className="flex justify-center">
  //               <ClipLoader
  //                 className=""
  //                 loading={tagsLoading}
  //                 size={64}
  //                 aria-label="Loading Spinner"
  //               />
  //             </div>
  //             <div className="pt-3 flex flex-wrap gap-2">
  //               {displayTags()}
  //             </div>

  //         </div>
  //       </div>
  //     </div>
  //   </div> */}
  // );
}

export default App;

// import {QdrantClient} from '@qdrant/js-client-rest';

// const client = new QdrantClient({
//     url: 'https://986bc467-94c2-4d5b-98d2-846979f91558.us-east4-0.gcp.cloud.qdrant.io:6333',
//     apiKey: 'iXswECqM_XvEx9jd972fpcur325xMm0jLAhBeBUZOdmvYwbqFDLJbA',
// });
