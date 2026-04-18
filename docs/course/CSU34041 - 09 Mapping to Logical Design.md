# Mapping to Logical Design

---

## Overview

- Introduction to Relational Schema Mapping
- Mapping Entity Types
- Mapping Multivalued Attributes
- Mapping Relationships
- Cinema Example

---

## Relational Schema Mapping

### What is it?

How to move from a **conceptual database design** (Entity Relationship Model) to a **logical database design** (Relational Database Schema).

We follow a series of steps to map entity types, relationships, and attributes into **relations**.

### What the mapping creates

**Relations**

- With simple, single-valued attributes

**Constraints**

- Primary keys
- Secondary unique keys
- Referential integrity constraints

---

## Mapping Entity Types

### Rule

> For each entity type _E_ in the ER diagram, create a relation _R_ that includes all the **simple attributes** of _E_.

### Example: BRANCH

**ER Diagram attributes:**

```
BRANCH
├── ID
├── Name
├── Address (composite)
│   ├── Street
│   ├── Town
│   └── County
├── Phone No
└── Website
```

**Mapped relation:**

```
BRANCH
├── branch_id
├── name
├── street
├── town
├── county
├── phone_no
└── website
```

---

### Composite Attributes

When mapping composite attributes, include only the **simple component attributes** in the new relation _R_.

**Before (composite):** `Address → { Street, Town, County }`
**After (decomposed):** `street`, `town`, `county` as separate columns

---

### Key Attributes

- Choose **one** of the key attributes of _E_ as the **primary key** of _R_.
- Composite key attributes can be included as a **composite primary key**.
- Additional key attributes should be included as **secondary unique keys** of the relation.

---

## Mapping Multivalued Attributes

### Rule

> For each multivalued attribute _A_, create a **new relation** _R_.

The new relation _R_ will include:

1. An attribute corresponding to _A_
2. The **primary key _K_** from the relation that represents the entity type that _A_ came from — this becomes a **foreign key** in _R_
3. The **primary key of _R_** is the combination of _A_ and _K_

### Example: BOOK with Genre

**ER Diagram:**

```
BOOK
├── ID
├── Title
├── Author
├── Release Date (composite)
│   ├── Day
│   ├── Month
│   └── Year
├── Publisher
├── Synopsis
└── Genre ⟡ (multivalued)
```

**Mapped relations:**

```
BOOK
├── book_id         ← primary key
├── title
├── synopsis
├── author
├── cert
├── publisher
├── release_day
├── release_month
└── release_year

GENRE
├── book_id         ← foreign key + part of composite PK
└── genre           ← part of composite PK
```

---

## Mapping Relationships

In addition to mapping entity types, we also need to map the **relationship types**.

Each relationship type is modeled differently:

| Cardinality | Approach                       |
| ----------- | ------------------------------ |
| **1 : 1**   | Foreign Key or Merged Relation |
| **1 : N**   | Foreign Key on the N-side      |
| **M : N**   | New relation with composite PK |

---

## Mapping 1 : 1 Relationships

### Two Approaches

| Approach                     | When to Use                                      |
| ---------------------------- | ------------------------------------------------ |
| **Foreign Key Approach**     | Most commonly used                               |
| **Merged-Relation Approach** | Used when both entities have total participation |

---

### Foreign Key Approach

**Steps:**

1. Identify the relations _S_ and _T_ that correspond to the entity types participating in _R_.
2. Choose one of the participating relations, say _S_.
3. Include as a **foreign key in _S_** the primary key of _T_.
4. If possible, choose an entity type with **total participation** in _R_ for the role of _S_.
5. Include all the simple attributes of the relationship type _R_ as attributes of _S_.

> ⚠ You cannot use a foreign key attribute in either participating entity if neither has total participation.

### Example: EMPLOYEE — CONTRACTS — CONTRACT

**ER Diagram:**

```
EMPLOYEE ──1── contracts ──1── CONTRACT
```

**Mapped relations:**

```
EMPLOYEE
├── employee_id     ← primary key
├── fname
├── lname
├── address
└── contract_id     ← foreign key to CONTRACT

CONTRACT
├── contract_id     ← primary key
└── start_date
```

---

### Merged-Relation Approach

**Conditions:** Only usable when **both _S_ and _T_ have total participation** in the relationship type _R_.

**Steps:**

1. Merge the two entity types _S_ and _T_ and the relationship type _R_ into **one single relation _V_**.
2. _V_ should include all the simple component attributes of _S_, _T_, and _R_.
3. This is possible as joint total participation indicates the two tables will have an **identical number of tuples** at all times.

### Example: EMPLOYEE + CONTRACT → EMPLOYEE_RECORD

```
EMPLOYEE_RECORD
├── contract_id
├── start_date
├── employee_id
├── fname
├── lname
└── address
```

---

## Mapping 1 : N Relationships

### Rule

For each binary 1:N relationship type _R_:

1. Identify _S_ — the relation corresponding to the entity type on the **N-side** of _R_.
2. Include as a **foreign key in _S_** the primary key of _T_ (the relation representing the entity type at the other side).
3. Include any simple attributes of the relationship type _R_ as attributes of _S_ (or simple component attributes of a composite attribute).

### Example: PLAY — STAGED ON — STAGE

**ER Diagram:**

```
PLAY ──1── staged on ──N── STAGE
```

**Mapped relations:**

```
PLAY
├── play_id         ← primary key
└── title

STAGE
├── number          ← primary key
├── stage_type
├── capacity
├── location
├── play_id         ← foreign key to PLAY
├── time
└── date
```

---

## Mapping Recursive Relationships

### What is a recursive relationship?

A relationship where an entity instance can refer to **another instance of the same entity type**.

### Rule

For each recursive relationship type _R_:

1. Identify _T_, the entity type.
2. Include the **primary key of _T_** as a **foreign key in the same relation _T_**.
3. Include any simple attributes of the relationship type _R_ as attributes of _T_ (or simple component attributes of a composite attribute).

### Example: EMPLOYEE — SUPERVISES / SUPERVISED BY

**ER Diagram:**

```
EMPLOYEE ──1── Supervised by ──N── Supervises ──1── EMPLOYEE
```

**Mapped relation (single table):**

```
EMPLOYEE
├── employee_id     ← primary key
├── fname
├── lname
├── address
└── supervisor_id   ← foreign key to EMPLOYEE (self-referencing)
```

---

## Mapping M : N Relationships

### Why is M:N more complex?

As each entity instance may reference **many** entity instances in the other participating entity type, you **cannot** use a foreign key attribute in either participating entity. You **must** create a new relation to represent the relationship type.

### Rule

For each binary M:N relationship type _R_:

1. **Create a new relation _S_** to represent _R_.
2. Include as **foreign key attributes in _S_** the primary keys of the relations that represent the participating entity types.
3. The **combination of these foreign keys is the composite primary key** of _S_.
4. Include any simple attributes of the relationship type _R_ as attributes of _S_ (or simple component attributes of a composite attribute).

### Example: LECTURER — TEACHES / LEARNS FROM — STUDENT

**ER Diagram:**

```
LECTURER ──M── Teaches / Learns from ──N── STUDENT
```

**Mapped relations:**

```
LECTURER
├── staff_id        ← primary key
├── lname
└── fname

STUDENT
├── student_id      ← primary key
├── lname
└── fname

LECTURE
├── staff_id        ← foreign key + part of composite PK
├── student_id      ← foreign key + part of composite PK
└── contact_hours   ← relationship attribute
```

---

## Summary

| Concept                                    | Mapping Rule                                                              |
| ------------------------------------------ | ------------------------------------------------------------------------- |
| **Each entity**                            | Create a table                                                            |
| **Composite attributes**                   | Include the simple ones as separate attributes (don't combine)            |
| **Multivalued attribute**                  | Create additional table with FK and composite primary key                 |
| **1 : 1 relationships**                    | FK approach — no extra table; include FK of one entity in the other       |
| **1 : 1 (total participation both sides)** | Merged Relation approach — merge the 2 tables                             |
| **1 : N relationships**                    | Include FK in the N-side table; include simple attributes in N-side table |
| **M : N relationships**                    | Create additional table; two FKs in new table form composite PK           |

---

## Cinema Example — ER Diagram

```
THEATRE ──1── located in ──N── SCREEN ──1── displays ──N── SCREENING
  │                                                    │
  │                                                    │
  └──── contains ──────────────────────────────────────┘
                                        │
                                   1    │    N
                                     ────┴────
                                     SHOW (E)

THEATRE attributes:
  ├── theatre_id (ID)
  ├── name (Name)
  ├── street (Address → Street)
  ├── town
  ├── county
  ├── phone_no (Phone No)
  └── website

SCREEN attributes:
  ├── number (ID)
  ├── screen_type (Type)
  ├── capacity
  └── location

SCREENING attributes:
  ├── screening_id (ID)
  ├── time
  ├── date
  ├── movie_id (FK)
  └── screen_number (FK)

MOVIE attributes:
  ├── movie_id (ID)
  ├── title
  ├── synopsis
  ├── director
  ├── cert
  ├── running_time
  ├── release_day
  ├── release_month
  └── release_year

Genre (multivalued) → separate table
```

---

## Cinema Example — Mapped Relations

```
THEATRE
├── theatre_id        ← PK
├── name
├── street
├── town
├── county
├── phone_no
└── website

SCREEN
├── number            ← PK
├── screen_type
├── capacity
├── location
└── theatre_id        ← FK → THEATRE

SCREENING
├── screening_id      ← PK
├── time
├── date
├── movie_id          ← FK → MOVIE
└── screen_number     ← FK → SCREEN

MOVIE
├── movie_id          ← PK
├── title
├── synopsis
├── director
├── cert
├── running_time
├── release_day
├── release_month
└── release_year

GENRE
├── movie_id          ← FK + part of PK
└── genre             ← part of PK
```
