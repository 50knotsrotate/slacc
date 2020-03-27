/* tslint:disable */
require("dotenv").config();
var http = require("http");
var express = require("express");
var app = express();
var massive = require("massive");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

//Need this only to resolve the path of the build folder, which lives up one directory
var path = require("path");

const { CONNECTION_STRING } = process.env;

//Using this for exposing the build folder to the client, which is where the finished HTML CSS and JS will live
app.use(express.static(`${__dirname}/../build`));

// For parsing body of incoming post requests
app.use(express.json());

var server = http.createServer(app);

// Pass a http.Server instance to the listen method
var io = require("socket.io").listen(server);

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("connected to db");
    db.init();
  })
  .catch(err => console.log("failed to connect to db"));

// The server should start listening
server.listen(80);
console.log("server started");

// app.post("/signup", function(req, res, next) {
//   // Get the DB
//   const db = req.app.get("db");

//   // Get username and password
//   const { username, password } = req.body;

//   // Set salt rounds for hashing password
//   const saltRounds = 10;

//   bcrypt.hash(password, salt, function (err, hash) {
//     // If there was an error hashing the password, forward this to the error handler
//     if (err) {
//       const error = new Error("Error creating new user");
//       error.statusCode = 500;
//       return next(error);
//     }

//     db.create_user(username, hash)
//       .then(user => {
//         var secret =
//           "aTk0M3F5NXR1Zzh3cmlwZXN0amYyOTgzNHdpb1tldTVyanFmY2lwcmVkeGdudnJtY2llYWsnd2x3"; //Change this & store in .env
//         var { id } = user[0];
//         jwt.sign({ id }, secret, (err, token) => {
//           if (err) {
//             return next(err);
//           }

//           return res.json({
//             token
//           });
//         });
//       })
//       .catch(err => {
//         const error = new Error(err.detail);
//         error.statusCode = 500;
//         return next(error);
//       });
//   });
// });

app.post("/signup", async (req, res, next) => {
  try {
    const db = req.app.get("db");

    const { username, password } = req.body;

    // Quick check. Can do better than this!
    if (!username || !password) { 
      throw {
        message: 'Please provide proper username and password',
        statusCode: 400
      }
    }

    const isUniqueUsername = await db.find_user(username).length === 0;

    // If the username is not unique, throw the error, which will be handled by the error handler
    if (isUniqueUsername) {
      throw {
        message: 'User with that username already exists',
        statusCode: 400 // TODO: Find more approprite status code
      }
    }

    // Create user record
    const salt = 10;

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await db.create_user(username, hashedPassword);

    // End create user record

    // JWT configuration
    const secret = "aTk0M3F5NXR1Zzh3cmlwZXN0amYyOTgzNHdpb1tldTVyanFmY2lwcmVkeGdudnJtY2llYWsnd2x3"; //Change this and put in .env

    const iat = Date.now() / 1000;

    const jwtid = Math.random().toString(36).substring(7) // Copied from https://www.js-tutorials.com/nodejs-tutorial/user-authentication-using-jwt-json-web-token-node-js/

    const audience = 'test'

    const data = newUser[0].id;

    const payload = {
      iat,
      jwtid,
      audience,
      data
    };

    const options = {
      algorithm: 'HS256',
      expiresIn: '1h'
    }

    // End JWT config

    // Get the token and send to user
    const token = jwt.sign(payload, secret, options);
    
    return res.status(200).send(token);

  } catch (error) {

    return next(error);
  }
});

//Error handler
app.use(function(err, req, res, next) {
  return res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Internal Server Error" });
});

// Register the index route of your app that returns the HTML file
app.get("*", function(_req, res) {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

// Handle connection
io.on("connection", function(socket) {
  console.log("Connected succesfully to the socket ...");

  socket.on("click", function(data) {
    console.log(data);
  });
});
