-- Create a report showing the first and last name of all sales representatives who are from Seattle
-- or Redmond.
use Northwind
SELECT FirstName, LastName  FROM Employees WHERE Title = 'Sales Representative' AND (City = 'Seattle' OR City = 'Redmond')