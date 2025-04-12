async function postData() {
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

    const response = await fetch('http://localhost:3000/api/demo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },  
      body: JSON.stringify({message: messages[1]})
 
    })
    
    const data = await response.json();
    console.log("data", data);
    console.log("response", response);
  } catch (error) {
    console.error('Error:', error);
  }
};

postData();