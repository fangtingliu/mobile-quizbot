var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');

var app = express();

// static serve
app.use(express.static(__dirname + './../www'));

// dev request logger
app.use(morgan('dev'));

// local server
var port = process.env.PORT || 8000;
app.listen(port, function(){
  console.log("Listening to localhost, port #: " + port);
})