// Import necessary dependencies and icons
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { X } from "@phosphor-icons/react"; // Assuming icons are stored in a separate file
import { Button } from "@/components/ui/button";
import { Note } from "src/hooks/useNotes";
import { useSimilarNotes } from "../hooks/useSimilarNotes";
import ClipLoader from "react-spinners/ClipLoader";
import OpenAI from "openai";
import { useSummary } from "..//hooks/useSummary";
import { useTags } from "../hooks/useTags";
import { ScrollArea } from "@/components/ui/scroll-area";

// AI Insights component
function AIInsights(props: {
  notes: Map<string, Note>;
  activeNoteId: string | null;
  setActiveNote: (id: string) => Promise<void>;
  activeNoteContent: string;
  updateNotes: (updatedNotes: Map<string, Note>) => void
}) {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_KEY,
    dangerouslyAllowBrowser: true,
  });

  const { summary, summaryLoading, handleSummarise } = useSummary({
    activeNoteContent: props.activeNoteContent,
  });
  const { similarNotes, similarNotesLoading, handleSimilarNotes } =
    useSimilarNotes({ openai });
  const { handleTags, tagsLoading } = useTags();

  // const displayTags = () => {
  //   if (!props.activeNoteId) return;
  //   const activeNote = props.notes.get(props.activeNoteId);
  //   if (!activeNote) throw new Error("No note found at active note id");

  //   return (
  //     activeNote.tags &&
  //     activeNote.tags.map((tag) => (
  //       <div className="w-fit px-1 rounded-lg  bg-slate-400 border">
  //         <p className="text-center text-sm font-medium">{tag}</p>
  //       </div>
  //     ))
  //   );
  // };

  if (!props.activeNoteId)
    return (
      <div className="border-l bg-white px-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex h-full max-h-screen flex-col gap-4 ">
          <div className="flex h-[60px] items-center justify-center ">
            {/* AI Insights title */}
            <h2 className="text-lg font-medium dark:text-gray-50 text-center">
              AI Insights
            </h2>
          </div>
          <div>
            <div className="text-center">No active id found</div>
          </div>
        </div>
      </div>
    );
  const activeNote = props.notes.get(props.activeNoteId);

  if (!activeNote) {
    return (
      <div className="border-l bg-white px-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex h-full max-h-screen flex-col gap-4">
          <div className="flex h-[60px] items-center justify-between">
            {/* AI Insights title */}
            <h2 className="text-lg font-medium dark:text-gray-50">
              AI Insights
            </h2>
            {/* Button to close AI Insights */}
            <Button size="icon" variant="ghost">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
            {/* <Button/> */}
            <div>No active Note found</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-l bg-white px-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex h-full max-h-screen flex-col gap-4">
        <div className="flex h-[60px] items-center justify-between">
          {/* AI Insights title */}
          <h2 className="text-lg font-medium dark:text-gray-50">AI Insights</h2>
          {/* Button to close AI Insights */}
          <Button size="icon" variant="ghost">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
          {/* <Button/> */}
        </div>
        <ScrollArea className="flex-1 overflow-auto">
          <div className="space-y-6">
            {/* Summary card */}
            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {!summary && !summaryLoading && (
                  <Button
                    disabled={!props.activeNoteId}
                    onClick={handleSummarise}
                  >
                    Get Summary
                  </Button>
                )}
                {summaryLoading && <ClipLoader />}
                {summary && <p>{summary}</p>}
              </CardContent>
            </Card>
            {/* Similar notes card */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Notes</CardTitle>
              </CardHeader>
              <CardContent>
                {!similarNotes && !similarNotesLoading && (
                  <Button
                    disabled={!props.activeNoteId}
                    onClick={() =>
                      handleSimilarNotes({
                        activeNoteContent: props.activeNoteContent,
                      })
                    }
                  >
                    Get Similar Notes
                  </Button>
                )}
                {similarNotesLoading && <ClipLoader />}
                {similarNotes &&
                  similarNotes.matches.map((note) => (
                    <div
                      key={note.id}
                      onClick={() => props.setActiveNote(note.id.toString())}
                      className="w-fit cursor-pointer border shadow "
                    >
                      {props.notes.get(note.id)?.title}
                    </div>
                  ))}
              </CardContent>
            </Card>
            {/* Suggested tags card */}
            <Card>
              <CardHeader>
                <CardTitle>Suggested Tags</CardTitle>
              </CardHeader>
              <CardContent>
                {activeNote.tags.length == 0 && (
                  <Button
                    disabled={!props.activeNoteId}
                    onClick={() =>
                      handleTags({
                        openai,
                        activeNoteContent: props.activeNoteContent,
                        note: activeNote,
                        notes: props.notes,
                        updateNotes: props.updateNotes
                      })
                    }
                  >
                    Get Tags
                  </Button>
                )}
                {tagsLoading && <ClipLoader />}
                <div className="pt-3 flex flex-wrap gap-2">
                  {activeNote.tags.length > 0 &&
                    activeNote.tags.map((tag) => {
                      return (
                        <div className="w-fit px-1 rounded-lg border">
                          <p className="text-center text-sm font-medium">
                            {tag}
                          </p>
                        </div>
                      );
                    })}
                </div>

                {/* <div className="pt-3 flex flex-wrap gap-2">{displayTags()}</div> */}
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

// Export AIInsights component
export default AIInsights;

//<Button className=" border"
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
