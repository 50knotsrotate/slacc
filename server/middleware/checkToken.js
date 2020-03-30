const jwt = require("jsonwebtoken");

module.exports = function(req, res) {
  const secret =
    "aTk0M3F5NXR1Zzh3cmlwZXN0amYyOTgzNHdpb1tldTVyanFmY2lwcmVkeGdudnJtY2llYWsnd2x3";
  const { token } = req.headers;
  if (token) {
      const decoded = jwt.verify(token, secret);
     return res.status(200).send()
r  } else {
    const err = new Error("No JWT provided");
    err.statusCode = 400;
    return res.status(400).send(err);
  }
};
