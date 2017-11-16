// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.listen(PORT, function(){
  console.log("App listening on port: " + PORT);

});

var tables = [];

app.get("/api/:tables?", function(req, res) {
  var chosen = req.params.tables;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < characters.length; i++) {
      if (chosen === tables[i].routeName) {
        return res.json(tables[i]);
      }
    }

    return res.json(false);
  }
  return res.json(tables);
});


// Basic route that sends the user first to the AJAX Page
app.post("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reservation.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tableviews.html"));
});

app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newTable = req.body;
  newTable.routeName = newTable.customerName.replace(/\s+/g, "").toLowerCase();

  console.log(newTable);

  tables.push(newTable);

  res.json(newTable);
});
