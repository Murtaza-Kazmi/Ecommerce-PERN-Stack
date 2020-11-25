INSERT INTO users(password, first_name, last_name, email, address)
 VALUES(1234, 'j1', 'jj1', 'aa1', 'bb1');

INSERT INTO users(password, first_name, last_name, email, address)
   VALUES(1234, 'j2', 'jj2', 'aa2', 'bb2');

INSERT INTO users(password, first_name, last_name, email, address)
   VALUES(1234, 'j3', 'jj3', 'aa3', 'bb3');

INSERT INTO users(password, first_name, last_name, email, address)
     VALUES(1234, 'j4', 'jj4', 'aa4', 'bb4');

INSERT INTO users(password, first_name, last_name, email, address)
     VALUES(1234, 'j5', 'jj5', 'aa5', 'bb5');


INSERT INTO categories(category_name) VALUES ('arts');
INSERT INTO categories(category_name) VALUES ('education');
INSERT INTO categories(category_name) VALUES ('entertainment');
INSERT INTO categories(category_name) VALUES ('tradition');

INSERT INTO products(product_name, price, stockQty,category_id, created_at, soldQty)
VALUES('sketchbook', 12, 100, 1, '12-NOV-2020', 9);

INSERT INTO products(product_name, price, stockQty,category_id, created_at, soldQty)
VALUES('sketchbook1', 13, 100, 2, '5-NOV-2020', 8);

INSERT INTO products(product_name, price, stockQty,category_id, created_at, soldQty)
VALUES('sketchbook2', 14, 100, 2, '20-NOV-2020', 1);

INSERT INTO products(product_name, price, stockQty,category_id, created_at, soldQty)
VALUES('sketchbook3', 15, 100, 3, '01-NOV-2020', 3);

INSERT INTO products(product_name, price, stockQty,category_id, created_at, soldQty)
VALUES('sketchbook4', 16, 100, 3, '25-NOV-2020', 0);

INSERT INTO carts(cart_id, user_id) VALUES(1, 1);
INSERT INTO carts(cart_id, user_id) VALUES(2, 2);
INSERT INTO carts(cart_id, user_id) VALUES(3, 3);
INSERT INTO carts(cart_id, user_id) VALUES(4, 4);

INSERT INTO orders(created_date, user_id) VALUES('12-NOV-2020', 1);

INSERT INTO orders(created_date, user_id) VALUES('13-NOV-2020', 2);

INSERT INTO orders(created_date, user_id) VALUES('14-NOV-2020', 3);

INSERT INTO orders(created_date, user_id) VALUES('15-NOV-2020', 4);

INSERT INTO payments(total, user_id, order_id) VALUES(120, 1, 1);

INSERT INTO payments(total, user_id, order_id) VALUES(120, 1, 1);
INSERT INTO payments(total, user_id, order_id) VALUES(125, 2, 2);
INSERT INTO payments(total, user_id, order_id) VALUES(130, 3, 3);

INSERT INTO payments(total, user_id, order_id) VALUES(150, 5, 4);

INSERT INTO lineItems(cart_id, order_id, product_id)
VALUES (1, 1, 1);

INSERT INTO lineItems(cart_id,  product_id)
VALUES (1, 2);

INSERT INTO lineItems(cart_id, product_id)
VALUES (2, 3);

INSERT INTO lineItems(cart_id, product_id)
VALUES (3, 4);
