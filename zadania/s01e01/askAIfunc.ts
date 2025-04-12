import { OpenAIService } from './OpenAIService';
import type OpenAI from 'openai';
import { strzelaj } from './readLoginPage';

const openaiService = new OpenAIService();
//let previousSummarization = ""; 

export async function askAI() : Promise<string> {
  const question = await strzelaj();
  console.log(question);

  const response = await openaiService.completion([
    { 
        role: "system", 
        content: "pokaz tylko rok, nie pokazuj nic innego"
    },
    { 
        role: "user", 
        content: question 
    }], "gpt-4o-mini", false) as OpenAI.Chat.Completions.ChatCompletion;

// console.log(response.choices[0].message.content);
  return response.choices[0].message.content ?? "No conversation history";
}
