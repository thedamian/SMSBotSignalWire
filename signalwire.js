const express = require("express");
const fetch = require('node-fetch');
const TwilioSID = process.env.TWILIO_ACCOUNT_SID;
const TwilioToken = process.env.TWILIO_AUTH_TOKEN;
var twilio = require('twilio');
let app = express();
app.use(express.urlencoded());
require('dotenv').config();
const  weatherAPIKey =  process.env.WEATHERAPI;
const { RestClient } = require('@signalwire/node')
//const { RestClient } = require("@signalwire/compatibility-api");
const iexapi1 = "https://cloud.iexapis.com/stable/stock/";
const iexapi2 = "/quote?token="+process.env.IEXAPIS;

// SignalWire 
app.post("/message", async (req, res) => {
  const {Body,To,From} = req.body;
  const reply = await ProcessSMS(Body,From,To)
  var response = new RestClient.LaML.MessagingResponse();
  response.message(reply);
  res.set('Content-Type', 'text/xml');
  res.send(response.toString());
  console.log("replied with:",reply);
});

//Twillio... for WhatsApp
app.post("/wamessage", async (req, res) => {
  console.log("twillio req",req);
  const {Body,To,From} = req.body;
  const reply = await ProcessSMS(Body,From,To)
  res.json({ok})
});



const ProcessSMS = async (message,from,to) =>{
  let extra = message.split(' ');
  command = extra.shift();
  extra = extra.join(' ').replace("&","");
  console.log(`Request to phone ${to} from ${from} message: ${message}`);
  try {
    switch (command) {
      case "time":
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        ("time is now: " + time);
        break;
      case "bitcoin":
      case "btc":
      case "bsv":
      case "bch":
    let btc = await getCoinbasePrice("BTC");
    let bch = await getCoinbasePrice("BCH");
    let bsv = await getCoinbasePrice("BSV");
        return `BTC: $${btc.price} USD, BCH $${bch.price}, BSV $${bsv.price}`;
        break; 
    case "ethereum","eth":
          let eth = await getCoinbasePrice("ETH");
          return `ETH: $${eth.price} USD`;
    break;
    case "dogecoin":
    let doge = await getDogeCoinPrice();
        return `MUCH WOW! DogeCoin is at: $${doge.price} USD`;
        break;
    case "crypto":
        try { 
          let symbol = extra.toUpperCase();
          let price = await getCoinbasePrice(symbol);   
          return `${symbol} $${price.price} USD`;  
        } catch (ex) {
            console.log("Error while calling crypto "+extra);
          console.error(ex);
          return `No such crypto as ${extra} found`;
              }
        break;
    case "stock": 
        try {
        getStockPrice
              let symbol = extra.toUpperCase();
              let price = await getStockPrice(symbol);
                return `${symbol} $${price} USD`;
              } catch (ex) {
                console.log("Error while calling stock "+extra);
                console.error(ex);
                return `No such stock symbol ${extra} found`; 
            }
          break;  
    case "weather": 
        let city = extra;
        if (!city) {     
                city = "Boca Raton";  
              }   
        console.log("city"+city);
        let weatherTemp = await getweather(city);
        console.log(weatherTemp);
        return `Temperature right now in ${city} is:  ${weatherTemp}`;
        break;
    default:
        return `Hi Ya! I'm your friendly FloridaJS.com SMS Bot.\n\nYou can ask me for "stocks", Bitcoin prices or any other "crypto", the "time", and even the "weather"!`;
        break;
    }

  } catch (ex) {
    return  ex;
  }
} // end of ProcessSMS()




let getStockPrice = async (stocksymbol) =>  {
    console.log("fateching " + iexapi1+stocksymbol+iexapi2);
    let headers =  { 'Content-Type': 'application/json'};
    return await fetch(iexapi1+stocksymbol+iexapi2,{headers:headers})
    .then(res => res.json())
    .then(json => json.latestPrice);
}


let getweather = async (city) => {
    if (!city) {
	city = "Boca Raton";
    }
    let headers =  { 'Content-Type': 'application/json'};
    const  weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weatherAPIKey}`;
    return await fetch(weatherUrl,{headers:headers})
    .then(res => res.json())
    .then(json => {return `${json.main.temp}F with ${json.weather[0].description.replace('sky','skies')}`; });
}

let getCoinbasePrice = async (cur) =>  {
    let url = `https://api.coinbase.com/v2/prices/${cur}-USD/spot`;
    let headers =  { 'Content-Type': 'application/json'};
    return await fetch(url,{headers:headers})
    .then(res => res.json())
    .then(json => {console.log(json.data); return {symbol: cur, price:twoDigits(json.data.amount.toLocaleString())}; });
}

let getDogeCoinPrice = async () =>  {
  let url = `https://sochain.com//api/v2/get_price/DOGE/USD`;
  let headers =  { 'Content-Type': 'application/json'};
  return await fetch(url,{headers:headers})
  .then(res => res.json())
  .then(json => {return {symbol: "doge", price:twoDigits(json.data.prices[0].price.toLocaleString())}; });
}



function twoDigits(num) {
  return (Math.round(num * 100) / 100).toLocaleString();
  }


app.listen(5018, '0.0.0.0', () => { console.log("Server running on port 5018"); }); //  I need it in port 5018 for my server. you  should change it to what ever you want.
