# CSU 34041 — Information Management II

## Introduction

**Lecturer:** Prof Yvette Graham

---

## What is Data?

Data = Information

Computer scientists are usually interested in data needed for a particular application.

Examples of applications backed by databases:

- Flight / ticket booking system
- Web hosting
- Stock-keeping system
- Online shopping
- Internet blog
- Social media (Twitter, Instagram, …)

Behind all of the above applications lies at least one (possibly multiple) database(s).

---

## Data Needed for an Application

Consider the application being developed:

- What data do I need to store?
- What kind of storage should I use?

Possible storage types:

- Relational database
- NoSQL database
- File storage
- Machine learning model

---

## Relational Databases

Proposed by **E. F. Codd** in **1970**.

Key properties:

- Information is organised in **2-dimensional tables** made of rows and columns.
- Cells may be empty (NULL), but generally there should be few.
- Assumes for the most part that data fits a 2D structure.
- Columns have headers containing the name of the data in that column.
- Rows have a unique identifier of some kind.

---

### Organising Data into Tables

Organise the data needed for our application into a table — or more likely, **multiple tables**.

Think about how data in our application fits together in a meaningful way within a 2D table.

**Example:** We are storing student records. What would be the potential tables?

- Students
- Modules
- Enrolments

---

### Example: Storing Information About People

Organise the data needed for our application into a table.

**Example:** We are storing information about people.

#### Persons Table

| name | age | phone | cat's name |
|------|-----|-------|------------|
| Jack Lynch | 23 | … | Fluffy |

---

### Example: Normalising — Cats Table

| person_id | dob |
|-----------|---------|
| 1 | 1/1/00 |

| owner | name | color | dob |
|-------|--------|-------|----------|
| 1 | Fluffy | Brown | 1/1/20 |
| 1 | Max | Black | 3/3/21 |

---

## Relational Databases — Achieve a Lot

Achieve **3 things**:

1. **Specify** the information needed about students (design the database).
2. **Store** information about students.
3. **Model** one or more relationships between students and modules (who is enrolled in what module).

### Students Table

| Student ID | First Name | Surname | Date of Birth | Address |
|------------|------------|---------|---------------|---------|
| … | … | … | … | … |

### Enrolments Table

| Student ID | Module ID |
|------------|-----------|
| … | … |

---

## Relational Databases — Relationships

Data needed for a particular application is organised into 2D tables.

Relations between data in each table are connected by specifying:

- **Which columns** in table A relate to another column in table B.
- **How** the column relates to it.

### Relationship cardinality

- **Pets example:** People were allowed to have multiple pets, but pets were not allowed to have multiple owners (**one-to-many**).
- **Students example:** Each student represents a unique individual real-world person enrolled in TCD.
- **Students example:** Modules represent individual modules that are available for students to attend.
- **Students example:** Students are permitted to enrol in multiple modules (**many-to-many**).

---

## What is a Database?

> A database is a **persistent collection of related data** supporting several different applications within an organisation.

Organised to:

- Model aspects of reality.
- In a way that supports processes that require this information.

**Example:** A collection of medical records in a hospital — finding records by a specific doctor or patient.

Most importantly, to make the data **more useful**.

---

## What is Metadata?

> Metadata adds **context** to data.

| Metadata | Data |
|----------|------|
| Student Number | 89041258 |
| Name | John Patrick Smith |
| Account Balance | 132.56 |

Metadata can include:

- Data type
- Name of element
- Size
- Restrictions, etc.

Can be used at any level of aggregation.

---

## Database Management Systems (DBMS)

A **Database Management System (DBMS)** is a system whose goal is to simplify the storage of, and access to, data.

DBMSs support:

- **Definition** — defining the database structure
- **Manipulation** — modifying stored data
- **Querying** — retrieving information

A DBMS can manage a single database or a set of databases.

---

## What DBMSs Provide

- **Efficient, reliable and secure management** of large amounts of persistent data.
- **Languages for defining the database:**
  - *Data Definition Language (DDL)* — schema-level definitions
  - Metadata (e.g. "student number is a seven-digit number plus one check digit")
- **Languages for storing, retrieving and updating data:**
  - *Data Manipulation Languages (DML)*

---

## DBMS Examples

| Category | Examples |
|----------|----------|
| Open-source | MySQL, PostgreSQL, SQLite |
| Commercial | Oracle, IBM DB2, SQL Server |

---

## Why Is It Important to Know About Databases?

### Ubiquity

The majority of large corporations, web sites, and scientific projects all manage both day-to-day operations **and** business intelligence / data mining using databases.

### Reducing Data Duplication

Duplication of data is:

- Wasteful of storage
- Inefficient
- Most importantly, leads to **inconsistencies**

The database approach aims to eliminate such redundancy. All applications access the same physical copy of the data, integrated and stored once.

---

## Data Independence

**Logical data independence** — allows the view of the data to be changed and data added without affecting its underlying organisation.

**Physical data independence** — insulates the way in which data is viewed by applications/users from the way in which it is physically stored.

---

## Data Integrity

Data integrity is concerned with the **consistency and accuracy** of the data in the database.

- **Data redundancy** is a major threat to data integrity.
- Support for data integrity is a key feature of any DBMS.

### Integrity Constraints

Databases model parts of the real world in which many rules apply:

- *"A student has only one address."*
- *"A student must take 5 courses in the final year, or 4 courses plus a project."*

DBMSs express such rules by means of **integrity constraints**.

### Additional Aspects

- **Validation** of data values being entered into the DB.
- **Concurrency control** — many users/applications simultaneously updating the database can threaten data integrity.

---

## Query Languages

Query languages such as **SQL** are:

- Usually very easy to learn and intuitive.
- With some assumptions in place, the same simple database interface can interact with a wide range of applications.
- Users do not need years of training or a CS degree to query, add, or remove information.
- The same database can be used by a range of application programs simultaneously.

---

## Metadata Management

With the database approach:

- Metadata is stored **centrally in the catalog**.
- Example: database catalog entry for a patient record.

---

## Advantages of Databases

- **Search and retrieval capabilities** — filtered according to specific needs.
- **Reduced data redundancy** — ease of update.
- **Greater data integrity.**
- **Independence from applications** — concurrent access.
- **Improved data security.**
- **Reduced costs** for data entry, storage and retrieval.

---

## Disadvantages of Databases

- Some training still required for management and querying.
- Database systems can be complex and time-consuming to design.
- **Cost** — software, hardware, training.
- **Loss of autonomy** brought about by centralised control of the data.
- **Inflexibility** due to complexity or bad application–database match.

---

## Database Languages (e.g. SQL)

Programming languages used to:

- **Define** a database — its entities and the relationships between them.
- **Manipulate** its content — insert new data, update or delete existing data.
- **Conduct queries** — request information based upon defined criteria.

The **Structured Query Language (SQL)** is the most commonly used language for relational databases. It is supported by all relational DBMSs and is a standard.

---

## SQL Command Categories

SQL is split into four sets of commands:

| Category | Abbreviation | Purpose |
|----------|-------------|---------|
| Data Definition Language | **DDL** | Define schema structure |
| Data Manipulation Language | **DML** | Modify stored data |
| Data Query Language | **DQL** | Query / retrieve data |
| Data Control Language | **DCL** | Control access / permissions |

---

### SQL — Data Definition Language (DDL)

SQL uses a collection of imperative verbs whose effect is to **modify the schema** of the database.

- Can be used to add, change, or delete definitions of tables or other objects.
- These statements can be freely mixed with other SQL statements (so DDL is not truly a separate language).

---

### SQL — Data Manipulation Language (DML)

Data manipulation language comprises the SQL **data change statements**:

- Modifies **stored data**.
- Does **NOT** modify the schema or database objects (that is the responsibility of DDL).
- Used for inserting, deleting, and updating data in the tables of a database.

---

### SQL — Data Query Language (DQL)

The data query language allows users of a database to **formulate requests and generate reports**.

The primary command is the **`SELECT` statement**:

- Queries or retrieves data from a table in the database.
- May retrieve information from specified columns or from all columns.
- May have specified criteria that must be met for data to be returned.

---

## Transactions

A way to group actions that **must happen atomically** — all or nothing.

Guarantees:

- Move the database content from one **consistent state** to another.
- **Isolate** these actions from parallel execution of other actions/transactions.
- Ensure the database is **recoverable** in case of failure (e.g. power outage).

---

## Backup and Recovery

Ensures that the database can be returned to a **stable state** in case of errors such as:

- Transaction failure
- System errors
- System crash
- Data corruption
- Disk failure

---

## Database "Users"

| Role | Responsibility |
|------|---------------|
| **DBMS Implementer** | Builds the DBMS system |
| **Database Designer** | Designs the database, establishes the schema |
| **Database Application Developer** | Develops programs that operate upon the DB |
| **Database Administrator** | Has overall responsibility for the DB — specifying access constraints, selection of appropriate backup and recovery measures, monitoring performance, etc. |

---

## Other Kinds of Databases

| Type | Examples |
|------|----------|
| **Analytical / Warehouse Databases** | Massively parallel processing (MPP) databases, Online analytical processing (OLAP) databases |
| **XML Databases** | Document-oriented |
| **Embedded / Local Databases** | Used inside applications and devices |
| **NoSQL Databases** | Web-scale, non-relational, open-source |
| **In-Memory Databases** | Stores data in main memory rather than on disk |
| **Other** | Search and indexing databases |