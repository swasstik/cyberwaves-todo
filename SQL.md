1. Introduction to SQL

SQL stands for Structured Query Language. It is a specialized programming language designed to manage data stored in relational databases. SQL allows you to create, access, manipulate, and interact with data in a database.

2. Data Types, Primary-Foreign Keys & Constraints

Data Types: Data types define the type of data a column in a table can hold. Common data types include integers, strings, decimals, dates, etc.

Primary Key: A primary key is a column (or set of columns) that uniquely identifies each row in a table. A table can only have one primary key.

Foreign Key: A foreign key is a column (or set of columns) in one table that references the primary key of another table. Foreign keys are used to establish relationships between tables.

Constraints: Constraints are rules that enforce data integrity in a database. They can be used to specify data types, primary keys, foreign keys, and other rules.


#query
CREATE TABLE Customers (
  customer_id INT PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone_number CHAR(10)
);

CREATE TABLE Orders (
  order_id INT PRIMARY KEY,
  customer_id INT FOREIGN KEY REFERENCES Customers(customer_id),
  order_date DATE,
  order_total DECIMAL(10,2)
);
 

3.Create Table In SQL & Create Database

CREATE DATABASE:  This command is used to create a new database.

CREATE TABLE: This command is used to create a new table within a database. You can specify the columns of the table and their data types.

#query
CREATE DATABASE my_database;

USE my_database;

CREATE TABLE Products (
  product_id INT PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2),
  stock INT
);

4. INSERT UPDATE, DELETE & ALTER Table

INSERT INTO: This command is used to insert new rows of data into a table.

UPDATE: This command is used to modify existing data in a table.

DELETE: This command is used to remove rows of data from a table.

ALTER TABLE: This command allows you to modify the structure of an existing table. You can add, remove, or modify columns.


#query
INSERT INTO Products (product_name, price, stock)
VALUES ('T-Shirt', 19.99, 100),
       ('Laptop', 799.99, 25);

UPDATE Products SET price = price * 1.1 WHERE product_id = 1;  -- Increase price by 10%

DELETE FROM Products WHERE stock = 0;

ALTER TABLE Products ADD warranty_months INT;

5. SELECT Statement & WHERE Clause

SELECT: This is the fundamental command for retrieving data from a database. You can specify the columns you want to retrieve and from which tables.

WHERE Clause: The WHERE clause allows you to filter the results of your SELECT statement based on specific conditions.

#query
SELECT * FROM Products;  -- Select all columns from the Products table

SELECT product_name, price FROM Products WHERE price > 50;  -- Select products with price greater than 50

SELECT customer_name, email FROM Customers WHERE city = 'New York';

6.How To Import Excel File (CSV) to SQL

The method for importing data from a CSV file to SQL will vary depending on the specific database management system you are using. However, most systems provide tools or utilities to import data from external sources. Generally, you'll need to specify the file location and format, and map the data in the CSV file to the corresponding columns in your SQL table.

7. Functions in SQL and String Functions

SQL offers a variety of built-in functions that can be used to perform calculations, manipulate data, and format text. String functions are a specific type of function that allows you to work with text data.

#query
SELECT product_name, UPPER(product_name) AS uppercase_name FROM Products;  -- Convert product names to uppercase

SELECT customer_name, LEFT(email, 10) AS email_prefix FROM Customers; -- Extract the first 10 characters from email addresses

SELECT order_date, YEAR(order_date) AS order_year FROM Orders; -- Extract

8. Aggregate Functions & GROUP BY and HAVING Clauses

Aggregate Functions: Aggregate functions perform calculations on groups of data and return a single summarized value. Common aggregate functions include COUNT, SUM, AVG, MIN, and MAX.

GROUP BY: The GROUP BY clause is used in conjunction with aggregate functions to group rows of data based on shared values in one or more columns.

HAVING Clause: The HAVING clause is similar to the WHERE clause but is used to filter groups of data after the GROUP BY clause has been applied.

#query
SELECT category, COUNT(*) AS product_count FROM Products
GROUP BY category;  -- Count products by category

SELECT department, SUM(salary) AS total_salary
FROM Employees
GROUP BY department
HAVING total_salary > 100000; -- Find departments with total salary over 100000

SELECT order_date, COUNT(*) AS order_count
FROM Orders
GROUP BY YEAR(order_date)  -- Group orders by year
HAVING order_count > 1000; -- Find years with more than 1000 orders

9. Time Stamps, Date/Time Functions and EXTRACT Function

Time Stamps:  A timestamp is a data type that stores a specific point in time, including date and time.

Date/Time Functions: SQL provides various functions to work with date and time data. These functions allow you to extract specific parts of a timestamp (e.g., year, month, day), format dates, and perform calculations on date/time values.

EXTRACT Function: The EXTRACT function is used to extract specific parts (year, month, day, etc.) from a timestamp or date/time value.

#query
SELECT * FROM Orders WHERE order_date >= CURDATE() - INTERVAL 30 DAY; -- Find orders from the last 30 days

SELECT order_date, EXTRACT(YEAR FROM order_date) AS order_year, EXTRACT(MONTH FROM order_date) AS order_month
FROM Orders; -- Extract year and month from order dates

SELECT NOW();  -- Get the current date and time

10. JOINs in SQL

A JOIN operation combines data from two or more tables based on a related column. There are different types of joins used for various scenarios:

INNER JOIN: Returns only rows where there is a match in both tables based on the join condition.

LEFT JOIN: Returns all rows from the left table and matching rows from the right table. If there is no match in the right table, null values are returned for the right table columns.

RIGHT JOIN: Returns all rows from the right table and matching rows from the left table. If there is no match in the left table, null values are returned for the left table columns.

FULL JOIN: Returns all rows from both tables, including unmatched rows with null values in the non-matching columns.

#query
SELECT Customers.customer_name, Orders.order_date, Orders.order_total
FROM Customers
INNER JOIN Orders ON Customers.customer_id = Orders.customer_id;  -- Get customer names and order details

SELECT Employees.last_name, Departments.department_name
FROM Employees
LEFT JOIN Departments ON Employees.department_id = Departments.department_id; -- Get employee names and department names (including employees with no department assigned)

11. UNION & UNION ALL

UNION: Combines the results of two or more SELECT statements into a single result set. Duplicate rows are removed by default.

UNION ALL: Combines the results of two or more SELECT statements into a single result set, including duplicate rows.

#query
SELECT product_name FROM Products WHERE category = 'electronics'
UNION
SELECT product_name FROM Products WHERE category = 'clothing';  -- Combine products from two categories (excluding duplicates)

SELECT * FROM Customers
UNION ALL
SELECT * FROM Employees;  -- Combine all data from Customers and Employees tables (including duplicates)

12. Subqueries in SQL

A subquery is a SELECT statement nested within another SELECT statement. It allows you to retrieve data based on the results of another query.

#query
SELECT customer_name, order_date
FROM Customers
WHERE customer_id IN (
  SELECT customer_id
  FROM Orders
  WHERE order_total > 100
);  -- Find customers with orders over 100




