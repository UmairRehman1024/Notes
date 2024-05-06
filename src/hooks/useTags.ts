import OpenAI from "openai";
import { useState } from "react";
import { Note } from "./useNotes";


export const useTags = () => {

    // const [tags, setTags] = useState<string[]>([]);
    const [tagsLoading, setTagsLoading] = useState(false);

    function splitTags(tagString: string): string[] {
        // Split the tagString by commas to get an array of individual tags
        const tagsArray: string[] = tagString.split(',');
    
        // Trim each tag to remove any leading or trailing spaces
        const trimmedTags: string[] = tagsArray.map(tag => tag.trim());
    
        return trimmedTags;
    }
    
    const handleTags = async (props: {openai: OpenAI, activeNoteContent: string, note: Note |undefined, notes: Map<string, Note>, updateNotes: (updatedNotes: Map<string, Note>) => void}) => {
        setTagsLoading(true)

        if (!props.note){console.error("There was no note given to handleTags function"); return }

        const activeTags = await props.openai.chat.completions.create({
            max_tokens: 50,
            messages: [
            {
                role: "system",
                content:
                "You are a helpful assistant.Generate 5-10 tags for the following text. seperate each tag by a comma. the text:" +
                props.activeNoteContent 
                // "generate new tags that are similar to already generated one. prioritise using the already generated tags and then add new tag to get to 5-10 tags. " +
                // "if the already genrated tags is empty, generate all new tags. the following is tags already generated " +
                // tags,
            },
            ],
            model: "gpt-3.5-turbo",
        });

        console.log(activeTags)
        const content = activeTags.choices[0].message.content
        console.log(content);

        if (!content) throw new Error("No message was sent from OpenAI api")

        const tagsArray =  splitTags(content)

        console.log(tagsArray)
        props.note.tags = tagsArray

        const updatedNotes = new Map(props.notes);
        updatedNotes.set(props.note.id, props.note);
  
        props.updateNotes(updatedNotes);

        
        

        
        
        setTagsLoading(false)

        // if (!props.activeNoteId) throw new Error("No active note selected")
        // const title = notes.get(props.activeNoteId)?.title
        // if (!title) throw new Error("no title found for active note")
        // const labels = await hf.zeroShotClassification({
        //   // model: "sentence-transformers/paraphrase-xlm-r-multilingual-v1",
        //   inputs: activeNoteContent,
        //   parameters: {
        //     candidate_labels: [title],
        //     multi_label: true
        //   }
        // });
        // console.log(labels)
    };


   
    

    return {tagsLoading,  handleTags};
}
