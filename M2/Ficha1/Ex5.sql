-- Create a report showing the first and last name of all employees whose last names start with
-- a letter in the last half of the alphabet. Sort by LastName in descending order
-- SELECT FirstName, LastName, SUBSTRING(LastName, 1, 1) AS Letter  FROM Employees
use Northwind
SELECT FirstName, LastName  FROM Employees WHERE SUBSTRING(LastName, 1, 1) IN ('m', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z')
ORDER BY LastName DESC