var express = require("express");
var mongodb = require("mongodb");
var dbHost = "mongodb://localhost:27017/fusion_demo";
var dbObject;

var MongoClient = mongodb.MongoClient;
MongoClient.connect(dbHost, function(err, db){
  if ( err ) throw err;
  dbObject = db;
});

function getData(responseObj){
  dbObject.collection("fuel_price").find({}).toArray(function(err, docs){
    if ( err ) throw err;
    var monthArray = [];
    var petrolPrices = [];
    var dieselPrices = [];

    for ( index in docs){
      var doc = docs[index];
      var month = doc['month'];
      var petrol = doc['petrol'];
      var diesel = doc['diesel'];
      monthArray.push({"label": month});
      petrolPrices.push({"value" : petrol});
      dieselPrices.push({"value" : diesel});
    }

    var dataset = [
      {
        "seriesname" : "Petrol Price",
        "data" : petrolPrices
      },
      {
        "seriesname" : "Diesel Price",
        "data": dieselPrices
      }
    ];

    var response = {
      "dataset" : dataset,
      "categories" : monthArray
    };
    responseObj.json(response);
  });
}

var app = express();

var exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/public', express.static('public'));
app.get("/fuelPrices", function(req, res){
  getData(res);
});
app.get("/", function(req, res){
  res.render("chart");
});

app.listen("3300", function(){
  console.log('Server up: http://localhost:3300');
});
