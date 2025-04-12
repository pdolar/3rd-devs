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

    return specificInput?.textContent || "";
  } catch (error) {
    console.error('Error:', error);
    return "";
  }
};
//strzelaj();
