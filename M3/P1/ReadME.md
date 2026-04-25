# CarStand – Web API Refactor Project

## Overview

This project is a refactor of a previous CarStand application originally built using **HTML, CSS, and JavaScript**, where data persistence relied on `localStorage`.

The goal of this iteration was to redesign the application with a **proper backend architecture**, introducing a database and a Web API capable of supporting the same functionality in a more robust and scalable way.

---

## Objectives

The project focused on the following core goals:

1. Database creation  
2. Data modeling and normalization  
3. Backend API development  
4. Role-based access control (extra challenge)

---

## Database Design

The data model was normalized into the following entities:

- **Marcas** (Car Brands)  
- **Modelos** (Car Models)  
- **Inspecoes** (Car Inspections)  
- **Veiculos** (Vehicles)  
- **Users** (Authentication and Roles – added as an extension)

---

## Features

### Vehicle Operations

The Web API exposes endpoints supporting:

- **Search Vehicles**
  - Supports **multi-select filters** across:
    - Brand  
    - Model  
    - Year  
    - Sale status  
  - Unlike the original version (which used single-select filters), this implementation allows **multiple values per filter simultaneously**
  - This required more complex query construction to dynamically combine multiple filter criteria

- **Insert Vehicle**

- **Update Vehicle**

- **Delete Vehicle**

- **Clean Vehicle Database**
  - Removes all vehicle-related data (excluding users)

- **Reseed Database**
  - Repopulates the database with initial test data

---

## Authentication & Authorization

A simple authentication system was implemented as a personal extension to the project.

### Features

- Login / Logout  
- Session persistence via `localStorage` (auto-login)  
- Role-based authorization at endpoint level  

### Roles and Permissions

| Role   | Permissions |
|--------|------------|
| Guest  | Search |
| User   | Search, Insert Vehicle, Update Vehicle |
| Admin  | Search, Insert Vehicle, Update Vehicle, Clean DB, Reseed DB |

---

## Database Setup

To simplify setup and testing, a SQL script is included:

- **File:** `create_database.sql`  
- **Location:** `DatabaseTools/`  

### Script Responsibilities

- Creates a SQL Server database named:


- Initializes schema and seed data

> The database name was chosen to avoid conflicts with other projects.

---

## Solution Structure

### `CarStandWebAPI`
- Entry point of the application  
- Defines API endpoints  
- Contains service layer logic  

### `CarStandBusiness`
- Business layer  
- Contains:
  - Models  
  - DTOs  
  - Repository classes  

### `CarStandSite`
- Frontend application  
- Consumes the Web API  

### `DalPro`
- Data access layer  
- Wrapper over ADO.NET operations  
- Provided as part of the project  

### `DatabaseTools`
- Contains database setup scripts  
- Not a compiled project  

---

## Notes

- The project maintains functional parity with the original frontend-only version while improving architecture and data handling  
- The multi-select filtering system introduces additional flexibility and complexity in query handling compared to the original implementation  
- Authentication is intentionally simple and designed for learning purposes rather than production use  

---

## How to Run

1. Execute the SQL script located in:

DatabaseTools/create_database.sql

2. Run the Stored  Procedure SeedDatabase

3. Configure the connection string if necessary  

4. Run:

CarStandWebAPI

5. Open the frontend (`CarStandSite`) and interact with the API  


