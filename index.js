var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require("body-parser");

// var usersController = require("./app/controllers/users");
var questionsController = require("./app/controllers/questions");
var answersController = require("./app/controllers/answers");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "hbs")

// app.use("/", usersController);
app.use("/", questionsController);
app.use("/", answersController);

app.get("/", function(req, res){
  res.render("index")
});


var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("listening on " + port)
})
