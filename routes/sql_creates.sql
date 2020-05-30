-- CREATE DATABASE piper;
-- USE piper;
create table items(id integer,name varchar(100),price integer, stocks integer, priority integer, catogary varchar(100),  PRIMARY KEY(id));
create table carts(id integer, total_price integer , time_stamp varchar(100), PRIMARY KEY(id));
create table User(id integer, name varchar(100), email varchar(100), password varchar(100), cartid integer , billing_address varchar(500) , PRIMARY KEY(id),
FOREIGN KEY(cartid) REFERENCES carts(id));


create table item_cart(item integer,cart integer, PRIMARY KEY(item,cart) , FOREIGN KEY(item) REFERENCES items(id), FOREIGN KEY(cart) REFERENCES carts(id));

create table orders(id integer, cart integer, time_stamp varchar(100), PRIMARY KEY (id), FOREIGN KEY(cart) REFERENCES carts(id));
