
export async function startConversation(msgID: number, text: string)  {
  try {
        const sendData = await fetch('https://xyz.ag3nts.org/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },  
            body: JSON.stringify({ 
              msgID: msgID,
              text: text
            })
        });

        const data = await sendData.json();
        console.log(data);
        //console.log("data:"+'\n'+data.text + '\n' +'ID:'+'\n' + data.msgID); 
               
        return data;
  } catch (error) {
        console.error('Error:', error);
        return JSON.stringify({ error: 'Wystąpił błąd podczas przetwarzania żądania.' });
        
    }
};
//startConversation(0,"READY");

import { OpenAIService } from './OpenAIService';
import type OpenAI from 'openai';
import { systemPrompt } from './prompts';

const openaiService = new OpenAIService();
//let previousSummarization = ""; 

async function askAI(question: string) : Promise<string> {
  //console.log(question);

  const response = await openaiService.completion([
    { 
        role: "system", 
        content: systemPrompt
    },
    { 
        role: "user", 
        content: question 
    }], "gpt-4o-mini", false) as OpenAI.Chat.Completions.ChatCompletion;

  console.log(response.choices[0].message.content);
  return response.choices[0].message.content ?? "No conversation history";
};

const data  = await startConversation(0, "READY");
await startConversation(data.msgID,await askAI(data.text)); 
