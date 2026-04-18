# CSU 34041 – Information Management II

## 2. Database Architecture

**Instructor:** Yvette Graham  
**Email:** yvette.graham@tcd.ie

---

## Overview

This lecture covers four main topics:

1. **Database System** — What constitutes a database system
2. **Database Architecture** — The three-level DBMS architecture
3. **Database Schemas** — Internal, conceptual, and external schemas
4. **Database Components** — The internal components of a DBMS

---

## 1. Database Systems

### What is a Database System (DBS)?

A **Database System (DBS)** consists of three core components:

- **DBMS** — The Database Management System software
- **DB** — The database itself, comprising:
  - Application data
  - Associated metadata
- **Application programs**

A key principle: **metadata and data are stored separately.**

---

## The Spreadsheet Problem

A single spreadsheet to store data about the real world quickly gets unwieldy and unmanageable.

We need something that doesn't lose the simplicity of a spreadsheet but can handle basic relationships between different entities in real-world data.

> Example source: [Lucid Software](https://www.youtube.com/@lucid_software)

---

## 2. Database Architecture

### Three-Level DBMS Architecture

Database users are provided an **abstract view** of the data by hiding certain details of how it is physically stored.

A DBMS describes databases at three levels:

| Level | Description |
|-------|-------------|
| **Internal (Physical) Level** | Lowest level — how data is physically stored and organized on the storage medium |
| **Conceptual (Logical) Level** | Logical structure of the entire database — what data is stored and relationships among data |
| **External (View) Level** | Highest level — individual user's view of the database |

This is commonly referred to as the **"three-level DBMS architecture."**

---

## The Three Levels in Detail

### Internal (Physical) Level

The **lowest level of data abstraction.**

- The **Internal Schema** describes how the data is physically stored and organized on the storage medium.
- Various aspects are considered to achieve optimal runtime performance and storage space utilization, including:
  - Storage space allocation techniques
  - Access paths such as indexes
  - Data compression and encryption techniques

### Conceptual (Logical) Level

Deals with the **logical structure of the entire database.**

- The **Conceptual Schema** describes what data is stored in the database and the relationships among the data, **without any concern for the physical implementation.**
- This is the **overall view** of the database and includes all the information that is going to be represented in the database.

### External (View) Level

The **highest level of abstraction** that deals with the user's view of the database.

- Most users and applications do **not** require access to the entire data stored in the database.
- **External Schemas** (or User Views) describe a part of the database for a particular group of users or applications.
- This is a **powerful and flexible security mechanism**, as parts of the database are hidden from certain users.
- The user is **not aware** of the existence of any attributes that are missing from their view.

---

## 3. Database Schemas

Each level of the architecture consists of one or more **views** of the underlying data. Views are described by **schemas** (meta-data).

A database consists of physical data organized into:

- An **internal schema** (aka physical schema)
- A **conceptual schema**
- **Several external schemas**

---

## 4. Database Components

### DBMS Users

Four main types of users, each typically using different interfaces:

| User Type | Description |
|-----------|-------------|
| **Casual Users** | Occasionally access the database; use interactive query interfaces |
| **Application Programmers** | Write programs (Java, C++, etc.) that need to access the database |
| **Parametric Users** | Use compiled transactions and supply parameters; don't write their own commands |
| **DBA Staff** | Database Administrators with full privileges |

### DDL (Data Definition Language) Components

- The **DDL compiler** processes schema definitions and stores them in the **catalogue**.
- The **Catalogue** contains information such as:
  - Names and sizes of files
  - Names and data types of data items
  - Storage details
  - Mapping information among schemas
  - Constraints

### Storage & Physical Database Components

- The physical database is usually stored on **hard disk**.
- The **OS controls disk access**.
- The **Stored Data Manager (SDM)** controls access to DBMS information on disk, including buffer management.

### Interactive Query Components

For **casual users** using an interactive query interface:

1. The **Query Compiler** parses and validates the submitted query
2. The internal query is processed for **Query Optimization**
3. The optimizer **consults the DBMS Catalogue**
4. The system **generates executable code**

### Programmer Interface Components

For **application programmers** writing programs in host languages (Java, C++, etc.):

1. The **Precompiler** extracts DML commands from the host language program
2. The extracted commands are sent to the **DML Compiler**
3. The rest of the program is sent to the **Host Language Compiler**

### Compiled Application Components

- Object code for DML commands and the rest of the program are **linked**, forming a **canned transaction**.
- The executable code of a canned transaction calls the **run-time processor**.
- Canned transactions are used by **parametric users** (e.g., providing a customer ID to look up a phone number).

### Runtime Components

The **Run-time Database Processor** handles all database access at run-time:

- Privileged commands
- Executable queries
- Canned transactions
- Utilises and updates the **Catalogue**
- May be responsible for **Buffer Management**
- Manages **Concurrency Control** and **Backup and Recovery** as part of Transaction Management

---

## System Catalog & Data Dictionary

### System Catalogue vs. Data Dictionary

- The **DDL** (and hence the system catalogue) is primarily concerned with the **syntactic definition** of the data.
- **Data Dictionaries** augment the internal DBMS catalogue with **semantic support** (meaning, relationships, origin, usage, format).
- Data Dictionaries are accessed directly by users (e.g., DBAs).
- The Catalogue is accessed by the DBMS itself.

### Coupling Approaches

There are two main ways of coupling Data Dictionaries and System Catalogues:

#### Integrated Data Dictionary

- The majority of DBMS have an **integrated Data Dictionary**.
- The Data Dictionary is an **integral part of the DBMS**.
- It documents the meta-data that is managed by the DBMS.
- It is generally **fully active** — accessed at run-time by DBMS software.

#### Independent Data Dictionary

- An **independent, free-standing system** performing its own data management functions.
- Normally **passive** — no run-time link between the Data Dictionary and the DBMS.
- Hence the DBMS must have its own **System Catalogue**.
- Often generates metadata automatically for a variety of DBMS in the form of DDL.
- Helps ensure consistency of metadata between the Data Dictionary and the System Catalogue.

---

## Data Dictionary System (DDS)

A fully functional Data Dictionary System should store and manage the following **seven** things:

1. **Descriptions of the database schemas**

2. **Detailed information on physical database design**
   - Storage structures
   - Access paths
   - File and record sizes

3. **Descriptions of the types of database users**, their responsibilities and their access rights

4. **High-level descriptions of transactions**, applications and the relationships of users to transactions

5. **The relationship between database transactions and the data items** referenced by them

6. **Usage statistics** such as frequencies of queries and transactions and access counts to different portions of the database

7. **The history of any changes** made to the database and applications, and documentation that describes the reasons for these changes

---

## Summary

This lecture covered:

1. **Database System** — The components of a DBS (DBMS, DB, application programs)
2. **Database Architecture** — The three-level architecture (internal, conceptual, external)
3. **Database Schemas** — Internal, conceptual, and external schemas
4. **Database Components** — DDL, storage, user interfaces, query processing, runtime components

---

*Lecture by Yvette Graham — CSU 34041 Information Management II*