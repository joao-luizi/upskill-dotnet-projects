--  Find the number of sales representatives in each city that contains at least 2 sales
-- representatives. Order by the number of employees.
use Northwind
SELECT Count(*) AS NumberEmployees, City FROM Employees 
WHERE Title = 'Sales Representative'
Group By City HAVING Count(*) >= 2
ORDER BY NumberEmployees

