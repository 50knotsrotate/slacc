/* 
    ROUTE(S): POST /signup
    PURPOSE: This function hashes a username and issues a JWT. This should always be the last middleware
    for POST /signup

*/
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function issueToken(req, res, next) {
  const { username } = req.body;

  const salt = 10;

  /*
        The reason I am using bcrypt on the username is because a JWT needs some way of
        identifying the user who sent the token, and a username is an easy way of going that.
        The only problem is that JSON web tokens can be easily decoded, so this is just my way
        of preventing a "token hijacker" from knowing how this app is identifying a user
        though the tokens.
    */

  bcrypt.hash(username, salt).then(hash => {
    /*  JWT config.  */

    const data = {
      identifier: hash
    };
    const secret =
      "aTk0M3F5NXR1Zzh3cmlwZXN0amYyOTgzNHdpb1tldTVyanFmY2lwcmVkeGdudnJtY2llYWsnd2x3"; //Change this and put in .env

    const iat = Date.now() / 1000;

    const jwtid = Math.random()
      .toString(36)
      .substring(7); // Copied from https://www.js-tutorials.com/nodejs-tutorial/user-authentication-using-jwt-json-web-token-node-js/

    const audience = "test"; // I think I have to make this the domain of the app, but this will be fine for now.

    const payload = {
      iat,
      jwtid,
      audience,
      data
    };

    const options = {
      algorithm: "HS256",
      expiresIn: "1h"
    };
    // End JWT config

    const token = jwt.sign(payload, secret, options);

      return res.status(200).send({ token });
      
  }).catch(_err => { 
      const err = new Error('There was a problem sending you a token')
      err.statusCode = 500;
      return next(err)
  });
}

module.exports = issueToken;
