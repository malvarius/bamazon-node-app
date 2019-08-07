DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE customer_products (
item_id INT AUTO_INCREMENT PRIMARY KEY,
product_name varchar(100) NOT NULL,
department_name varchar(50) NOT NULL,
price INT NOT NULL,
stock INT NOT NULL
);

insert into customer_products
(product_name, department_name,price,stock)
values
("soccer ball","sports", 15,100),
("baseball glove","sports", 40,50),
("iPhone","electronics", 300,4),
("Nintendo Switch","electronics", 275,40),
("LG TV","electronics", 750,20),
("Pop Socket","accessories", 5,400),
("Earrings","accessories", 10,100),
("Wrist Band","accessories", 2,100),
("Harry Potter","movies", 20,150),
("Jurassic Park","movies", 20,150);