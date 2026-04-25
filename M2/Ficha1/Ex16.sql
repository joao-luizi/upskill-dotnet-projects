-- Create a report showing the Order ID, the name of the company that placed the order and the
-- first and last name of the associated employee. Only show orders placed after January 1, 1998
-- that shipped after they were required. Sort by Company Name.
use Northwind
SELECT  Orders.OrderID, Customers.CompanyName, Employees.FirstName, Employees.LastName from Employees INNER Join Orders ON Employees.EmployeeID = Orders.EmployeeID INNER JOIN Customers ON Customers.CustomerID = Orders.CustomerID
WHERE Orders.OrderDate > 'January 1, 1998' AND (Orders.RequiredDate > Orders.OrderDate) 
ORDER By Customers.CompanyName
