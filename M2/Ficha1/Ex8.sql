-- Create a report that shows the company name, contact title, city and country of all customers
-- in Mexico or in any city in Spain except Madrid.
use Northwind
SELECT CompanyName, ContactTitle, City, Country  FROM Customers WHERE Country = 'Mexico' OR (Country = 'Spain' AND City <> 'Madrid')