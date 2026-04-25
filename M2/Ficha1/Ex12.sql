--  Retrieve the number of suppliers in each country
use Northwind
SELECT COUNT(*) As SupplierCount   FROM Suppliers Group By  Country