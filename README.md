#### Hello. I am going to _try_ and make a slack clone. I dont plan on copying the entire slack app pixel for pixel, but I want to at least build some of the basic functionality which might include:

- User authentication (Perhaps 0auth?)
- Create teams
- Create channels
- Private messages
- File uploading
- Real time messaging

#### I literally have no idea how I am going to do this yet. But I can start with this: Each user has multiple teams. Each team has multiple channels. Each channel has multiple users, each user has multiple messages and a message belongs to only one user. Sure sounds a whole lot like a relational db. I think I may choose to go with Postgres here, but I guess we will see.

#### The rest of the app will be written in Node.js and React.js

#### But first - before I even do anything, I want to get a refresher on how web sockets work. `https://socket.io/docs/` Poked though this, now I just want to setup a quick chat app to make sure I can actually implement this without any problems. According to the docs, I need to setup an express server (Well, doesnt need to be express... but I like express), and than setup a connection on the front end as well. Luckily there are libraries to take care of most of this for me. In the command line (Of course making sure I am in the root directory and that react is all set up): `mkdir server then cd server then touch app.js then npm install express socket.io socket.io-client`

#### I've implemented web sockets in the past, and from past experience I can tell you that it is a WONDERFUL tool, but is a collasal pain in the butt to set up (I feel similarly about redux..). After some digging though old projects and documentation, I was able to get it all set up - The server can now communicate in real time with the client. There are SO MANY possibilities when wrking with sockets, it almost seems like a waste to use it for a chat app, but whatever. Now that I have got the annoying part out of the way, I now want to start building my database schema.

#### Now I will have to start to define my tables. I will start with the user object, which might look something like this (These will probably change at some point, but I just want to get a rough idea of what these tables will look like):

#### USER

- id => primary key
- username => string, not null
- password => text

#### TEAM

- id => Primary key
- name => text not null
- owner => integer references user.id

#### CHANNEL

- id => primary key
- owner => integer references user.id
- team_id => integer references team.id
- socket_id => text

#### MESSAGE

- id => primary key
- user_id => integer references user.id
- body => text
- channel_id => integer references channel.id

#### I think that may be good enough for now

#### I have decided to use massive.js to handle my SQL queries. `npm install massive`

#### Now to create the tables! in /db/init, i put this

```code sql
drop table if exists messages;
drop table if exists channels;
drop table if exists teams;
drop table if exists users;

create table users (
id serial primary key,
username varchar(25) not null,
password varchar(250) not null
);

create table teams (
id serial primary key,
name varchar(25) not null,
owner integer references users(id)
);

create table channels (
id serial primary key,
owner integer references users(id),
team_id integer references teams(id)
);

create table messages (
id serial primary key,
user_id integer references users(id),
body varchar(250),
channel_id integer references chan;nels(id)
);
```

#### I went ahead and also created a super simple bootstrap layout. I will come back to redesign it, but I just want something somewhat nice to look at while I build this thing out. Now I can go ahead and setup 0auth, because I have setup custom authentication before, and I just want to try something new.

#### UPDATE: Okay, I am actually NOT going to implement signing in with google. Appearently, my app now has to be verified by google, which could take weeks. I am instead going to find another way to authorize users.. time to do some research!

#### I have decided that instead of using 0auth, I am going to use JSON web tokens. From what I understand so far after a bit of reading, JWT's are sent from the server to the client(via headers), and saved as either a cookie or in local storage in the clients brower, which will be the users "key" to access protected routes and "prove" to the server that you have already been authenticated. This will be nice to use these instead of server sessions, because now I can keep the user logged in even after the browser closes. Cool!

#### Before I do that, I need to setup my /signup endpoint and handle that. Going to be pretty basic, user make s post request to the server, the server makes sure the username and password are valid, makes sure that username isnt taken, and stores it in the DB and send back a JWT if everything checks out, and send an error back if something went wrong.

#### I have started making my signin route, but I'm running into a little issue here. Take a look.

```javascript
app.post("/signup", function(req, res, next) {
  // Get the DB
  const db = req.app.get("db");

  // Get username and password
  const { username, password } = req.body;

  // Set salt rounds for hashing password
  const saltRounds = 10;

  bcrypt.hash(password, salt, function(err, hash) {
    // If there was an error hashing the password, forward this to the error handler
    if (err) {
      const error = new Error("Error creating new user");
      error.statusCode = 500;
      return next(error);
    }

    db.create_user(username, hash)
      .then(user => {
        var secret =
          "aTk0M3F5NXR1Zzh3cmlwZXN0amYyOTgzNHdpb1tldTVyanFmY2lwcmVkeGdudnJtY2llYWsnd2x3"; //Change this & store in .env
        var { id } = user[0];
        jwt.sign({ id }, secret, (err, token) => {
          if (err) {
            return next(err);
          }

          return res.json({
            token
          });
        });
      })
      .catch(err => {
        const error = new Error(err.detail);
        error.statusCode = 500;
        return next(error);
      });
  });
});
```

#### 2 things: First, this is UGLY. So many callbacks. It is ugly and I hate it. Also, I didnt aactually check to make sure the username that was POSTed doesnt already exist, which is going to add yet another callback (Actually, in this case, a .then). Too many callback and .thens. I want to use async/await to clean this up. Check this out.

```javascript
app.post("/signup", async (req, res, next) => {
  try {
    const db = req.app.get("db");

    const { username, password } = req.body;

    const isUniqueUsername = (await db.find_user(username).length) === 0;

    // If the username is not unique, throw the error, which will be handled by the error handler
    if (isUniqueUsername) {
      throw {
        message: "User with that username already exists",
        statusCode: 400 // TODO: Find more approprite status code
      };
    }

    // Create user record
    const salt = 10;

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await db.create_user(username, hashedPassword);

    // End create user record

    // JWT configuration
    const secret =
      "aTk0M3F5NXR1Zzh3cmlwZXN0amYyOTgzNHdpb1tldTVyanFmY2lwcmVkeGdudnJtY2llYWsnd2x3"; //Change this and put in .env

    const iat = Date.now() / 1000;

    const jwtid = Math.random()
      .toString(36)
      .substring(7);

    const audience = "test";

    const data = newUser[0].id;

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

    // Get the token and send to user
    const token = jwt.sign(payload, secret, options);

    return res.status(200).send(token);
  } catch (error) {
    return next(error);
  }
});
```

## Uh oh! I've run into a problem that I cant seem to figure out.

#### I've done a bit of work on the signup page by now, and I've tested my POST /signup route in postman several times and have been getting back correct error messages and status codes for each of the "sign in stories" I can think of. (Username taken, invalid input, incorerct password pattern etc), but I'm not getting the error back when tested in the browser. I just get a default "400" code with none of my custom error messages. When I make POST to /signup with everything in order, I get the token back as planned, but I'm not getting the error messages. I'm suspecting that this has something to do with my error handler.

#### \*_Pulls out rubber duck_ \*

#### This is my error handler

```javascript
app.use(function (err, req, res, next) {
  return res
    .status(err.statusCode || 500)
    .send({ message: err.message || "Internal Server Error" }))
});

```

#### I just want to take the error that was passed and send it back to the browser with either a custom error message for errors I anticipated, and a generic 500 internal serer error when something that I did NOT anticipate happens. So, for example, when I try to POST an empty form to /signup, I want the response to the browser to be: 

```javascript 
{
    "message": "Please check username and password requirments and try again"
}
```
#### But its not. I even console.logged the error in the server RIGHT before its sent to the browser, and I get exactly what I am looking for... but when I actually want to read that error in the browser, it is nowhere to be found. This is my request: 

```javascript 

    axios
      .post(this.state.submitUrl, { username, password })
        .then(res => {
            //Everything here works fine
            // Axios automatically puts your response body in res.data
            const { token } = res.data;
        if (token) {
          alert(token);
          } 
          
      })
        .catch(err => {

            // I want my error messages here. 

      });
```

#### Figured it out!!! It turns out the error sent from the server is not  directly passed into the catch as I thought it was. In this example, the actual error message I am looking for is hidden inside err.response.data. The mistake I made when debugging this was console.logging Object.keys.call(err), which I should have realized wouldnt work. Doing it this way is just the same as saying Object.keys() with no arguments, but binding the err to the functions *this*. I'm just gonna brush that one off as a brain fart and move on.

### Now that thats been sorted out, I need to actually *do* something with these responses. In the event a token is sent to the browser, I need to save it in local storage, then redirect the user to the homepage.  If an error is sent back, I think a little popup with the error message will do just fine. I also need to make sure the token is sent via headers to the server with each request to the server. I will need to do some configuration on my axios requests. 

