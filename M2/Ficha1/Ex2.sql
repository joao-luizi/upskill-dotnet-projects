-- Create a report showing Northwind's orders sorted by Freight from most expensive to cheapest.
-- Show OrderID, OrderDate, ShippedDate, CustomerID and Freight

use Northwind
SELECT OrderID, OrderDate, ShippedDate, CustomerID, Freight FROM Orders ORDER BY Freight DESC