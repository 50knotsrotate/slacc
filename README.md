#### Hello. I am going to *try* and make a slack clone. I dont plan on copying the entire slack app pixel for pixel, but I want to at least build some of the basic functionality which might include: 

* User authentication (Perhaps 0auth?)
* Create teams
* Create channels
* Private messages
* File uploading
* Real time messaging

#### I literally have no idea how I am going to do this yet. But I can start with this: Each user has multiple teams. Each team has multiple channels. Each channel has multiple users, each user has multiple messages and a message belongs to only one user. Sure sounds a whole lot like a relational db. I think I may choose to go with Postgres here, but I guess we will see.

#### The rest of the app will be written in Node.js and React.js

#### But first - before I even do anything, I want to get a refresher on how web sockets work. ```https://socket.io/docs/``` Poked though this, now I just want to setup a quick chat app to make sure I can actually implement this without any problems. According to the docs, I need to setup an express server (Well, doesnt need to be express... but I like express), and than setup a connection on the front end as well. Luckily there are libraries to take care of most of this for me. In the command line (Of course making sure I am in the root directory and that react is all set up):  ``` mkdir server && cd server && touch app.js && npm install express socket.io socket.io-client ```