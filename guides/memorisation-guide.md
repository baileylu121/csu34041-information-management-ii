# CSU 34041 — Memorisation Guide

> Rote-learn these. These are the facts, definitions, and patterns you'll need to recall under exam pressure.

---

## 1. Definitions to Memorise Word-for-Word

### Database
> A **persistent collection of related data** supporting several different applications within an organisation.

### Metadata
> Data that adds **context** to data (type, name, size, restrictions).

### DBMS
> A system whose goal is to simplify the **storage of, and access to, data**.

### Relational Database (Codd, 1970)
> Information organised in **2-dimensional tables** made of rows and columns.

### Key
> An attribute (or set of attributes) whose values are **unique** for each instance in the entity set.

### Functional Dependency (X → Y)
> For any two tuples t₁ and t₂: if **t₁[X] = t₂[X]**, then **t₁[Y] = t₂[Y]**.

### Transaction
> A **logical unit of DB processing** that is completed in its entirety.

### Schedule
> A **sequence of operations** from one or more transactions, executed in some order.

### Deadlock
> Two or more transactions are **permanently blocked**, each waiting for a lock held by another transaction in the group.

### Starvation
> A transaction is **delayed indefinitely** — it never gets access to the resources it needs.

### Personal Data (GDPR)
> Any information concerning or relating to a living person who is either **identified** or **identifiable**.

### Data Controller (GDPR)
> A person, company, or other body which **decides the purposes and methods** of processing personal data.

### Data Processor (GDPR)
> A person, company, or other body which **processes personal data on behalf of** a data controller.

### NoSQL
> **Non-relational**, **schema-less**, usually **open-source**, **distributed** databases.

---

## 2. ACID Properties

| Letter | Property | One-line definition |
|--------|----------|---------------------|
| **A** | **Atomicity** | All-or-nothing; performed in entirety or not at all |
| **C** | **Consistency** | Takes DB from one consistent state to another |
| **I** | **Isolation** | Appears to execute in isolation from other transactions |
| **D** | **Durability** | Committed changes persist despite failures |

### BASE Properties (NoSQL)

| Letter | Property | One-line definition |
|--------|----------|---------------------|
| **B** | **Basic Availability** | Application works basically all the time |
| **S** | **Soft-state** | Does not have to be consistent all the time |
| **E** | **Eventual consistency** | Will be in a known state eventually |

---

## 3. CAP Theorem

Only **2 of 3** can be guaranteed:

| Letter | Property | Definition |
|--------|----------|-----------|
| **C** | **Consistency** | All nodes see the same data at the same time |
| **A** | **Availability** | Every request receives a response about success/failure |
| **P** | **Partition Tolerance** | System continues to operate despite network failures |

---

## 4. Three-Level Architecture

| Level | Also Known As | What It Describes |
|-------|---------------|-------------------|
| **Internal** | Physical | How data is physically stored (indexes, compression, encryption) |
| **Conceptual** | Logical | What data is stored and relationships (no physical details) |
| **External** | View | Part of database for a particular group of users |

---

## 5. SQL Command Categories

| Category | Abbreviation | Verbs |
|----------|-------------|-------|
| **Data Definition Language** | DDL | `CREATE`, `ALTER`, `DROP` |
| **Data Manipulation Language** | DML | `INSERT`, `UPDATE`, `DELETE` |
| **Data Query Language** | DQL | `SELECT` |
| **Data Control Language** | DCL | `GRANT`, `REVOKE` |

---

## 6. Normal Forms — One-Line Definitions

| Normal Form | Definition |
|-------------|-----------|
| **1NF** | All attribute values are **atomic** (indivisible). No multi-valued or nested attributes. |
| **2NF** | In 1NF + every non-key attribute is **fully functionally dependent** on the **entire** primary key. |
| **3NF** | In 2NF + **no non-key attribute** is transitively dependent on the primary key. |
| **BCNF** | In 3NF + for every FD **X → Y**, **X is a superkey**. |

### BCNF Rule (memorise this phrase)
> **"Every determinant must be a candidate identifier."**
> **"All attributes should be dependent on the key, the whole key, and nothing but the key."**

---

## 7. Integrity Constraints — Three Types

| Type | Applied Where | Rule |
|------|--------------|------|
| **Key** | Individual relation | No duplicate entries in key attributes |
| **Entity Integrity** | Individual relation | No NULL values in Primary Key |
| **Referential Integrity** | Between two relations | FK must reference an existing tuple (or be NULL) |

### NULL Key Rules
- **Primary Key**: No part can be NULL
- **Foreign Key**: May be NULL (unless declared NOT NULL)

---

## 8. Constraint Violations by Operation

| Operation | Can Violate |
|-----------|-------------|
| **Insert** | Key, Entity Integrity, Referential Integrity |
| **Delete** | Referential Integrity only |
| **Update** | Key, Entity Integrity, Referential Integrity |

### Referential Integrity Actions
| Action | What Happens |
|--------|-------------|
| **REJECT** (default) | Operation is rejected |
| **CASCADE** | Change propagates to referencing tuples |
| **SET NULL** | FK is set to NULL |
| **SET DEFAULT** | FK is set to a default value |

---

## 9. ERD Notation — Symbols

| Symbol | Meaning |
|--------|---------|
| `□ Rectangle` | Entity type |
| `○ Oval` | Attribute |
| `◎ Double oval` | Multi-valued attribute |
| `underline` | Key attribute |
| `◇ Diamond` | Relationship type |
| `—` Single line | Partial participation |
| `═` Double line | Total participation |

### Attribute Types
| Type | Example |
|------|---------|
| Simple (atomic) | Age, PPS number |
| Composite | Address → {Street, Town, County} |
| Single-valued | Age |
| Multi-valued | Genre (for a Movie) |
| Stored | BirthDate |
| Derived | Age (from BirthDate) |

---

## 10. ER Mapping Rules (Decision Table)

| ER Element | → Creates |
|------------|-----------|
| Entity type | Table with all simple attributes |
| Composite attribute | Separate columns for each component |
| Key attribute | PRIMARY KEY (one chosen); others UNIQUE |
| Multi-valued attribute | **New table** {FK, attribute} with composite PK |
| 1 : 1 relationship | FK in either table (merge if both total participation) |
| 1 : N relationship | FK from 1-side **into N-side table** |
| M : N relationship | **New table** {FK1, FK2} with composite PK |
| Recursive relationship | Self-referencing FK in same table |

### Relationship Attribute Migration

| Cardinality | Where Attribute Goes |
|-------------|---------------------|
| 1 : 1 | **Either** side |
| 1 : N | **N side only** |
| M : N | **Cannot migrate** — stays as relationship attribute |

---

## 11. Relational Algebra Operators

| Operator | Symbol | Operation | SQL Equivalent |
|----------|--------|-----------|---------------|
| SELECT | σ | Filter rows | `WHERE` |
| PROJECT | π | Select columns (eliminates duplicates) | `SELECT DISTINCT` |
| UNION | ∪ | Tuples in R or S or both | `UNION` |
| INTERSECTION | ∩ | Tuples in both R and S | `INTERSECT` |
| DIFFERENCE | − | Tuples in R but not S | `EXCEPT` |
| JOIN | ⋈ | Combine tuples from two relations | `JOIN` / `WHERE` |

### UNION Compatibility Requirement
Two relations must have:
1. **Same number of attributes** (same degree)
2. **Same domain** for each corresponding attribute

### Selection Properties
- **Commutative**: σ₁(σ₂(R)) = σ₂(σ₁(R))
- **Cascading**: σ₁(σ₂(R)) = σ₁ AND σ₂(R)

---

## 12. Concurrency Control Problems

| Problem | What Happens |
|---------|-------------|
| **Lost Update** | Two concurrent transactions write to same data; one update is lost |
| **Dirty Read** | One transaction reads data written by another that then **rolls back** |
| **Incorrect Summary** | One transaction calculates aggregate while another updates those attributes |

---

## 13. Two-Phase Locking (2PL)

| Phase | Rule |
|-------|------|
| **Growing** | Acquire locks only — **cannot release** any |
| **Shrinking** | Release locks only — **cannot acquire** any |

> **Theorem**: Any schedule resulting from 2PL is **conflict-serializable**.

### Lock Types

| Lock Type | Also Known As | How Many Can Share? |
|-----------|--------------|---------------------|
| **Read/Write (Shared)** | Shared lock | Multiple transactions |
| **Read/Write (Exclusive)** | Exclusive lock | Only one transaction |
| **Binary** | — | Only one (too restrictive) |

---

## 14. Deadlock Prevention Protocols

| Protocol | Older requests younger's lock | Younger requests older's lock |
|----------|------------------------------|------------------------------|
| **No-Waiting** | Abort (rollback) | Abort (rollback) |
| **Wait-Die** | **Wait** | **Die** (abort) |
| **Wound-Wait** | **Wound** (younger aborts) | **Wait** |
| **Cautious Waiting** | Wait (holder is older) | Abort (holder is younger) |

> **Key memory aid**: In both Wait-Die and Wound-Wait, **older transactions have priority**.

---

## 15. GDPR — Six Principles

| # | Principle | Key Phrase |
|---|-----------|-----------|
| 1 | **Lawful, fairness & transparency** | Processed lawfully, fairly, transparently |
| 2 | **Purpose limitation** | Collected for specified, explicit, legitimate purposes only |
| 3 | **Data minimisation** | Adequate, relevant, limited to what is necessary |
| 4 | **Accuracy** | Accurate and up to date; inaccurate data erased/rectified |
| 5 | **Storage limitation** | Kept only as long as necessary |
| 6 | **Integrity & confidentiality** | Appropriate security |

### GDPR Lawful Bases (Article 6)

1. **Consent**
2. **Contract** performance
3. **Legal obligation**
4. **Vital interests**
5. **Public interest**
6. **Legitimate interests**

### GDPR Data Subject Rights (8)

| # | Right | One-line |
|---|-------|---------|
| 1 | **Access** | Know what data is held and why |
| 2 | **To be Informed** | Clear, transparent information |
| 3 | **Rectification** | Correct inaccurate/incomplete data |
| 4 | **Erasure** | "Right to be forgotten" |
| 5 | **Portability** | Obtain and reuse data in machine-readable form |
| 6 | **Automated Decisions** | Not subject to purely automated decisions |
| 7 | **Object** | Object to certain processing |
| 8 | **Restriction** | Limit how data is processed |

### GDPR Penalties
> Up to **€20 million** or **4% of annual worldwide turnover**, whichever is greater.

---

## 16. NoSQL — Four Types

| Type | Data Model | Best For | Key Trait |
|------|-----------|----------|-----------|
| **Key-Value** | Key → opaque value | Sessions, carts, profiles | Very fast, single index |
| **Document** | JSON documents | Content management, catalogs | Implicitly denormalised |
| **Column** | Column families | Analytics, time-series | Efficient column-ordered ops |
| **Graph** | Nodes + edges | Social networks, recommendations | Cheap relationship traversal |

---

## 17. Relational Algebra → SQL Quick Map

| Algebra | SQL |
|---------|-----|
| `σ<sub>(cond)</sub>(R)` | `SELECT * FROM R WHERE cond` |
| `π<sub>(A,B)</sub>(R)` | `SELECT DISTINCT A, B FROM R` |
| `R ∪ S` | `SELECT ... UNION SELECT ...` |
| `R ∩ S` | `SELECT ... INTERSECT SELECT ...` |
| `R − S` | `SELECT ... EXCEPT SELECT ...` |
| `R ⋈<sub>(cond)</sub> S` | `SELECT ... FROM R, S WHERE cond` |

---

## 18. Conflict Equivalence — Two Operations Conflict If

All three must be true:
1. They belong to **different transactions**
2. They access the **same item X**
3. At least one operation is a **write(X)**

---

## 19. NULL Interpretations

| Interpretation | Example |
|----------------|---------|
| Missing but inapplicable | Zip code for Irish addresses |
| Missing but applicable | Employee's date of birth is empty |
| Unknown | — |
| Known but absent | — |

---

## 20. Superkey vs Candidate Key vs Primary Key

| Term | Definition | Minimal? |
|------|-----------|----------|
| **Superkey** | Any set of attributes that uniquely identifies tuples | No |
| **Candidate Key** | A **minimal** superkey | Yes |
| **Primary Key** | The candidate key chosen by the designer | Yes |

> **Rule**: A superkey is any **superset** of a candidate key.

---

## 21. Design Guidelines (4)

| # | Guideline | Principle |
|---|-----------|-----------|
| 1 | **Attribute Semantics** | Easy to explain each relation's meaning |
| 2 | **Reduction of Redundancy** | No insertion/deletion/modification anomalies |
| 3 | **Reduction of NULLs** | Avoid NULLs unless exceptional |
| 4 | **No Spurious Tuples** | Join on PK/FK pairs only |

---

## 22. Access Control Types

| Type | Description | Security Level |
|------|-------------|---------------|
| **Discretionary (DAC)** | Owner controls access; flexible | Lower |
| **Mandatory (MAC)** | Security levels; rigid | Higher |
| **Role-Based (RBAC)** | Privileges → roles → users | Medium |

### Privilege Types

| Privilege | What It Allows |
|-----------|---------------|
| **SELECT** | Read rows (`SELECT`) |
| **INSERT** | Add rows |
| **UPDATE** | Modify rows |
| **DELETE** | Remove rows |
| **REFERENCES** | Refer to relation in integrity constraints |

---

*Memorise these tables and definitions. In the exam, you'll need to recall them quickly to build your answers — ER diagrams, SQL statements, constraint analysis, and GDPR scenarios all depend on knowing these facts by heart.*