# CSU 34041 — Information Management II: Study Guide

> Based on lecture content and past exam papers (2022–2026)

---

## Table of Contents

1. [Introduction to Databases](#1-introduction-to-databases)
2. [Database Architecture](#2-database-architecture)
3. [Entity Relationship Modelling](#3-entity-relationship-modelling)
4. [Mapping to Logical Design](#4-mapping-to-logical-design)
5. [Relational Algebra](#5-relational-algebra)
6. [Relational Database Design & Normalisation](#6-relational-database-design--normalisation)
7. [Database Constraints](#7-database-constraints)
8. [Database Security & Access Control](#8-database-security--access-control)
9. [GDPR](#9-gdpr)
10. [NoSQL Databases](#10-nosql-databases)
11. [Transactions & Concurrency Control](#11-transactions--concurrency-control)
12. [Exam Strategy & Past Paper Analysis](#12-exam-strategy--past-paper-analysis)
13. [Quick-Reference Summary Tables](#13-quick-reference-summary-tables)

---

## 1. Introduction to Databases

### Core Concepts

**Data vs Information** — Data is raw facts; information is processed, meaningful data.

**Database** — A persistent collection of related data supporting several different applications within an organisation. Organised to model aspects of reality in a way that supports processes requiring this information.

**Metadata** — Data about data. Adds context: data type, name, size, restrictions. Stored centrally in the catalog.

**DBMS (Database Management System)** — Software that simplifies storage and access to data. Supports:

- **Definition** (DDL) — defining database structure
- **Manipulation** (DML) — modifying stored data
- **Querying** (DQL) — retrieving information
- **Control** (DCL) — access/permissions

### SQL Command Categories

| Category                   | Abbreviation | Purpose                                             |
| -------------------------- | ------------ | --------------------------------------------------- |
| Data Definition Language   | **DDL**      | Define schema structure (`CREATE`, `ALTER`, `DROP`) |
| Data Manipulation Language | **DML**      | Modify stored data (`INSERT`, `UPDATE`, `DELETE`)   |
| Data Query Language        | **DQL**      | Retrieve data (`SELECT`)                            |
| Data Control Language      | **DCL**      | Control access/permissions (`GRANT`, `REVOKE`)      |

### Key Properties

- **Data Independence** — Logical (view changes without affecting organisation) and Physical (application view changes without affecting physical storage)
- **Data Integrity** — Consistency and accuracy. Threatened by redundancy.
- **Advantages** — Reduced redundancy, greater integrity, independence from applications, improved security, reduced costs
- **Disadvantages** — Training required, complex design, cost, loss of autonomy, inflexibility

### Database Users

| Role                   | Responsibility                                                            |
| ---------------------- | ------------------------------------------------------------------------- |
| DBMS Implementer       | Builds the DBMS                                                           |
| Database Designer      | Designs database, establishes schema                                      |
| Application Developer  | Develops programs operating on the DB                                     |
| Database Administrator | Overall responsibility — access constraints, backup/recovery, performance |

---

## 2. Database Architecture

### Database System (DBS)

DBS = **DBMS** + **DB** (application data + metadata) + **Application programs**

### Three-Level Architecture

| Level                    | Description                                                                                                           | Schema            |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------- | ----------------- |
| **Internal (Physical)**  | Lowest level — how data is physically stored. Storage allocation, access paths (indexes), compression, encryption.    | Internal Schema   |
| **Conceptual (Logical)** | Logical structure of entire database. What data is stored and relationships, without physical implementation details. | Conceptual Schema |
| **External (View)**      | Highest level — user's view. Parts of database for specific user groups. Security mechanism.                          | External Schemas  |

### DBMS Components

- **DDL Compiler** — processes schema definitions, stores in **catalogue**
- **Catalogue** — names/sizes of files, data types, storage details, mappings, constraints
- **Stored Data Manager (SDM)** — controls disk access, buffer management
- **Query Compiler** — parses/validates queries, optimises, generates executable code
- **Precompiler** — extracts DML from host language programs
- **Run-time Database Processor** — handles privileged commands, queries, transactions, concurrency control, backup/recovery

### Data Dictionary vs System Catalogue

- **System Catalogue** — syntactic definition, accessed by DBMS
- **Data Dictionary** — semantic support, augmented catalogue, accessed by users/DBA
- **Integrated** — Data Dictionary is part of DBMS, fully active at run-time
- **Independent** — Free-standing, passive, generates DDL automatically

---

## 3. Entity Relationship Modelling

### ER Model Basics

The ER model is an **abstract, high-level conceptual representation** using **Entity Relationship Diagrams (ERDs)**. Describes data as **entities**, **relationships**, and **attributes**.

### Entity Types vs Entity Sets

| Term            | Definition                                                                               |
| --------------- | ---------------------------------------------------------------------------------------- |
| **Entity Type** | Named collection of entities with same attributes (e.g., `EMPLOYEE` — Name, Age, Salary) |
| **Entity Set**  | All actual instances (e.g., John Smith, 55, 80000; Fred Brown, 40, 30000)                |

### Attribute Types

| Type                | Description              | Example                              |
| ------------------- | ------------------------ | ------------------------------------ |
| **Simple (Atomic)** | Cannot be divided        | Age, Movie Certificate               |
| **Composite**       | Divisible into sub-parts | Address → {Street, Town, County}     |
| **Single-valued**   | One value per entity     | PPS number, Age                      |
| **Multi-valued**    | Set of values per entity | Genre for Movie (double oval in ERD) |
| **Stored**          | Actual stored value      | BirthDate                            |
| **Derived**         | Can be calculated        | Age (from BirthDate)                 |

### ERD Notation

| Notation                      | Meaning                                    |
| ----------------------------- | ------------------------------------------ |
| Rectangular box               | Entity type                                |
| Oval                          | Attribute                                  |
| Double oval                   | Multi-valued attribute                     |
| Underlined attribute          | Key attribute                              |
| Straight lines from composite | Component attributes                       |
| Diamond                       | Relationship type                          |
| Single line                   | Partial participation                      |
| Double line                   | Total participation (existence dependency) |

### Relationships

- A **relationship** captures how entity types are related (verb linking nouns)
- **Degree** — number of entity types participating (binary = 2, ternary = 3)
- **Relationship type** — the named relationship
- **Relationship set** — collection of all instances
- **Role** — the part each entity type plays in a relationship

### Cardinality Constraints

| Ratio | Name         | Example                         |
| ----- | ------------ | ------------------------------- |
| 1 : 1 | One to One   | Employee manages one Department |
| 1 : N | One to Many  | Lecturer teaches many Lectures  |
| M : N | Many to Many | Student enrols in many Modules  |

### Participation Constraints

| Type        | Notation    | Meaning                                              |
| ----------- | ----------- | ---------------------------------------------------- |
| **Total**   | Double line | Every entity MUST participate (existence dependency) |
| **Partial** | Single line | Some entities participate, others don't              |

### Relationship Attributes

| Cardinality | Migration Rule                                                      |
| ----------- | ------------------------------------------------------------------- |
| 1 : 1       | Attribute can be migrated to **either** side                        |
| 1 : N       | Attribute can only be migrated to the **N side**                    |
| M : N       | Attribute **cannot** be migrated; remains as relationship attribute |

### Recursive Relationships

Same entity type participates more than once in a relationship (e.g., Employee supervises Employee).

---

## 4. Mapping to Logical Design

### ER to Relational Mapping Rules

| ER Concept                 | Mapping Rule                                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Each entity type**       | Create a table with all simple attributes                                                                          |
| **Composite attributes**   | Include the simple component attributes as separate columns                                                        |
| **Key attributes**         | Choose one as **primary key**; others as **UNIQUE** constraints                                                    |
| **Multi-valued attribute** | Create **new table** with FK + attribute; composite PK = {FK, attribute}                                           |
| **1 : 1 relationship**     | **FK approach**: include PK of one entity as FK in the other. **Merged approach** if both have total participation |
| **1 : N relationship**     | Include PK of "1" side as **FK in N-side table**                                                                   |
| **M : N relationship**     | Create **new table** with FKs from both sides as **composite PK**                                                  |
| **Recursive relationship** | Include PK as **self-referencing FK** in same table                                                                |

### Example: Cinema Database

```
ER: THEATRE ──1── LOCALE ──N── SCREEN ──1── DISPLAY ──N── SCREENING ──1── SHOW ──M── MOVIE

Mapped:
THEATRE (theatre_id, name, street, town, county, phone_no, website)
SCREEN (number, screen_type, capacity, location, theatre_id [FK])
SCREENING (screening_id, time, date, movie_id [FK], screen_number [FK])
MOVIE (movie_id, title, synopsis, director, cert, running_time, release_day, release_month, release_year)
GENRE (movie_id [FK], genre [PK part])
```

---

## 5. Relational Algebra

### Operations Overview

| Category   | Operations                                  | Description                         |
| ---------- | ------------------------------------------- | ----------------------------------- |
| **Unary**  | SELECT (σ), PROJECT (π)                     | Operate on a single relation        |
| **Binary** | UNION (∪), INTERSECTION (∩), DIFFERENCE (−) | Standard set operations             |
| **Binary** | JOIN (⋈)                                    | Combine tuples across two relations |

### SELECT (σ) — Horizontal Partition

```
σ<sub>(condition)</sub>(Relation)
```

- Filters rows based on a Boolean condition
- Same degree as original relation
- Number of tuples ≤ original
- **Commutative** and **cascading**: σ₁(σ₂(R)) = σ₁ AND σ₂(R)

### PROJECT (π) — Vertical Partition

```
π<sub>(attribute list)</sub>(Relation)
```

- Selects specific columns
- **Automatically eliminates duplicates** (key difference from SQL — use `DISTINCT`)
- Degree = number of attributes in the list

### Set Operations

| Operation    | Notation | Description                  | Properties               |
| ------------ | -------- | ---------------------------- | ------------------------ |
| Union        | R ∪ S    | All tuples in R or S or both | Commutative, associative |
| Intersection | R ∩ S    | Tuples in both R and S       | Commutative, associative |
| Difference   | R − S    | Tuples in R but not S        | **Not** commutative      |

**Requirement**: Relations must be **union compatible** (same degree, same domains for corresponding attributes).

### JOIN (⋈)

```
R ⋈<sub>(condition)</sub> S
```

- Combines tuples from two relations satisfying a join condition
- Result has n + m attributes
- Makes use of **Foreign Keys** and **Referential Integrity**

### SQL Equivalents

| Relational Algebra    | SQL                                    |
| --------------------- | -------------------------------------- |
| σ<sub>(cond)</sub>(R) | `SELECT * FROM R WHERE cond`           |
| π<sub>(A,B)</sub>(R)  | `SELECT DISTINCT A, B FROM R`          |
| R ∪ S                 | `SELECT ... UNION SELECT ...`          |
| R ∩ S                 | `SELECT ... INTERSECT SELECT ...`      |
| R − S                 | `SELECT ... EXCEPT SELECT ...`         |
| R ⋈ S                 | `SELECT ... FROM R, S WHERE condition` |

---

## 6. Relational Database Design & Normalisation

### Design Guidelines

| Guideline                       | Principle                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------ |
| **1 — Attribute Semantics**     | Each relation should be easy to explain; don't mix attributes from distinct entities |
| **2 — Reduction of Redundancy** | No insertion, deletion, or modification anomalies                                    |
| **3 — Reduction of NULLs**      | Avoid NULLs unless they apply to exceptional cases                                   |
| **4 — No Spurious Tuples**      | Join on PK/FK pairs only; avoid matching non-FK attributes                           |

### Functional Dependency (FD)

**X → Y** means: for any two tuples with the same X values, they must have the same Y values.

- X = left-hand side (determinant)
- Y = right-hand side
- If X is a candidate key, then **X → all attributes**

### Anomalies

| Type             | Description                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------ |
| **Insertion**    | Cannot insert data without other data (e.g., new employee needs department)                |
| **Deletion**     | Deleting data loses other information (e.g., deleting last employee loses department info) |
| **Modification** | Updating data requires changes in multiple tuples (can get out of sync)                    |

### Normal Forms

| Normal Form | Definition                                                                                         | Test                                                                     | Remedy                                                      |
| ----------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------- |
| **1NF**     | All attribute values are **atomic** (indivisible)                                                  | Check for multi-valued or nested attributes                              | Move violating attributes to new relation with composite PK |
| **2NF**     | In 1NF + every non-key attribute is **fully functionally dependent** on the **entire** primary key | Check for partial dependencies (non-key depends on part of composite PK) | Decompose: create new relation for each partial dependency  |
| **3NF**     | In 2NF + **no non-key attribute** is transitively dependent on the primary key                     | Check: X → Z → Y where Z is not a key                                    | Decompose using transitive dependency                       |
| **BCNF**    | In 3NF + for every FD **X → Y**, X is a **superkey**                                               | Every determinant is a candidate identifier                              | Decompose using non-superkey determinants                   |

### Normalisation Process

1. **Evaluate** each relation against 1NF criteria → decompose if needed
2. **Evaluate** against 2NF → decompose partial dependencies
3. **Evaluate** against 3NF → decompose transitive dependencies
4. **Evaluate** against BCNF → decompose non-superkey determinants

### Boyce-Codd Rule

> **"Every determinant must be a candidate identifier."**
> **"All attributes should be dependent on the key, the whole key, and nothing but the key."**

### Superkey vs Candidate Key vs Primary Key

| Term              | Definition                                            | Example                                           |
| ----------------- | ----------------------------------------------------- | ------------------------------------------------- |
| **Superkey**      | Any set of attributes that uniquely identifies tuples | {Engine_No, Reg_Year, Reg_County, Reg_Num, Model} |
| **Candidate Key** | A **minimal** superkey (no subset is also a superkey) | `Engine_No` or `{Reg_Year, Reg_County, Reg_Num}`  |
| **Primary Key**   | The candidate key chosen by the designer              | `Engine_No`                                       |

### Denormalisation

In practice, fully normalised tables can slow performance. The correct process:

1. Design fully normalised tables (**correctness**)
2. Denormalise **only where needed** for **performance**

---

## 7. Database Constraints

### Three Types of Integrity Constraints

| Type                      | Description                                      | Applied               |
| ------------------------- | ------------------------------------------------ | --------------------- |
| **Key**                   | No duplicate entries in key attributes           | Individual relation   |
| **Entity Integrity**      | No NULL values in Primary Key                    | Individual relation   |
| **Referential Integrity** | FK must reference an existing tuple (or be NULL) | Between two relations |

### Constraint Violations

| Operation  | Can Violate                                  |
| ---------- | -------------------------------------------- |
| **Insert** | Key, Entity Integrity, Referential Integrity |
| **Delete** | Referential Integrity only                   |
| **Update** | Key, Entity Integrity, Referential Integrity |

### Referential Integrity Actions

| Action               | Description                                        |
| -------------------- | -------------------------------------------------- |
| **REJECT** (default) | Reject the operation if FK reference doesn't exist |
| **CASCADE**          | Propagate the change to referencing tuples         |
| **SET NULL**         | Set FK to NULL                                     |
| **SET DEFAULT**      | Set FK to a default value                          |

### SQL Constraint Syntax

```sql
-- Primary Key
PRIMARY KEY (column)
-- or inline: column INT PRIMARY KEY

-- Composite Primary Key
PRIMARY KEY (col1, col2)

-- Foreign Key
FOREIGN KEY (col) REFERENCES OtherTable(col)
FOREIGN KEY (col) REFERENCES OtherTable(col) ON DELETE CASCADE

-- Unique
UNIQUE (column)

-- Not Null
column INT NOT NULL

-- Check
CHECK (column > 0 AND column < 100)
CHECK (date1 <= date2)

-- Assertion (cross-table)
CREATE ASSERTION name CHECK (condition)

-- Trigger
CREATE TRIGGER name BEFORE/AFTER event ON table
FOR EACH ROW BEGIN ... END
```

---

## 8. Database Security & Access Control

### Integrity vs Security

| Integrity                          | Security                           |
| ---------------------------------- | ---------------------------------- |
| Prevents **accidental** corruption | Prevents **deliberate** corruption |
| Integrity Constraints              | Security Policies / Access Control |

### Access Control Types

| Type                    | Description                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| **Discretionary (DAC)** | Owner controls access; flexible but can be vulnerable                                      |
| **Mandatory (MAC)**     | Security levels (Top Secret > Secret > Confidential > Unclassified); rigid but very secure |
| **Role-Based (RBAC)**   | Privileges assigned to roles; users assigned to roles                                      |

### Privileges

| Level              | Examples                                                       |
| ------------------ | -------------------------------------------------------------- |
| **Account Level**  | `CREATE SCHEMA`, `CREATE TABLE`, `ALTER`, `DROP`               |
| **Relation Level** | `SELECT` (read), `INSERT/UPDATE/DELETE` (modify), `REFERENCES` |

### SQL Access Control

```sql
-- Grant privileges
GRANT privilege ON relation TO user;
GRANT SELECT, UPDATE ON Employees TO user1;

-- Attribute-level (INSERT/UPDATE only)
GRANT UPDATE (Salary) ON Lords TO Henry;

-- With propagation
GRANT SELECT ON relation TO user WITH GRANT OPTION;

-- Revoke
REVOKE privilege ON relation FROM user;
```

### Views for Fine-Grained Access

Views allow partial access:

- Restricted **attributes** (columns)
- Restricted **rows** (WHERE clause)

```sql
CREATE VIEW RestrictedView AS
SELECT Name, Age, Address
FROM Lords
WHERE Decoration = 'Victoria Cross';

GRANT SELECT ON RestrictedView TO Victoria WITH GRANT OPTION;
```

### Privilege Propagation

- **WITH GRANT OPTION** — recipient can grant to others
- **Danger**: privileges can propagate without owner's knowledge
- **Revocation**: DBMS should cascade revocation, but not if overlapping grant paths exist

### Role-Based Access Control

```sql
CREATE ROLE manager;
GRANT SELECT, UPDATE, DELETE ON Employees TO manager;
GRANT manager TO user1, user2;
```

---

## 9. GDPR

### Key Definitions

| Term                      | Definition                                                                     |
| ------------------------- | ------------------------------------------------------------------------------ |
| **Data Subject**          | Person whose personal data is being processed                                  |
| **Data Controller**       | Decides purposes and methods of processing                                     |
| **Data Processor**        | Processes data on behalf of controller                                         |
| **Supervisory Authority** | Independent authority monitoring GDPR (in Ireland: Data Protection Commission) |
| **Personal Data**         | Any information concerning an identified or identifiable person                |

### Personal Data Includes

Names, identification numbers, location data, online identifiers (IP addresses), and factors specific to physical, physiological, genetic, mental, economic, cultural, or social identity.

### Special Categories (Additional Protection)

Racial/ethnic origin, political opinions, religious/philosophical beliefs, trade union membership, genetic/biometric data, health data, sex life/sexual orientation.

### Six GDPR Principles

1. **Lawful, fairness & transparency** — Processed lawfully, fairly, transparently
2. **Purpose limitation** — Collected for specified, explicit, legitimate purposes only
3. **Data minimisation** — Adequate, relevant, limited to what is necessary
4. **Accuracy** — Accurate and up to date; inaccurate data erased or rectified without delay
5. **Storage limitation** — Kept only as long as necessary
6. **Integrity & confidentiality** — Appropriate security

### Lawful Bases for Processing (Article 6)

1. Consent
2. Contract performance
3. Legal obligation
4. Vital interests
5. Public interest
6. Legitimate interests

### Data Subject Rights

| Right                             | Description                                                     |
| --------------------------------- | --------------------------------------------------------------- |
| **Right of Access**               | Know what data is held and why; get a copy                      |
| **Right to be Informed**          | Clear, transparent information about processing                 |
| **Right to Rectification**        | Correct inaccurate or incomplete data                           |
| **Right to Erasure**              | "Right to be forgotten" — data erased under certain grounds     |
| **Right to Portability**          | Obtain and reuse data in machine-readable form                  |
| **Rights on Automated Decisions** | Not subject to purely automated decisions (including profiling) |
| **Right to Object**               | Object to certain types of processing                           |
| **Right to Restriction**          | Limit how data is processed                                     |

### Penalties

Up to **€20 million** or **4% of annual worldwide turnover** (whichever is greater).

---

## 10. NoSQL Databases

### Why NoSQL?

- **Impedance mismatch** — difference between relational model and in-memory data structures
- **Scale out** — cheaper horizontal scaling vs expensive vertical scaling
- **3 Vs of Big Data**: **Volume**, **Velocity**, **Variety**

### SQL vs NoSQL Paradigms

| ACID (SQL)      | BASE (NoSQL)             |
| --------------- | ------------------------ |
| **A**tomicity   | **B**asic Availability   |
| **C**onsistency | **S**oft-state           |
| **I**solated    | **E**ventual consistency |
| **D**urability  |                          |

### CAP Theorem

Only **2 of 3** can be guaranteed:

| Property                | Description                                  |
| ----------------------- | -------------------------------------------- |
| **Consistency**         | All nodes see the same data at the same time |
| **Availability**        | Every request receives a response            |
| **Partition Tolerance** | System operates despite network failures     |

### Four NoSQL Types

| Type          | Description                              | Best For                                | Key Traits                                                    |
| ------------- | ---------------------------------------- | --------------------------------------- | ------------------------------------------------------------- |
| **Key-Value** | Maps keys to opaque values               | Shopping carts, sessions, user profiles | Very fast, single index, inefficient for aggregates           |
| **Document**  | JSON-like documents with IDs             | Content management, catalogs            | Implicitly denormalised, rich queries, indexing on properties |
| **Column**    | Data stored by columns (column families) | Analytics, time-series data             | Sparse tables, efficient column-ordered operations            |
| **Graph**     | Nodes connected by edges                 | Social networks, recommendation engines | Cheap relationship traversal, expensive in RDBMS              |

### Distributed Computing Concepts

| Concept                  | Description                                                 |
| ------------------------ | ----------------------------------------------------------- |
| **Replication**          | Same data copied across multiple nodes                      |
| **Sharding**             | Different data on different nodes (horizontal scaling)      |
| **Master-Slave**         | Primary handles writes; secondaries handle reads            |
| **Peer-to-Peer**         | All replicas can accept writes                              |
| **Eventual Consistency** | Without new updates, all accesses return last updated value |

---

## 11. Transactions & Concurrency Control

### Transaction

A **logical unit of DB processing** completed in its entirety.

| Type           | Description                     |
| -------------- | ------------------------------- |
| **Read-Only**  | Retrieves data, does not update |
| **Read-Write** | Updates the database            |

### Termination

| Outcome            | Description                         |
| ------------------ | ----------------------------------- |
| **Commit**         | Successful — changes made permanent |
| **Rollback/Abort** | Unsuccessful — changes undone       |

### ACID Properties

| Property        | Description                                             |
| --------------- | ------------------------------------------------------- |
| **Atomicity**   | All-or-nothing; performed in entirety or not at all     |
| **Consistency** | Takes DB from one consistent state to another           |
| **Isolation**   | Appears to execute in isolation from other transactions |
| **Durability**  | Committed changes persist despite failures              |

### Concurrency Control Problems

| Problem                           | Description                                                                 |
| --------------------------------- | --------------------------------------------------------------------------- |
| **Lost Update**                   | Two concurrent transactions write to same data; one update is lost          |
| **Dirty Read (Temporary Update)** | One transaction reads data written by another that then **rolls back**      |
| **Incorrect Summary**             | One transaction calculates aggregate while another updates those attributes |

### Schedules

| Type           | Description                                             |
| -------------- | ------------------------------------------------------- |
| **Serial**     | All operations of one transaction execute consecutively |
| **Non-serial** | Operations from different transactions are interleaved  |

### Serializability

| Type                     | Definition                               |
| ------------------------ | ---------------------------------------- |
| **Result Equivalence**   | Same final database state                |
| **Conflict Equivalence** | Same order of **conflicting operations** |

**Two operations conflict** if: different transactions, same item, at least one is a write.

### Locking Protocols

| Lock Type                  | Also Known As  | Behaviour                                   |
| -------------------------- | -------------- | ------------------------------------------- |
| **Binary**                 | —              | Locked / Unlocked; too restrictive          |
| **Read/Write (Shared)**    | Shared lock    | Multiple transactions can read concurrently |
| **Read/Write (Exclusive)** | Exclusive lock | Only one transaction has access             |

### Two-Phase Locking (2PL)

| Phase         | Behaviour                          |
| ------------- | ---------------------------------- |
| **Growing**   | Acquire locks only, cannot release |
| **Shrinking** | Release locks only, cannot acquire |

**Theorem**: Any schedule from 2PL is **conflict-serializable**.

### Deadlock

Circular wait where transactions wait forever for locks held by each other.

| Protocol               | Description                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| **No-Waiting**         | Abort if lock not immediately available                            |
| **Wait-Die**           | Older waits for younger; younger aborts if requesting older's lock |
| **Wound-Wait**         | Older preempts (wounds) younger; younger waits for older           |
| **Cautious Waiting**   | Waits only if holder is older; aborts if holder is younger         |
| **Deadlock Detection** | Maintain wait-for graph; detect cycles; abort victim               |

### Starvation

Transaction delayed indefinitely. Solutions: age-based priority, timeouts, fair queuing, limit retries.

### Timestamp Ordering

Lock-free protocol assigning unique timestamps. Each data item maintains **read-timestamp** and **write-timestamp**.

---

## 12. Exam Strategy & Past Paper Analysis

### Exam Structure (Consistent Across Papers)

- **3 questions total** — Question 1 is **mandatory**
- Answer any **2** from Questions 2, 3, 4
- Each question worth **25 marks**
- **2-hour** exam (2024: 09:30–11:30; 2023: 14:00–16:00)
- 2026 format: Part 1 (pen & paper, 50 marks) + Part 2 (MCQ on computer, 50 marks)

### Recurring Question Types

#### ER Modelling (Questions 1 in 2022, 2023, 2026)

- Given a scenario, draw an ER diagram
- Include: entities, attributes, PKs, multi-valued attributes, weak entities, specialisation/generalisation, relationship attributes, cardinality, participation
- State assumptions clearly
- **Mark allocation**: ~8–30 marks depending on complexity

#### Relational Mapping (Questions in 2022, 2023, 2026)

- Map ER to relational schema
- Show functional dependencies, PKs, FKs
- Normalise to BCNF
- **Mark allocation**: ~6–20 marks

#### SQL Queries (Questions in 2022, 2023, 2026)

- INSERT statements
- SELECT with WHERE, JOIN, GROUP BY, HAVING
- UPDATE/DELETE operations
- **Mark allocation**: ~3–12 marks

#### Integrity Constraints (2024 Q2, 2023 Q2)

- Given a schema and data, evaluate operations
- Identify which constraints are violated
- Suggest enforcement methods (CASCADE, SET NULL, etc.)
- **Mark allocation**: ~5 marks per sub-question

#### Access Control / Privileges (2024 Q3, 2022 Q2, 2023 Q4)

- Write SQL GRANT/REVOKE statements
- Use views for fine-grained access
- Handle WITH GRANT OPTION
- **Mark allocation**: ~5 marks per sub-question

#### GDPR Scenario (2024 Q4, 2023 Q4, 2022 Q3)

- Apply GDPR principles to a scenario
- Identify data subject rights
- Identify roles (controller, processor)
- Discuss repercussions and actions
- **Mark allocation**: ~8–10 marks per sub-question

#### Transactions & Concurrency (2023 Q3, 2022 Q2)

- Explain ACID properties
- Identify concurrency problems (lost update, dirty read)
- Analyze schedules for serializability
- **Mark allocation**: ~8 marks per sub-question

#### Multiple Choice (2026 Sample)

- 10 questions, 5 marks each
- Topics: GRANT/REVOKE, serializability, NoSQL use cases, SQL queries, GDPR, CHECK constraints, 2PL deadlocks, Wait-Die/Wound-Wait

### Mark Distribution Patterns

| Topic                              | Typical Marks |
| ---------------------------------- | ------------- |
| ER Modelling                       | 8–30          |
| Relational Mapping + Normalisation | 6–20          |
| SQL (queries + DDL)                | 3–15          |
| Integrity Constraints              | 10–25         |
| Access Control / Security          | 10–20         |
| GDPR                               | 8–25          |
| Transactions / Concurrency         | 8–15          |

### Study Priority (Based on Frequency)

1. **ER Modelling + Mapping** — appears in every exam's mandatory question
2. **SQL Queries** — appears in almost every exam
3. **Integrity Constraints** — consistent 20+ marks across papers
4. **Access Control** — appears in most papers
5. **GDPR** — appears in every paper (Q2/Q3/Q4)
6. **Transactions/Concurrency** — appears regularly
7. **Normalisation** — tested within mapping questions
8. **NoSQL** — appears as MCQ or short answer

---

## 13. Quick-Reference Summary Tables

### Normalisation Checklist

```
Given a table T with PK and FDs:

1NF: Are all values atomic?
  NO → Create new table for multi-valued attribute
  YES → Proceed

2NF: Does every non-key attribute depend on the ENTIRE PK?
  NO (partial dep) → Decompose into new tables
  YES → Proceed

3NF: Is any non-key attribute transitively dependent on PK?
  NO → Proceed
  YES → Decompose using transitive dependency

BCNF: Is every determinant a superkey?
  NO → Decompose using non-superkey determinant
  YES → Table is in BCNF
```

### ERD → Relational Mapping Decision Tree

```
Entity type → Create table with simple attributes
Composite attribute → Decompose into component columns
Multi-valued attribute → Create new table {FK, attribute}, composite PK
1:1 relationship → FK in either table (or merge if both total participation)
1:N relationship → FK from 1-side into N-side table
M:N relationship → Create new table {FK1, FK2}, composite PK
Recursive relationship → Self-referencing FK in same table
Relationship attribute → Migrate based on cardinality (see table in Section 4)
```

### Concurrency Protocol Decision Table

| Scenario                            | Wait-Die                  | Wound-Wait                        |
| ----------------------------------- | ------------------------- | --------------------------------- |
| Older requests lock held by younger | Older **waits**           | Older **wounds** (younger aborts) |
| Younger requests lock held by older | Younger **dies** (aborts) | Younger **waits**                 |
| Deadlock possible?                  | No                        | No                                |

### SQL Constraint Reference

```sql
-- Table-level constraints
CREATE TABLE Employees (
    emp_id     INT PRIMARY KEY,
    ssn        CHAR(9) UNIQUE NOT NULL,
    salary     DECIMAL CHECK (salary > 0),
    dept_id    INT REFERENCES Departments(dept_id)
                ON DELETE SET NULL
                ON UPDATE CASCADE,
    CHECK (hire_date <= end_date)
);

-- Renamed constraints
ALTER TABLE Employees ADD CONSTRAINT no_negative_salary
    CHECK (salary > 0);

-- Assertions
CREATE ASSERTION max_salary_sum CHECK (
    (SELECT SUM(salary) FROM Employees) < 1000000
);

-- Trigger
CREATE TRIGGER salary_audit
AFTER UPDATE OF salary ON Employees
FOR EACH ROW
WHEN (NEW.salary < OLD.salary)
BEGIN
    INSERT INTO Salary_Log VALUES (OLD.emp_id, OLD.salary, NEW.salary, NOW());
END;
```

---

_This study guide was compiled from CSU 34041 lecture materials and past exam papers (2022, 2023, 2024, 2026 sample). Always cross-reference with the latest lecture slides and consult your lecturer for any discrepancies._
