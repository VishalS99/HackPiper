create table carts
(
    id integer,
    total_price integer ,
    time_stamp varchar(100),
    PRIMARY KEY(id)
);
create table User
(
    id integer,
    name varchar(100),
    email varchar(100),
    password varchar(100),
    cartid integer ,
    billing_address varchar(500) ,
    PRIMARY KEY(id),
    FOREIGN KEY(cartid) REFERENCES carts(id)
);

create table orders
(
    id integer,
    cart integer,
    time_stamp varchar(100),
    PRIMARY KEY (id),
    FOREIGN KEY(cart) REFERENCES carts(id)
);
create table items
(
    id integer,
    name varchar(100),
    price integer,
    stocks integer,
    priority integer,
    category varchar(100),
    PRIMARY KEY(id)
);

create table item_cart
(
    item integer,
    cart integer,
    PRIMARY KEY(item,cart) ,
    FOREIGN KEY(item) REFERENCES items(id),
    FOREIGN KEY(cart) REFERENCES carts(id)
);


insert into carts
    (id,total_price,time_stamp)
values
    (1, 50, "1590833399"),
    (2, 150, "1590833399"),
    (3, 200, "1590833399"),
    (4, 350, "1590833399"),
    (5, 400, "1590833399"),
    (6, 450, "1590833399"),
    (7, 500, "1590833399"),
    (8, 550, "1590833399"),
    (9, 600, "1590833399"),
    (10, 650, "1590833399");

insert into User
    (id,name,email,password,cartid,billing_address)
values
    (1, "User 1", "user1@gmail.com", "pass1", 1, "loc1"),
    (2, "User 2", "user2@gmail.com", "pass2", 2, "loc2"),
    (3, "User 3", "user3@gmail.com", "pass3", 3, "loc3"),
    (4, "User 4", "user4@gmail.com", "pass4", 4, "loc4"),
    (5, "User 5", "user5@gmail.com", "pass5", 5, "loc5"),
    (6, "User 6", "user6@gmail.com", "pass6", 6, "loc6"),
    (7, "User 7", "user7@gmail.com", "pass7", 7, "loc7"),
    (8, "User 8", "user8@gmail.com", "pass8", 8, "loc8"),
    (9, "User 9", "user9@gmail.com", "pass9", 9, "loc9"),
    (10, "User 10", "user10@gmail.com", "pass10", 10, "loc10");


insert into items
    (id,name,price,stocks,priority,category)
values
    (1, "item1", 100, 10, 3, "medical"),
    (2, "item2", 500, 50, 2, "food"),
    (3, "item3", 1000, 300, 1, "other"),
    (4, "item4", 5000, 2, 3, "medical"),
    (5, "item5", 1200, 1000, 2, "food"),
    (6, "item6", 1500, 0, 1, "other"),
    (7, "item7", 700, 200, 3, "medical"),
    (8, "item8", 15000, 100, 1, "other"),
    (9, "item9", 1000, 0, 3, "medical"),
    (10, "item10", 150, 1000, 3, "medical");


insert into orders
    (id,cart,time_stamp)
values
    (1, 2, "1590833399"),
    (2, 3, "1590833399"),
    (4, 5, "1590833399"),
    (3, 6, "1590833399"),
    (5, 1, "1590833399"),
    (6, 7, "1590833399"),
    (8, 4, "1590833399"),
    (9, 9, "1590833399"),
    (10, 10, "1590833399");

insert into item_cart
    (item,cart)
values
    (1, 2),
    (1, 5),
    (1, 3),
    (2, 4),
    (5, 10),
    (6, 1),
    (6, 3),
    (7, 10),
    (7, 3),
    (8, 9),
    (3, 4),
    (4, 4);

select *
from User;
select *
from carts;
select *
from items;
select *
from orders;
select *
from item_cart;