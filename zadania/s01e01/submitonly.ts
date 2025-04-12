import { askAI } from "./askAIfunc";

const year = await askAI();
const password = "574e112a";
const username = "tester";


const response = await fetch("https://xyz.ag3nts.org/", {
  headers: {

    "content-type": "application/x-www-form-urlencoded",
    
  },
  body: `username=${username}&password=${password}&answer=${year}`,
  method: 'POST'
});

  const data = await response.text();
  console.log("data++++++++++++: "+222+' ++++++++++++:\n'+data); 