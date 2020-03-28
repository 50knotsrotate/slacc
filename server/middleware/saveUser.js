/* 
    ROUTE(S): POST /signup
    PURPOSE: This middleware function takes a users password, hashes it, and then inserts it into the DB.

*/

const bcrypt = require('bcryptjs');

async function saveUser(req, res, next) {
    try {
        const db = req.app.get("db");

        const { username, password } = req.body;

        const salt = 10;

        const hashedPassword = await bcrypt.hash(password, salt);

        await db.create_user(username, hashedPassword);

        next();
    } catch (_e) { 
        const err = new Error('There was an problem and your account was not created');
        err.statusCode = 500;
        return next(err)
    }
}
 
module.exports = saveUser;