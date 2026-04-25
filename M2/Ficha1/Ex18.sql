--  Create a report showing all distinct countries stored in database
use Northwind

SELECT  Country FROM Customers
UNION
SELECT  Country FROM Suppliers
UNION 
SELECT ShipCountry FROM Orders
--Order by Country