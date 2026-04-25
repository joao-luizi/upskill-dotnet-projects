-- If the cost of freight is greater than or equal to $500.00, it will now be taxed by 10%. Create a
-- report that shows the order id and freight cost with this tax for all orders of $500 or more.
-- SELECT OrderID, Freight,  (Freight * 1.1) AS FreightCost  FROM Orders WHERE Freight >= 500
use Northwind
SELECT OrderID,  (Freight * 1.1) AS FreightCost  FROM Orders WHERE Freight >= 500