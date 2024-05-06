import { HfInference } from "@huggingface/inference";
import { useState } from "react";




export const useSummary = (props: {activeNoteContent: string}) => {

    const hf = new HfInference(import.meta.env.HUGGING_FACE_ACCESS_TOKEN);

    const [summary, setSummary] = useState<String>();
    const [summaryLoading, setSummaryLoading] = useState(false);


    const handleSummarise = async () => {
        // const openai = new OpenAI();
    
        // const completion = await openai.chat.completions.create({
        // messages: [{ role: "system", content: "You are a helpful assistant.Summarise the following text: " + activeNoteContent }],
        // model: "gpt-3.5-turbo",
        // })
    
        // console.log(completion.choices[0]);
    
        try {
          setSummaryLoading(true);
          const result = await hf.summarization({
            model: "facebook/bart-large-cnn",
            inputs: props.activeNoteContent,
          });
          setSummaryLoading(false);
    
          // return result
          console.log(result);
          setSummary(result.summary_text);
        } catch (error) {
          console.error(error);
        }
    
        // console.log(process.env.OPENAI_KEY)
        // console.log(import.meta.env.VITE_OPENAI_KEY)
      };

    return {summary, summaryLoading, handleSummarise};
}