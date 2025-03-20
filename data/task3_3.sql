-- TODO Task 3
CREATE DATABASE IF NOT EXISTS mock1;

USE mock1;

CREATE TABLE IF NOT EXISTS orders(
    order_id VARCHAR(255) not null primary key,
    date DATE,
    name VARCHAR(255) not null,
    address VARCHAR(255) not null,
    priority boolean,
    comments VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS carts(
    id int not null auto_increment primary key,
    order_id VARCHAR(255) not null,
    product_id VARCHAR(255)not null,
    name VARCHAR(255)not null,
    quantity INT not null,
    price decimal(15,2) not null,   
    constraint fk_order_id foreign key(order_id) references orders(order_id) on delete cascade
);