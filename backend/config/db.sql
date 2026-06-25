create table users(
id INT auto_increment primary KEY,
name varchar(255) not null,
email varchar(255) not null unique,
password varchar(255) not null,
age int
);