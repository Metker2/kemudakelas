const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');
var randomWords = require('random-words');
var ignoreCase = require('ignore-case');

const config = {
  channelAccessToken: "3MMH93Gsk8BHnhk4ht4dtSsVp3UCbXBCI0KPcaDs0qDIoA/9BzvYC6cCde7oYNb3QFvOyru/5ImfWQF/iQ3FLbMsIX7ZoIcApM2fsk3l2pGPcZaoS31epFmXb8iOlpWc0qOXnGu/SrBv+8UmnHeiNgdB04t89/1O/w1cDnyilFU=",
  channelSecret: "dc945c10ae01c8045a8db47e0cbd6bee",
};

// create LINE SDK client
const client = new line.Client(config);
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((e)=>{
      console.log(e);
    });

});

function handleEvent(event){
  
    if(event.message.text == "apakah"){
      const echo = { type: 'text', text: "skruutt :)" };
      return client.replyMessage(event.replyToken, echo);
    }

    const echo = { type: 'text', text: "Saya tidak mengerti, saya simpan dulu" };
    return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});