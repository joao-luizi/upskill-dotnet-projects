--  Create a report showing employee orders.
use Northwind
SELECT  Employees.EmployeeID, FirstName, LastName, OrderID from Employees INNER Join Orders ON Employees.EmployeeID = Orders.EmployeeID

