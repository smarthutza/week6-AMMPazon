BEGIN;

DROP TABLE IF EXISTS products, customers, orders, basket CASCADE;



CREATE TABLE products (
 id           SERIAL PRIMARY KEY,
 name         VARCHAR(100) NOT NULL,
 price        INTEGER NOT NULL
);

CREATE TABLE customers (
  id          SERIAL PRIMARY KEY,
  firstname   VARCHAR(100) NOT NULL,
  surname     VARCHAR(100) NOT NULL
);

CREATE TABLE orders (
  id           SERIAL PRIMARY KEY,
  date         DATE NOT NULL,
  customer_id  INTEGER REFERENCES customers(id) ON UPDATE CASCADE
);

CREATE TABLE basket (
  id          SERIAL PRIMARY KEY,
  order_id    INTEGER REFERENCES orders(id) ON UPDATE CASCADE,
  product_id  INTEGER REFERENCES products(id) ON UPDATE CASCADE
);



INSERT INTO products(name, price) VALUES
  ('Car', 15),
  ('Motorbike', 10),
  ('Bicycle', 5)
RETURNING ID;

INSERT INTO customers(firstname, surname) VALUES
  ('John', 'Bigspender'),
  ('Cloe', 'Middlespender'),
  ('Jack', 'Lowspender')
RETURNING ID;

INSERT INTO orders(date, customer_id) VALUES
  ('01-12-2016', 1),
  ('01-01-2017', 2),
  ('01-02-2017', 3)
RETURNING ID;

INSERT INTO basket(order_id, product_id) VALUES
  (1, 1),
  (1, 2),
  (2, 2),
  (3, 3)
RETURNING ID;

COMMIT;
