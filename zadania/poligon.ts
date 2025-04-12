import { line } from "drizzle-orm/pg-core";

async function strzelaj() : Promise<void> {
  try {
    
    const messages = [
      {
        role: "system",
        content: "You are a helpful assistant, pisz moje imie wielkimi literami "
      },
      {
        role: "user",
        content: "jaka pogoda jest w Kielcach" 
      }
  ];

    const readData = await fetch('https://poligon.aidevs.pl/dane.txt', {
  /*    method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }  
  */  })
    const data = await readData.text();
    const lines = data.split('\n');         // dzieli po znaku nowej linii
    //const firstLine = lines[0];             // pierwszy wiersz
    //const secondLine = lines[1];            // drugi wiersz
    console.log("lines:"+'\n'+lines);
    console.log("lines.length:"+'\n'+lines.length);
    console.log("firstLine:"+'\n'+lines[0]);
    console.log("secondLine:"+'\n'+lines[1]);
    console.log("thirdLine:"+'\n'+lines[2]);
    console.log("+++++++++++++++++++++++++++++++++++++"+'\n' );

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
  } catch (error) {
    console.error('Error:', error);
  }

};

strzelaj();