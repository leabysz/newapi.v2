const axios = require('axios')
const express = require('express');
const schedule = require('node-schedule');
const serverless = require("serverless-http");

const app = express();
const router = express.Router();
const newsApiRoute = 'http://newsapi.org/v2/everything?q=rich&sortBy=publishedAt&apiKey=';
const newsApiKey = '6633de5b30b74366b611995131df0058';

//array que gaurda la apicall
let newsData = [];

router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});


router.get("/test", (req, res) => {
    res.json({
      hello: "test"
    });
  });

//hace el trabajo, recibe la llamada del navegador o tercero a mi servidor y devuelve newData
router.get("/newsapi", (req, res) => {
    res.send(newsData);
});

const getNewsJob = schedule.scheduleJob('15 * * * *', function () {
    console.log('Trae las noticias en el minuto N de la hora')
    axios.get(`${newsApiRoute}${newsApiKey}`)
      .then((response) => newsData=response.data)
      .catch((error) => console.log(error)); 
});


app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);