-- Create a report that shows, by product name, the total quantity of products (from the
-- Order_Details table) ordered by product. Only show the 5 records corresponding to the
-- products which were less ordered for which the quantity ordered is fewer than 650.
use Northwind

SELECT TOP (5)ProductName, SUM ([Order Details].Quantity) As QTDY from [Order Details] INNER JOIN Products ON Products.ProductID = [Order Details].ProductID 
GROUP BY ProductName HAVING SUM ([Order Details].Quantity) < 650
Order BY QTDY, ProductName