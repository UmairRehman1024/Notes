import { Pinecone, PineconeRecord, QueryResponse, RecordMetadata } from "@pinecone-database/pinecone";
import OpenAI from "openai";
import { useState } from "react";

export const useSimilarNotes = (props : {openai: OpenAI, }) => {
    // const [similarNotes, setSimilarNotes] = useState<scoresWithID[]>();
    // const [similarLoading, setSimilarLoading] = useState(false);
    
    const [similarNotesEmbedding, setsimilarNotesEmbedding] = useState<QueryResponse<RecordMetadata>>();
    const [similarEmbeddingLoading, setSimilarEmbeddingLoading] = useState(false);

    let pc: Pinecone;
    try {
      pc = new Pinecone({
      apiKey: import.meta.env.VITE_PINECONE_API_KEY
    });
    } catch (error) {
      console.error(error)
    }

    
//   const handleSimilarNotes = async () => {
//     //get all text from all notes
//     //get result from model
//     //add ids to the result array
//     //sort result array in order of similarity score
//     //return top 3 results

//     setSimilarLoading(true);
//     console.log("---------Notes----------")
//     console.log(notes)
//     console.log("---------Notes----------")

//     //get all text from all notes
//     getAllNotes().then(async (allNotes) : Promise<void>=> {
//       console.log(allNotes)
//       const similarityScores = await hf.sentenceSimilarity({
//         // model: "sentence-transformers/paraphrase-xlm-r-multilingual-v1",
//         inputs: {
//           source_sentence: activeNoteContent,
//           sentences: allNotes,
//         },
        
//       });

//       const index = getIndexFromId(notes, activeNoteId);

      


//       similarityScores.splice(index, 0, 0);

//       console.log("similarityScores");
//       console.log(similarityScores);

//       const scoresWithIDs = [...notes.keys()].map((id, index) => ({
//         id,
//         score: similarityScores[index],
//       }));
//       console.log("scoresWithIDs");
//       console.log(scoresWithIDs);

//       scoresWithIDs.sort((a, b) => b.score - a.score);
//       console.log("notesWithScoresSorted");
//       console.log(scoresWithIDs);

//       //remove all notes with score less than 0.55
//       scoresWithIDs.filter(score => score.score > 0.55)

//       const top3results = scoresWithIDs.slice(0, 3);

//       setSimilarNotes(top3results);

//       setSimilarLoading(false);
//     });
//     // console.log(allNotes)
//     // if (allNotes === undefined) throw new Error("allNotes is Undefined");

//     // if (allNotes.length == 0) slee;

//     // console.log(`All Notes`);
//     // console.log(allNotes);

//     // const similarityScores = await hf.sentenceSimilarity({
//     //   // model: "sentence-transformers/paraphrase-xlm-r-multilingual-v1",
//     //   inputs: {
//     //     source_sentence: activeNoteContent,
//     //     sentences: allNotes,
//     //   },
//     // });

    

//     //add the active note to the list of results at the index of where it is in "notes"

//     //get embedding for current note
//     //compare to other notes
//     //return close notes close to current note
//   };

  const handleSimilarNotesEmbedding = async (props: {activeNoteContent: string}) => {
    //get embedding for all notes
    //store in vector database

    //get top similar results for active not

    setSimilarEmbeddingLoading(true)


    const embeddings: PineconeRecord<RecordMetadata>[] = []
    

    console.log("------emebeddings---------")
    console.log(embeddings)



    const index_name = 'semantic-search-openai' 

    await pc.createIndex({
      name: index_name,
      dimension: 1536 ,
      metric: 'cosine',
      spec: { 
        serverless: { 
          cloud: 'aws', 
          region: 'us-east-1' 
        }
      } ,
      suppressConflicts: true
    }); 

    const index = pc.index(index_name);

     await index.upsert([...embeddings])

    const activeNoteEmbedding = await getVector(props.activeNoteContent)

    console.log("----------activeNoteEmbedding------------")

    console.log(activeNoteEmbedding)

    const queryResponse = await index.query({
      topK: 3,
      vector: activeNoteEmbedding,
    });

    console.log("-------queryResponse--------")
    console.log(queryResponse)

    
    setsimilarNotesEmbedding(queryResponse)

    setSimilarEmbeddingLoading(false)

  }

  type embeddingResult = {
    id : string | number
  }

  type embedding = {
    id: string | number,
    vector: number[]
  }


    async function getVector(text: string) {
        const response = await props.openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
        });


        return response.data[0].embedding;
    }


    return {similarNotes: similarNotesEmbedding, similarNotesLoading: similarEmbeddingLoading, handleSimilarNotes: handleSimilarNotesEmbedding, };
    
}