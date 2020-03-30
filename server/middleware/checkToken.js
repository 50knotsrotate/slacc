const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = function(req, res, next) {
  const secret =
    "aTk0M3F5NXR1Zzh3cmlwZXN0amYyOTgzNHdpb1tldTVyanFmY2lwcmVkeGdudnJtY2llYWsnd2x3";
  const headers = req.headers;

  const { identifier } = headers || null;

  if (identifier) {
    const db = req.app.get("db");

    const decoded = jwt.verify(identifier, secret);

    if (decoded) {
      const username = decoded.data.identifier;

      db.find_user(username).then(user => {
        if (user.length) {
          req.username = username
          return next();
        } else {
          const err = new Error("Invalid token yo");
          err.statusCode = 400;
          return next(err);
        }
      });
    } else {
      const err = new Error("Invalid token");
      err.statusCode = 400;
      return next(err);
    }
  } else {
    const err = new Error("No JWT provided");
    err.statusCode = 400;
    return next(err);
  }
};
