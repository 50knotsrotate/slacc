insert into teams(name, owner) values($1, $2);

select * from TeamMembers tm where tm.name.username = $1 returning *;