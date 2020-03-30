insert into teams(name, owner) values($1, $2);

insert into TeamMembers(team_name, username) values($1, $2);

select * from TeamMembers where TeamMembers.username = $2;