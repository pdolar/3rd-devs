import *  as fs from 'fs';
import { OpenAIService } from './OpenAIService';
import type OpenAI from 'openai';
import { systemPrompt } from './prompts';

export async function fetchData(url: string): Promise<any> {
    try {
      const response = await fetch(url);
      
      // Sprawdź, czy odpowiedź jest poprawna
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Wyciągnij zawartość JSON do zmiennej
      const jsonData = await response.json();
      
      return jsonData; // Zwróć dane JSON
    } catch (error) {
      console.error('Error:', error);
      return null; // Możesz zwrócić null lub inny obiekt w przypadku błędu
    }
  };
  
function calculate(expression: string): number {
    const parts = expression.split("+");
    return Number(parts[0]) + Number(parts[1]);
};

const poligonKey = '95db6f7e-9c64-40d9-81e0-ce380f8cb498' ;
// Użycie funkcji
const url = 'https://centrala.ag3nts.org/data/95db6f7e-9c64-40d9-81e0-ce380f8cb498/json.txt';
const data = await fetchData(url);

data.apikey = poligonKey;
const testd = data["test-data"];

let qforLLM: { jsonID: number; question: string } [] = []; //storage for llm question and position in the JSON

for ( let i = 0; i < testd.length; i++ ) {
  //zmodyfikuj odpowiedzi 
  const newSum = calculate(testd[i].question);
  
  if (testd[i].answer !== newSum ){
    // console.log(`${i}, an: ${testd[i].answer}, but shall be ${newSum}`);
    testd[i].answer = newSum;
  }
  //znajdz kolejeny obiekt
  if (testd[i].test){ 
    // console.log(i, " --> " + testd[i].test.q +"\n");
    qforLLM.push({ jsonID: i, question: testd[i].test.q });
  }  
};  

const openaiService = new OpenAIService();

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

  //console.log(response.choices[0].message.content);
  return response.choices[0].message.content ?? "No conversation history";
};

//ask q to AI and store answer in place of question 
async function changeQuestionToAnswer() {
  for (const record of qforLLM) {
      console.log("właściwe pytanie: " + record.question);

      await askAI(record.question).then(response => {
          console.log('odpowiedz AI: ' + response);
          //record.question = response; 
          testd[record.jsonID].test.a = response
      });
      //console.log (testd[record.jsonID].test.a);
  }

  const plik = JSON.stringify({ 
    task: "JSON",
    apikey: poligonKey,
    answer: data
  },null,2);

  const sendData = await fetch('https://centrala.ag3nts.org/report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },  
    body: plik
    })
  
  fs.writeFile('data.json', plik, (err) => {
    if (err) {
        console.error('Błąd podczas zapisywania pliku:', err);
    } else {
        console.log('Dane zostały zapisane do pliku data.json');
    }
  });

  const data2 = await sendData.text();
  console.log(data2);
}
changeQuestionToAnswer();
