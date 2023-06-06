create table users(uid varchar(25) primary key, name varchar(255), email varchar(255), password varchar(255));

create table sessions(sid varchar(25) primary key, uid varchar(25), foreign key(uid) references users(uid));