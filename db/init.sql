drop table if exists TeamMembers;
drop table if exists messages;
drop table if exists channels;
drop table if exists teams;
drop table if exists users;

create table users
(
    id serial primary key,
    username varchar(25) not null UNIQUE,
    password varchar(250) not null
);

create table teams
(
    id serial primary key,
    name varchar(25) not null UNIQUE,
    owner varchar(25) references users(username)
);

create table channels
(
    id serial primary key,
    owner integer references users(id),
    name varchar(25) not null,
    team_id integer references teams(id)
);

create table messages
(
    id serial primary key,
    user_id integer references users(id),
    body varchar(250),
    channel_id integer references channels(id)
);

create table TeamMembers
(
    username varchar(25) references users(username),
    team_name varchar(25) references teams(name)
);