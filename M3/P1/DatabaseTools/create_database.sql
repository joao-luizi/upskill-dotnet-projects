USE [master];
GO

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'M3_ProjectI_JML')
BEGIN
    CREATE DATABASE [M3_ProjectI_JML];
END
GO

ALTER DATABASE [M3_ProjectI_JML] SET COMPATIBILITY_LEVEL = 160;
GO

USE [M3_ProjectI_JML];
GO

CREATE TABLE [dbo].[Marcas](
    [IDMarca] INT IDENTITY(1,1) PRIMARY KEY,
    [Nome] NVARCHAR(50) NOT NULL
);

CREATE TABLE [dbo].[Modelos](
    [IDModelos] INT IDENTITY(1,1) PRIMARY KEY,
    [Modelo] NVARCHAR(50) NOT NULL
);

CREATE TABLE [dbo].[Users](
    [ID_User] BIGINT IDENTITY(1,1) PRIMARY KEY,
    [UserName] NVARCHAR(50) NOT NULL,
    [PassWord] NVARCHAR(50) NOT NULL,
    [Role] NVARCHAR(10) NOT NULL
);

CREATE TABLE [dbo].[Veiculos](
    [VeiculoID] BIGINT IDENTITY(1,1) PRIMARY KEY,
    [MarcaID] INT NOT NULL,
    [ModeloID] INT NOT NULL,
    [Ano] INT NOT NULL,
    [Vendido] BIT NOT NULL DEFAULT 0
);

CREATE TABLE [dbo].[Inspecoes](
    [InspecoesID] BIGINT IDENTITY(1,1) PRIMARY KEY,
    [VeiculoID] BIGINT NOT NULL,
    [DataDeInspecao] DATETIME NOT NULL,
    [Resultado] BIT NOT NULL
);

ALTER TABLE [dbo].[Veiculos]
ADD CONSTRAINT FK_Veiculos_Marcas
FOREIGN KEY (MarcaID) REFERENCES [dbo].[Marcas](IDMarca);

ALTER TABLE [dbo].[Veiculos]
ADD CONSTRAINT FK_Veiculos_Modelos
FOREIGN KEY (ModeloID) REFERENCES [dbo].[Modelos](IDModelos);

ALTER TABLE [dbo].[Inspecoes]
ADD CONSTRAINT FK_Inspecoes_Veiculos
FOREIGN KEY (VeiculoID) REFERENCES [dbo].[Veiculos](VeiculoID);

IF NOT EXISTS (SELECT 1 FROM dbo.Users)
BEGIN
    SET IDENTITY_INSERT dbo.Users ON;
    INSERT INTO [dbo].[Users] (ID_User, UserName, PassWord, Role) VALUES
    (1, 'admin', '123456', 'admin'),
    (2, 'user', '123456', 'user');
    SET IDENTITY_INSERT dbo.Users OFF;
END

IF OBJECT_ID('dbo.SeedDatabase', 'P') IS NOT NULL
    DROP PROCEDURE dbo.SeedDatabase;
GO

CREATE PROCEDURE dbo.SeedDatabase
AS
BEGIN
    SET NOCOUNT ON;

   IF EXISTS (SELECT 1 FROM Marcas)
        RETURN;

   SET IDENTITY_INSERT dbo.Marcas ON;
   INSERT INTO [dbo].[Marcas] (IDMarca, Nome) VALUES
    (1, 'Toyota'),
    (2, 'Honda'),
    (3, 'Ford'),
    (4, 'BMW'),
    (5, 'Mercedes'),
    (6, 'Volkswagen'),
    (7, 'Renault'),
    (8, 'Peugeot'),
    (9, 'Hyundai'),
    (10, 'Kia');
	SET IDENTITY_INSERT dbo.Marcas OFF;

	SET IDENTITY_INSERT dbo.Modelos ON;
    INSERT INTO [dbo].[Modelos] (IDModelos, Modelo) VALUES
    (1, 'Corolla'),
    (2, 'Civic'),
    (3, 'Focus'),
    (4, 'Serie 1'),
    (5, 'A180'),
    (6, 'Golf'),
    (7, 'Clio'),
    (8, '208'),
    (9, 'i20'),
    (10, 'Rio');
	SET IDENTITY_INSERT dbo.Modelos OFF;


    SET IDENTITY_INSERT dbo.Veiculos ON;
    INSERT INTO [dbo].[Veiculos] (VeiculoID, MarcaID, ModeloID, Ano, Vendido) VALUES
    (1, 1, 1, 2020, 0),
    (2, 2, 2, 2019, 1),
    (3, 3, 3, 2021, 0),
    (4, 4, 4, 2018, 1),
    (5, 5, 5, 2020, 1),
    (6, 6, 6, 2017, 0),
    (7, 7, 7, 2022, 1),
    (8, 8, 8, 2021, 1),
    (9, 9, 9, 2019, 0),
    (10, 10, 10, 2020, 1);
    SET IDENTITY_INSERT dbo.Veiculos OFF;
    -- Inspecoes
    INSERT INTO [dbo].[Inspecoes] (VeiculoID, DataDeInspecao, Resultado) VALUES
    (1, '2025-01-10', 1),
    (2, '2023-09-05', 1),
    (3, '2024-02-12', 1),
    (4, '2023-06-22', 1),
    (9, '2026-04-06', 1),
    (6, '2026-04-06', 1);

END;
GO