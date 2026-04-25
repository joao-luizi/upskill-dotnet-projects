# UpSkill Escola Delite – SQL Sample Project

![Database](https://img.shields.io/badge/Database-SQL%20Server-blue)
![Status](https://img.shields.io/badge/Status-Ready-brightgreen)

## Overview

This project provides a **fully seeded SQL Server database** for academic and development purposes. It includes:

- Tables with constraints, keys, and identity columns  
- Stored procedures (SPs) and functions  
- Sample data for students, teachers, and contacts  
- Example queries demonstrating requested operations  

> ⚠️ **Note:** This project is intended for **testing, academic exercises, and demonstration purposes only**, not for production.

---

## Setup Instructions

You have **two options** to get started:

### Option 1 – Restore Backup
1. Restore the database from the backup file: `upsk_joao_delite.bak`.
2. Open SQL Server Management Studio (SSMS) and verify the database is restored successfully.

### Option 2 – Create Database from Script
1. Create a new database with any name you choose.  
2. Execute the `Setup_Database.sql` script.  
   This will create:
   - All required tables, columns, constraints, and keys  
   - Seed data  
   - Stored procedures and functions  

> ✅ After completing either option, your database will be fully set up with all objects and sample data.

---

## Example Operations

The `Procedures_List.sql` file demonstrates all example operations. Here are some highlights:

| Ex | Description | Example |
|----|-------------|---------|
| 1  | List students and teachers with invalid emails or phone numbers | `EXEC Ex_Contactos_VerificarInvalidos` |
| 2  | List students who have siblings enrolled | `EXEC Ex_Alunos_ObterIrmaos` |
| 3  | Get the honor roll for a given year | `EXEC Ex_Alunos_ObterQuadroDeHonra 2000` |
| 4  | Get the N most senior teachers | `EXEC Ex_Professores_ObterMaisAntigos 2` |
| 5  | Show the number of students per year and course | `EXEC Ex_Alunos_ObterPorAnoECurso` |
| 6  | Maintain a history of students’ pass/fail per year | `EXEC Ex_Alunos_ObterHistoricoNotas` |
| 7  | Register a new student | `EXEC Ex_Aluno_Inserir @NIF='222333444', @FirstName='Jose', @LastNAme='Silva', @DOB='2010-08-21'` |
| 8  | Register a new teacher | `EXEC Ex_Professor_Inserir @NIF='333444555', @FirstName='Maria', @LastNAme='Grilo', @DOB='1980-08-21'` |
| 9  | Terminate a teacher’s employment | `EXEC Ex_Professor_Cessar 2` |
| 10 | Transfer a student to another school | `EXEC Ex_Aluno_Transferir 2` |
| 11 | Automatically register data for a new school year | `EXEC Ex_AnoLetivo_CriarComDependencias @Year=2001` |

---

## Notes

- Stored procedures are **idempotent** where possible — safe to execute multiple times.  
- IDs for tables with identity columns are **auto-generated**.  
- Designed primarily for **academic demonstration and testing**.  
- Always check data consistency when rerunning scripts on the same database.

---

## TODO / Planned Enhancements

The following features were intentionally identified but not implemented, either to keep the project scope manageable or to allow future exploration of business rules and design decisions.

### Teaching Assignment & Class Management
- **Stored Procedure `Professor_AplicarATurma`**  
  Assigns a teacher to a class (`Turma`) using the existing relationship table.  
  This procedure would encapsulate validation rules such as:
  - Teacher active status  
  - Duplicate assignment prevention  
  - Academic year consistency  

- **`HorariosDaTurma` Table**  
  Defines room and time-slot occupation for each class.  
  Intended to support:
  - Conflict detection (room or class overlap)  
  - Scheduling and availability logic  
  - Future integration with teacher workload rules  

### Course and Curriculum Modularization
- **Course decomposition into modules / subjects (`Cadeiras`)**  
  Courses would be structured as a set of modules with defined duration and academic weight.

- **Teacher assignment at module level**  
  A teacher could be assigned:
  - To an entire class, or  
  - To one or more modules within a course,  
  depending on the defined business rules.

### Academic Coordination
- **Course Coordinator role**
  - Ability to assign one or more coordinators to a course  
  - Supports shared coordination or responsibility per module  

### Scope Note
These items were left out deliberately to:
- Keep the database focused on core academic operations  
- Avoid over-engineering without clearly defined business rules  
- Leave room for future iterations and architectural discussion  

## File Structure
```
Project Files:
├── EscolaDELITE.pdf             # Exercise Subject
├── Setup_Database.sql           # Script to create DB, tables, constraints, keys, SPs, and functions
├── Procedures_List.sql          # Example procedure calls
├── upsk_joao_delite.bak         # Optional prebuilt backup
├── DiagramaCompleto.png         # Diagrama Relacional da Base de Dados
├── AutoAvaliacao_JoaoLuizi.xlsx # Ficha de AutoAvaliação
└── README.md                    # Project documentation
```


---

## License

This project is for **educational purposes** only. Use at your own discretion.
