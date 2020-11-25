CREATE TYPE role AS ENUM ('buyer', 'merchant', 'admin');

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  password VARCHAR(200) NOT NULL,
  first_name VARCHAR(15) DEFAULT '',
  last_name VARCHAR(15) DEFAULT '',
  email VARCHAR(30) DEFAULT '',
  address VARCHAR(200) DEFAULT '',
  user_role role DEFAULT 'buyer'
);

CREATE TABLE categories (
  category_id SERIAL PRIMARY KEY,
  category_name VARCHAR(30) DEFAULT ''
);

CREATE TABLE products (
  product_id SERIAL PRIMARY KEY,
  product_name VARCHAR(80) DEFAULT '',
  description VARCHAR(5000) DEFAULT '',
  price DECIMAL(10, 2) DEFAULT 0.00,
  stockQty INT DEFAULT 0,
  category_id INT REFERENCES categories(category_id)
  created_at DATE,
  cover VARCHAR(200) DEFAULT 'images/default.png',
  soldQty INT DEFAULT 0
);

CREATE TABLE carts (
  cart_id SERIAL UNIQUE PRIMARY KEY,
  user_id INT REFERENCES users(user_id)
);

CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  created_date DATE NOT NULL,
  user_id INT REFERENCES users(user_id)
);

CREATE TABLE orderDetails (
  order_id REFERENCES orders(order_id),
  delivery_address VARCHAR(200) NOT NULL,
  billing_address VARCHAR(200) NOT NULL
)

CREATE TABLE payments (
  payment_id SERIAL PRIMARY KEY,
  total DECIMAL(10,2) DEFAULT 0.0,
  user_id INT REFERENCES users(user_id),
  order_id INT REFERENCES orders(order_id)
);


CREATE TABLE lineItems (
  cart_id INT REFERENCES carts(cart_id),
  product_id INT REFERENCES products(product_id),
  quantity INT NOT NULL DEFAULT 0
);

CREATE FUNCTION trigger_function()
   RETURNS TRIGGER
   LANGUAGE PLPGSQL
AS $$
BEGIN
INSERT INTO carts (user_id) VALUES (new.user_id);
END;
$$

CREATE TRIGGER cartForUser
   AFTER INSERT
   ON users
   FOR EACH ROW
   EXECUTE PROCEDURE trigger_function();

CREATE FUNCTION lineItemQuantityCheck()
  RETURNS TRIGGER
  LANGAGE PLPGSQL
AS $$
DECLARE stock INT;
BEGIN

  SELECT stockQty INTO stock from products WHERE product_id = NEW.product_id);

  IF NEW.quantity > stock THEN
    RAISE EXCEPTION 'Not enough in stock';
  END IF;

END
$$

CREATE TRIGGER lineItemQuantityCheck
  BEFORE INSERT OR UPDATE
  ON lineItems
  FOR EACH ROW
  EXECUTE PROCEDURE lineItemQuantityCheck();

  CREATE OR REPLACE FUNCTION getProductsByCategory(category_id int)
  RETURNS TABLE(product_name VARCHAR, description VARCHAR, price DECIMAL, stockQty INT, category_name VARCHAR) AS $$
    SELECT products.product_name, products.description, products.price, products.stockQty, categories.category_name
      FROM products
      INNER JOIN categories ON categories.category_id = products.category_id
      WHERE categories.category_id = $1;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION getProducts()
  RETURNS TABLE(product_name VARCHAR, description VARCHAR, price DECIMAL, stockQty INT, category_name VARCHAR) AS $$
  SELECT products.product_name, products.description, products.price, products.stockQty, categories.category_name
    FROM products
    INNER JOIN categories ON categories.category_id = products.category_id;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION getProducts() RETURNS SETOF products AS $$
  SELECT products.product_name, products.description, products.price, products,stockQty, categories.name FROM products INNER JOIN categories ON categories.category_id = products.category_id;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.created_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON todos
  FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();

    CREATE FUNCTION cartForUser()
      RETURNS TRIGGER
      LANGUAGE PLPGSQL
      AS $$
    BEGIN
      INSERT INTO carts (user_id) VALUES (new.user_id);
    END;
    $$

    CREATE TRIGGER cartForUser
       AFTER INSERT
       ON users
       FOR EACH ROW
        EXECUTE PROCEDURE cartForUser();
