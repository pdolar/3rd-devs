import { askAI } from "./askAIfunc";

const year = await askAI();
const password = "574e112a";
const username = "tester";


const response = await fetch("https://xyz.ag3nts.org/", {
  headers: {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "pl,en-US;q=0.9,en;q=0.8,pl-PL;q=0.7,de;q=0.6,it;q=0.5,ru;q=0.4",
    "cache-control": "max-age=0",
    "content-type": "application/x-www-form-urlencoded",
    "priority": "u=0, i",
    "sec-ch-ua": "\"Chromium\";v=\"130\", \"Google Chrome\";v=\"130\", \"Not?A_Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "Referer": "https://xyz.ag3nts.org/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },  
  body: `username=${username}&password=${password}&answer=${year}`,
  method: 'POST'
}); 

  //console.log(body);
  const data = await response.text();
  console.log("data++++++++++++: "+year+' ++++++++++++:\n'+data); 