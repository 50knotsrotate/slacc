const bcrypt = require("bcryptjs");
/*
    ENDPOINT(S): POST /signin
    
    PURPOSE: This middleware function is used to check the USERS table to make sure the POSTed username
    and password exist in the record. This function is very similar to checkUniqueUsername middleware,
    the only difference being we dont send an error if we find a user, we throw an error of we DONT
    find a user.
*/

async function checkUniqueUsername(req, res, next) {
  const db = req.app.get("db");

  const { username, password } = req.body;

  db.find_user(username).then(user => {
    if (user.length) {
      const isCorrectPassword = bcrypt.compareSync(password, user[0].password);
      if (isCorrectPassword) {
        next();
      } else {
        const err = new Error("Incorrect password");
        err.statusCode = 400;
        return next(err);
      }
    } else {
      const err = new Error("Uh uh! We cant find you");
      err.statusCode = 400;
      return next(err);
    }
  });
}

module.exports = checkUniqueUsername;
