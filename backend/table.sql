create table user(
    id int primary key auto_increment,
    name varchar(255) not null,
    contact varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    status varchar(20),
    role varchar(20),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
    UNIQUE(email)
);
insert into user(name,contact,email,password,status,role)
values('admin','1234567890','admin@gmail.com','admin','active','admin');