insert into teams(name, owner) values($1, $2);

select * from TeamMembers tm where tm.username = $2;