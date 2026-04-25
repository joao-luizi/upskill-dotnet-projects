--  Retrieve the number of employees in each city
use Northwind
SELECT COUNT(*) As EmployeeCount   FROM Employees Group By  City