# Information Management II

## 2. Database Architecture

**CSU 34041**

**Yvette Graham**  
yvette.graham@tcd.ie

---

## Overview

1. Database System
2. Database Architecture
3. Database Schemas
4. Database Components

---

## (1) Database Systems

---

### Database Systems

**Database System (DBS)** consists of:

- **DBMS** — the database management system software
- **DB** — the database itself
  - Application data
  - Associated metadata
- Application programs

> Metadata and data are stored separately.

---

### Example

_Example src: [YouTube](https://www.youtube.com/@lucid_software)_

A single spreadsheet to store data about the real world quickly gets unwieldy and unmanageable.

Need something that doesn't lose the simplicity of a spreadsheet but can handle basic relationships between different entities in real world data.

---

## (2) Database Architecture

---

### DBMS Architecture

- Database users are provided an **abstract view** of the data by hiding certain details of how it is physically stored.
- DBMS describe Databases at **three levels**:
  - **Internal (Physical) Level**
  - **Conceptual (Logical) Level**
  - **External (View) Level**

This is commonly referred to as the **"three-level DBMS architecture"**.

---

### 3-Level DBMS Architecture

<!-- Diagram slide -->

---

## (3) Database Schemas

---

### Schemas

- Each level of the architecture consists of one or more **views** of the underlying data.
- Views are described by **schemas** (meta-data).
- A DB consists of physical data:
  - An **internal schema** (aka physical schema)
  - A **conceptual schema**
  - Several **external schemas**

---

### Example Schema Levels

<!-- Diagram slide -->

---

## (2) DBMS Architecture (again)

---

### DBMS Architecture

#### Internal / Physical Level

- The **lowest level** of data abstraction.
- **Internal Schema** describes how the data is physically stored and organized on the storage medium.
- Various aspects are considered to achieve optimal runtime performance and storage space utilization, including:
  - Storage space allocation techniques
  - Access paths such as indexes
  - Data compression and encryption techniques

---

#### Conceptual or Logical Level

- Deals with the **logical structure** of the entire database.
- **Conceptual Schema** describes what data is stored in the database and the relationships among the data, **without** any concern for the physical implementation.
- This is the **overall view** of the database and includes all the information that is going to be represented in the database.

---

#### External or View Level

- The **highest level** of abstraction that deals with the user's view of the database.
- Most users and applications do not require access to the entire data stored in the database.
- **External Schemas** (or User Views) describe a part of the database for a particular group of users or applications.
- This is a powerful and flexible **security mechanism**, as parts of the database are hidden from certain users:
  - The user is **not aware** of the existence of any attributes that are missing from the view.

---

### Example

<!-- Diagram slide -->

Connections between the tables that make it a database.

---

## (4) DBMS Components

---

### DBMS Components

<!-- Diagram slide -->

---

### DBMS DDL Components

- **DDL compiler** processes schema definitions and stores them in the **catalogue**.
- **Catalogue** contains information such as:
  - Names and sizes of files
  - Names and data types of data items
  - Storage details
  - Mapping information among schemas
  - Constraints
  - …

---

### DBMS Storage & Physical Database Components

- The physical database is usually stored on **hard disk**.
- The **OS** controls disk access.
- The **Stored Data Manager (SDM)** controls access to DBMS information on disk, including buffer management.

---

### DBMS User Interface Components

**DBMS Users:**

- Casual Users
- Application Programmers
- Parametric Users
- DBA Staff

Different interfaces are ordinarily used by each type of user.

---

### DBMS Interactive Query Components

Casual users use an **Interactive Query Interface**:

1. The **Query Compiler** parses and validates the submitted query.
2. The internal query is then processed for **Query Optimization**.
3. Consults the **DBMS Catalogue**.
4. Generates **Executable Code**.

---

### DBMS Programmer Interface Components

Application programmers write programs (Java, C++, etc.) which need to access a DB:

1. The **Precompiler** extracts DML commands from the host language program.
2. The extracted commands are sent to the **DML Compiler**.
3. The rest of the program is sent to the **Host Language Compiler**.

---

### DBMS Compiled Application Components

- Object code for DML commands and the rest of the program are linked, forming a **canned transaction**.
- The executable code of a canned transaction calls the **run-time processor**.
- Canned transactions are used by **parametric users**.

---

### DBMS Runtime Components

The **Run-time Database Processor** handles all database access at run-time:

- Privileged Commands
- Executable Queries
- Canned Transactions

It:

- Utilises and updates the **Catalogue**
- May be responsible for **Buffer Management**
- Manages **Concurrency Control** and **Backup and Recovery** as part of **Transaction Management**

> **Parametric users** don't write their own commands — they use compiled transactions and supply the necessary parameters.
>
> _E.g. they might provide a customer ID and use a compiled transaction to find out their phone number._

---

## (5) System Catalog & Data Dictionary

---

### System Catalogue and Data Dictionary

- The **DDL**, and hence the **system catalogue**, are primarily concerned with the **syntactic definition** of the data.
- **Data Dictionaries** augment the internal DBMS catalogue with **semantic support**.
- Accessed directly by users (i.e. DBA).
- Catalogue accessed by the DBMS.

---

### System Catalogue and Data Dictionary Examples

- Tables and views that describe the structure of the database.
- Information about data such as meaning, relationships to other data, origin, usage, and format.

---

### Coupling Data Dictionaries and System Catalogues

There are two main ways of coupling Data Dictionaries and System Catalogues:

1. **Integrated Data Dictionary**
2. **Independent Data Dictionary**

---

### Integrated DB and Data Dictionary

- The majority of DBMS have an **integrated Data Dictionary**.
- Data Dictionary is an **integral part** of the DBMS:
  - Documents the meta-data that is managed by the DBMS.
- It is generally **fully active**:
  - Accessed at run-time by DBMS software.

---

### Independent Data Dictionary Systems

- Independent, free-standing system performing its own data management functions.
- Normally **passive**.
- No run-time link between the Data Dictionary and the DBMS.
- Hence DBMS has to have its own **System Catalogue**.
- Often generates **metadata automatically** for a variety of DBMS in the form of DDL.
- Helps to ensure **consistency** of metadata between the Data Dictionary and the System Catalogue.

---

### Data Dictionary System

A fully functional **Data Dictionary System (DDS)** should store and manage:

**a)** Descriptions of the database schemas

**b)** Detailed information on physical database design:

- Storage structures
- Access paths
- File and record sizes

**c)** Descriptions of the types of database users, their responsibilities and their access rights

**d)** High-level descriptions of transactions, applications and the relationships of users to transactions

**e)** The relationship between database transactions and the data items referenced by them

**f)** Usage statistics such as frequencies of queries and transactions and access counts to different portions of the database

**g)** The history of any changes made to the database and applications, and documentation that describes the reasons for these changes

---

### Example

<!-- Diagram slide -->

---

## In Summary

1. Database System
2. Database Architecture
3. Database Schemas
4. Database Components

---

**Yvette Graham**  
Information Management
