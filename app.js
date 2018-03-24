const express = require("express");
const bodyParser = require("body-parser");
const countries = require('country-data').countries;
const translate = require('google-translate-api');

const app = express();
const jsonParser = bodyParser.json();

const SERVER_PORT = 3000;

app.post("/api/country", jsonParser, function (req, res) {

  if(!req.body) return res.sendStatus(400);

  let resp = res;
  let countryCode = req.body.countryCode;
  let to = req.body.to;
  let countryNameEn = countries[countryCode].name;

  translate(countryNameEn, {from: 'en', to: to})
    .then(res => {
      let countryName = res.text;

      let countryResponse = {
            countryCode:countryCode,
            to:to,
            countryName:countryName
          };

      resp.send(countryResponse);
  }).catch(err => {
      resp.sendStatus(400);
  });
});

app.listen(SERVER_PORT, function(){
    console.log("Server port: " + SERVER_PORT);
});
