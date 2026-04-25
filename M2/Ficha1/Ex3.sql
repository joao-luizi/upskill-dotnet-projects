-- Create a report showing the first and last names of all employees who have a region specified.

use Northwind
SELECT FirstName, LastName, Region FROM Employees WHERE Region IS NOT NULL;