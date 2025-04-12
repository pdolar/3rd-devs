import { JSDOM } from 'jsdom';

export async function strzelaj() : Promise<string> {
  try {
    const readData = await fetch('https://xyz.ag3nts.org/');
    const htmlText = await readData.text();
    
    // Tworzenie parsera i parsowanie HTML
    const dom = new JSDOM(htmlText);
    const doc = dom.window.document;
    
    // Przykłady pobierania elementów:
    const specificInput = doc.getElementById('human-question');     // konkretne pole po ID
    
    //console.log(readData.status);
    //const data = await readData.text();
    //console.log("+++++++++++++++++++++++++++++++++++++"+'\n' );
    console.log(specificInput?.textContent);
/*
    const sendData = await fetch('https://poligon.aidevs.pl/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },  
      body: JSON.stringify({ 
        task: "POLIGON",
        apikey: "95db6f7e-9c64-40d9-81e0-ce380f8cb498",
        answer: [lines[0],lines[1]]
      })
    });

    const data2 = await sendData.text();
    console.log("data2:"+'\n'+data2); 
*/
    return specificInput?.textContent || "";
  } catch (error) {
    console.error('Error:', error);
    return "";
  }
};
//strzelaj();