/* tslint:disable */
require('dotenv').config();
var http = require("http");
var express = require("express");
var app = express();
var massive = require('massive');

//Need this only to resolve the path of the build folder, which lives up one directory
var path = require('path');

const { CONNECTION_STRING } = process.env;

//Using this for exposing the build folder to the client, which is where the finished HTML CSS and JS will live
app.use(express.static(`${__dirname}/../build`));


var server = http.createServer(app);

// Pass a http.Server instance to the listen method
var io = require("socket.io").listen(server);

massive(CONNECTION_STRING)
  .then(db => { 
    app.set('db', db)
    console.log('connected to db')
    db.init()
  }).catch(err => console.log('failed to connect to db'))

// The server should start listening
server.listen(80);
console.log('server started')


// Register the index route of your app that returns the HTML file
app.get("*", function(_req, res) {
   res.sendFile(path.join(__dirname, '../build/index.html'));
});


// Handle connection
io.on("connection", function(socket) {
  console.log("Connected succesfully to the socket ...");

  socket.on('click', function (data) { 
    console.log(data)
  })
});
