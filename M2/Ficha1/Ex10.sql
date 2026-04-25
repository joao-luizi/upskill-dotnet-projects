--  Find the Total Number of Units Ordered of Product ID 3
use Northwind
SELECT SUM(Quantity) AS [ Total Number of Units Ordered ]  FROM [Order Details] WHERE ProductID = 3