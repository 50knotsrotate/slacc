#### Hello. I am going to *try* and make a slack clone. I dont plan on copying the entire slack app pixel for pixel, but I want to at least build some of the basic functionality which might include: 

* User authentication (Perhaps 0auth?)
* Create teams
* Create channels
* Private messages
* File uploading
* Real time messaging

#### I literally have no idea how I am going to do this yet. But I can start with this: Each user has multiple teams. Each team has multiple channels. Each channel has multiple users, each user has multiple messages and a message belongs to only one user. Sure sounds a whole lot like a relational db. I think I may choose to go with Postgres here, but I guess we will see.

#### The rest of the app will be written in Node.js and React.js

#### But first - before I even do anything, I want to get a refresher on how web sockets work. ```https://socket.io/docs/``` Poked though this, now I just want to setup a quick chat app to make sure I can actually implement this without any problems. According to the docs, I need to setup an express server (Well, doesnt need to be express... but I like express), and than setup a connection on the front end as well. Luckily there are libraries to take care of most of this for me. In the command line (Of course making sure I am in the root directory and that react is all set up):  ``` mkdir server then cd server then touch app.js then npm install express socket.io socket.io-client ```

#### I've implemented web sockets in the past, and from past experience I can tell you that it is a WONDERFUL tool, but is a collasal pain in the butt to set up (I feel similarly about redux..). After some digging though old projects and documentation, I was able to get it all set up - The server can now communicate in real time with the client. There are SO MANY possibilities when wrking with sockets, it almost seems like a waste to use it for a chat app, but whatever. Now that I have got the annoying part out of the way, I now want to start building my database schema. 

#### Now I will have to start to define my tables. I will start with the user object, which might look something like this (These will probably change at some point, but I just want to get a rough idea of what these tables will look like):

#### USER
* id => primary key
* username => string, not null
* password => text

#### TEAM
* id => Primary key
* name => text not null
* owner => integer references user.id

#### CHANNEL
* id => primary key
* owner => integer references user.id
* team_id => integer references team.id
* socket_id => text

#### MESSAGE
* id => primary key
* user_id => integer references user.id
* body => text
* channel_id => integer references channel.id

#### I think that may be good enough for now

#### I have decided to use massive.js to handle my SQL queries. ```npm install massive```
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
