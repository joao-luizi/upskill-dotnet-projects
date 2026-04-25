USE [Northwind]
GO

UPDATE [dbo].[Customers]
   SET [CustomerID] = <CustomerID, nchar(5),>
      ,[CompanyName] = <CompanyName, nvarchar(40),>
      ,[ContactName] = <ContactName, nvarchar(30),>
      ,[ContactTitle] = <ContactTitle, nvarchar(30),>
      ,[Address] = <Address, nvarchar(60),>
      ,[City] = <City, nvarchar(15),>
      ,[Region] = <Region, nvarchar(15),>
      ,[PostalCode] = <PostalCode, nvarchar(10),>
      ,[Country] = <Country, nvarchar(15),>
      ,[Phone] = <Phone, nvarchar(24),>
      ,[Fax] = <Fax, nvarchar(24),>
 WHERE <Search Conditions,,>
GO


