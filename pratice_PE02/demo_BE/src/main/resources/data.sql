-- ==========================================
-- CATEGORIES
-- ==========================================

INSERT INTO dbo.categories (category_name)
VALUES ('Vegetables');

INSERT INTO dbo.categories (category_name)
VALUES ('Fruits');

INSERT INTO dbo.categories (category_name)
VALUES ('Meat');

INSERT INTO dbo.categories (category_name)
VALUES ('Seafood');

INSERT INTO dbo.categories (category_name)
VALUES ('Dairy');

INSERT INTO dbo.categories (category_name)
VALUES ('Grains');

INSERT INTO dbo.categories (category_name)
VALUES ('Spices');

INSERT INTO dbo.categories (category_name)
VALUES ('Oils');

INSERT INTO dbo.categories (category_name)
VALUES ('Nuts');

INSERT INTO dbo.categories (category_name)
VALUES ('Beverages');


-- ==========================================
-- INGREDIENTS
-- ==========================================

INSERT INTO dbo.ingredients
(entry_date, ingredient_name, price_from, price_to, producer_name, supplier, category_id)
VALUES ('2026-10-01', 'Carrot', 15000, 25000, 'Da Lat Farm', 'Fresh Market', 1);

INSERT INTO dbo.ingredients
(entry_date, ingredient_name, price_from, price_to, producer_name, supplier, category_id)
VALUES ('2026-10-01', 'Apple', 40000, 65000, 'Green Orchard', 'Fruit World', 2);

INSERT INTO dbo.ingredients
(entry_date, ingredient_name, price_from, price_to, producer_name, supplier, category_id)
VALUES ('2026-10-01', 'Chicken', 70000, 100000, 'Viet Poultry', 'Food Supply', 3);

INSERT INTO dbo.ingredients
(entry_date, ingredient_name, price_from, price_to, producer_name, supplier, category_id)
VALUES ('2026-10-01', 'Shrimp', 120000, 180000, 'Nha Trang Sea', 'Ocean Foods', 4);

INSERT INTO dbo.ingredients
(entry_date, ingredient_name, price_from, price_to, producer_name, supplier, category_id)
VALUES ('2026-10-01', 'Fresh Milk', 25000, 35000, 'Dairy Farm', 'Milk Shop', 5);

INSERT INTO dbo.ingredients
(entry_date, ingredient_name, price_from, price_to, producer_name, supplier, category_id)
VALUES ('2026-10-01', 'Rice', 18000, 30000, 'Mekong Rice', 'Rice Supply', 6);

INSERT INTO dbo.ingredients
(entry_date, ingredient_name, price_from, price_to, producer_name, supplier, category_id)
VALUES ('2026-10-01', 'Black Pepper', 80000, 120000, 'Highland Spice', 'Spice Store', 7);

INSERT INTO dbo.ingredients
(entry_date, ingredient_name, price_from, price_to, producer_name, supplier, category_id)
VALUES ('2026-10-01', 'Cooking Oil', 35000, 55000, 'Golden Oil', 'Grocery Store', 8);

INSERT INTO dbo.ingredients
(entry_date, ingredient_name, price_from, price_to, producer_name, supplier, category_id)
VALUES ('2026-10-01', 'Cashew', 150000, 220000, 'Binh Phuoc Nut', 'Nut House', 9);

INSERT INTO dbo.ingredients
(entry_date, ingredient_name, price_from, price_to, producer_name, supplier, category_id)
VALUES ('2026-10-01', 'Green Tea', 50000, 90000, 'Thai Nguyen Tea', 'Tea Shop', 10);


-- ==========================================
-- ACCOUNT
-- ==========================================
INSERT INTO dbo.account ([role], email, [password])
VALUES ('Admin', 'admin@example.com', 'Admin@123');

INSERT INTO dbo.account ([role], email, [password])
VALUES ('Staff', 'staff1@example.com', 'Staff@123');

INSERT INTO dbo.account ([role], email, [password])
VALUES ('Staff', 'staff2@example.com', 'Staff@123');

INSERT INTO dbo.account ([role], email, [password])
VALUES ('User', 'user1@example.com', 'User@123');

INSERT INTO dbo.account ([role], email, [password])
VALUES ('User', 'user2@example.com', 'User@123');

INSERT INTO dbo.account ([role], email, [password])
VALUES ('User', 'user3@example.com', 'User@123');

INSERT INTO dbo.account ([role], email, [password])
VALUES ('User', 'user4@example.com', 'User@123');

INSERT INTO dbo.account ([role], email, [password])
VALUES ('User', 'user5@example.com', 'User@123');

INSERT INTO dbo.account ([role], email, [password])
VALUES ('User', 'user6@example.com', 'User@123');

INSERT INTO dbo.account ([role], email, [password])
VALUES ('User', 'user7@example.com', 'User@123');