-- Create a report showing the title of courtesy and the first and last name of all employees whose
-- title of courtesy begins with "M"
use Northwind
SELECT TitleOfCourtesy, FirstName, LastName  FROM Employees WHERE SUBSTRING(TitleOfCourtesy, 1, 1) = 'M'