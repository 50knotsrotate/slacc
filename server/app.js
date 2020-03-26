/* tslint:disable */
require('dotenv').config();
var http = require("http");
var express = require("express");
var app = express();
var massive = require('massive');
var bcrypt = require('bcryptjs');

//Need this only to resolve the path of the build folder, which lives up one directory
var path = require('path');

const { CONNECTION_STRING } = process.env;

//Using this for exposing the build folder to the client, which is where the finished HTML CSS and JS will live
app.use(express.static(`${__dirname}/../build`));

// For parsing body of incoming post requests
app.use(express.json())


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

app.post('/signup', function (req, res, next) {
  const db = req.app.get('db');
  const { username, password } = req.body;
  const saltRounds = 10; 
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) { 
      const error = new Error('Error creating new user')
      error.statusCode = 500;
      return next(error)
    }
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) { 
         const error = new Error("Error creating new user");
         error.statusCode = 500;
         return next(error);
      }
        db.create_user(username, hash)
          .then(user => {
            res.status(200).send(user);
          })
          .catch(err => {
            const error = new Error(err.detail);
            error.statusCode = 500;
            return next(error);
          });
     })
   })
});

//Error handler
app.use(function (err, req, res, next) {
  return res.status(err.statusCode || 500).send(err.message || 'Internal Server Error')
 })

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
