# Entity Relationship Modelling

---

## Today's Lecture

- **Entity Relationship Modelling**
  - Entities
  - Attributes
    - Entity Types
    - Entity Sets
    - Simple vs Composite
    - Single vs Multi-valued
    - Stored vs Derived
    - Relationship Type Attributes
- **Relationships**
  - Relationship Types and Sets
  - N-ary relationships
  - Recursive Relationships
  - Relationship Constraints
    - Cardinality Constraints
    - Participation Constraints

---

## Conceptual Design

The process of **conceptual design** uses a high-level conceptual data model to create the conceptual schema for a database — in this case, the **Relational Model**. This is part of the requirements analysis process.

A **Conceptual Schema** is a concise description of the data requirements of the user, including descriptions of:

- Entity types
- Relationships
- Constraints

---

## Conceptual Design (cont.)

- The conceptual schema **does not include any implementation details** — hence, it can be used to communicate with non-technical users.
- It is used as a reference to ensure all data requirements are met, and that there are no conflicts.
- It is part of **physical and logical data independence**.

---

## Entity Relationship Model

- An **abstract and high-level conceptual representation** of information.
- **Entity Relationship Diagrams (ERDs)** — the diagrammatic notation of the ER model.
- Used to support the conceptual design of databases and help produce the conceptual schema.
- Describes data as **entities**, **relationships**, and **attributes**.

---

## Entities

The basic object that an ER diagram represents is an **entity**.

- An entity is a **real-world object with an independent existence** — physical or conceptual.
- Each entity has **attributes** which are the particular properties that describe the real-world object.

**Examples:** `PRODUCT`, `CUSTOMER`, `CAR`, `MOVIE`

---

## Attributes

Several types of attributes occur and need to be modelled in the Entity-Relationship Model:

- **Simple** vs **Composite**
- **Single-valued** vs **Multi-valued**
- **Stored** vs **Derived**

---

## Simple and Composite Attributes

- **Composite attributes** can be divided into smaller sub-parts.
  - _Example:_ `Address`
- Attributes that are not divisible are called **simple** (or **atomic**) attributes.
  - _Example:_ `Movie Certificate`, `Age`
- Composite attributes can be **hierarchical**.
  - _Example:_ `Apartment number` → `Building number` → `Street`

---

## Single and Multi-Valued Attributes

- Most attributes have a **single value** for each entity — such attributes are called **single-valued**.
  - _Example:_ `PPS number`, `Age`
- In some cases, an attribute can have a **set of values** for an entity — such attributes are called **multi-valued**.
  - _Example:_ `Genre` for a `Movie`, `Colour` for a `Car`
  - Some entities may have one value, others multiple.

---

## Stored versus Derived Attributes

- In some cases, two or more attributes are related:
  - _Example:_ `Age` and `BirthDate`
- `Age` can be calculated using today's date and a person's date of birth.
  - `Age` is therefore called a **derived attribute** — it is derivable from `BirthDate`.
  - `BirthDate` is called a **stored attribute**.

---

## Stored versus Derived Attributes (cont.)

Some attributes can be derived from information in **related entities**, rather than attributes:

- If a `number_of_employees` attribute was associated with a `CINEMA` entity, this could be derived by **totaling** the number of `employee` entries stored in the `EMPLOYEE` entity.

---

## Entity Types and Sets

ER diagrams **don't show single instances** of entities (or relations). They show **entity types**:

- An **entity type** is identified by its name and attributes.
  - _Example:_ In a cinema database, `MOVIE` could be an entity type.
  - All movie entities share the same attributes, but each instance has its own value for each attribute.
- The **collection of all instances** of a particular entity type in a database is called an **entity set**.

| Entity Type                            | Entity Set                                                                                     |
| -------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `EMPLOYEE` — Name, Age, Salary         | John Smith, 55, 80,000<br>Fred Brown, 40, 30,000<br>Judy Clark, 25, 45,000<br>…                |
| `DEPARTMENT` — Name, Location, Manager | Research, Dundrum, John Smith<br>Sales, Dublin 1, Judy Clark<br>Online, Finglas, Bob King<br>… |

---

## Entity Relationship Diagrams

| Notation            | Meaning                                                 |
| ------------------- | ------------------------------------------------------- |
| **Rectangular box** | Entity Type (encloses the entity name)                  |
| **Oval**            | Attribute (attached to entity type by straight line)    |
| **Double oval**     | Multi-valued attribute                                  |
| **Straight lines**  | Composite attributes (attached to component attributes) |

---

## Key Attributes

- Each entity type usually has **one or more attributes** whose values are **unique** for each instance in the entity set.
- An attribute whose values are used to uniquely identify each entity is called the **key attribute**.
  - _Examples:_ `ISBN`, `PPS`, `Student Number`
- More than one attribute can be used to form the key — in this case the **combination** must be unique (**composite key**).

**Key attributes are represented by <u>underlining</u> the attribute.**

### Example: `MOVIE`

```
        Director
           │
           ▼
     ┌─────┴─────┐
     │   Running   │
     │   Time      │
     └─────┬─────┘
           │
    ┌──────┴──────┐
    ▼             ▼
  Title      Release Date
                 │
          ┌──────┴──────┐
          ▼             ▼
        Month          Year
          │
          ▼
     Synopsis
          │
          ▼
        Genre
          │
          ▼
        Cert
```

_(Underlined attributes are key attributes.)_

---

## Key Attributes (cont.)

- Specifying the key attribute places a **uniqueness constraint** on the entity type — this must hold for every instance of an entity in the entity set.
- The key constraint is **derived from the real-world requirements** that the database represents.

### Example: `CAR` with composite key

```
     ┌──────────────────────┐
     │   Engine No          │
     │   Make               │
     │   CC                 │
     │   Year               │
     │                      │
     │        CAR           │
     │                      │
     │   Model              │
     │   Registration       │
     │                      │
     │   County Number      │
     └──────────────────────┘
```

---

## Example — Movie Theatres

**Scenario:** Model a chain of Movie Theatres where the movie chain consists of theatres containing (movie) screen rooms in which screenings (of movies) are held.

**Entity types identified:**

- `MOVIE`
- `THEATRE`
- `SCREEN`
- `SCREENING`

---

### `MOVIE` Entity

```
        Director
           │
           ▼
     ┌─────┴─────┐
     │   Running   │
     │   Time      │
     └─────┬─────┘
           │
    ┌──────┴──────┐
    ▼             ▼
  Title      Release Date
                 │
          ┌──────┴──────┐
          ▼             ▼
        Month          Year
          │
          ▼
     Synopsis
          │
          ▼
        Genre
          │
          ▼
        Cert
```

---

### `THEATRE` Entity

```
     ┌─────┬─────┐
     │  Street        │
     └─────┬─────┘
           │
    ┌──────┴──────┐
    ▼             ▼
  Name      Address
                 │
          ┌──────┴──────┐
          ▼             ▼
       Town         County
          │
          ▼
      Website
          │
          ▼
     Phone No
```

---

### `SCREEN` Entity

```
     ┌─────┬─────┐
     │  Number        │
     └─────┬─────┘
           │
    ┌──────┴──────┐
    ▼             ▼
  Screen       Type
                 │
          ┌──────┴──────┐
          ▼             ▼
      Location     Capacity
                 │
                 ▼
              Theatre
```

---

### `SCREENING` Entity

```
     ┌─────┬─────┐
     │  Screen        │
     └─────┬─────┘
           │
    ┌──────┴──────┐
    ▼             ▼
  ID          Date
                 │
          ┌──────┴──────┐
          ▼             ▼
      Movie          Time
```

---

## Relationships

- A **relationship** captures how two or more entity types are related to one another.
- Whenever an attribute of an entity type refers to another entity type, a relationship exists.
  - _Implicit relationships:_ `SCREEN` and `THEATRE`, `SCREENING` and `MOVIE`, `SCREENING` and `SCREEN`.
  - In the ER model, these references should **not** be represented as attributes, but as **relationships**.

A relationship can be informally thought of as a **verb**, linking two or more **nouns**:

- "manages" — between an employee and a department
- "performs" — between an artist and a song
- "teaches" — between a lecturer and a student
- "proved" — between a mathematician and a theorem

---

## Relationship Types and Sets

- As with entities, relationships have a **relationship type**, illustrated in an ER diagram.
- The collection of all instances of a particular relationship type is called a **relationship set**.
- Related entity types are said to **participate** in a relationship type.
- Each relationship instance, _rᵢ_, is an association of entities, where the association includes exactly one entity from each of the participating entity types.

---

## Relationship Types — Example

```
    MOVIE ──────── SHOW ──────── SCREENING
                (Shown in)      (Shows)
```

---

## Binary and Ternary Relationships

- The **degree** of a relationship type is the number of entity types that participate.
  - The `SHOW` relationship is of **degree two**.
- Relationship types of degree two are called **binary**.
- Relationship types of degree three are called **ternary**.

### Ternary Example

```
    PART ──────── SUPPLY ──────── COMPANY
                  (SUPPLY)
          │
          ▼
     SUPPLIER
```

---

## Relationship Roles

- Each entity type that participates in a relationship type plays a particular **role**.
- A **role name** can be optionally added to an ER diagram to clearly identify what the relationship means.

```
    MOVIE ──(Shows)── SHOW ───(Shown in)── SCREENING
```

---

## Recursive Relationships

- In some cases, the **same entity type** participates more than once in a relationship type, in different roles.
- Such relationships are called **recursive relationships**.
- The **relationship roles** are key in distinguishing the role each participating entity plays.

### Example: `EMPLOYEE` — `SUPERVISION`

```
    EMPLOYEE ──(Supervises)── SUPERVISION ──(Supervised by)── EMPLOYEE
```

The `SUPERVISION` relationship relates an employee to a supervisor, where both employee and supervisor are members of the **same entity set**.

---

## Relationship Constraints

Constraints **limit the possible combination** of entities that can participate in a relationship. These constraints are determined by the **real-world requirements** being modelled.

Two main types of relationship constraint:

1. **Cardinality Constraints** — specify the _maximum_ number of relationship instances an entity can participate in.
2. **Participation Constraints** — specify the _minimum_ number of relationship instances an entity can participate in.

---

## Cardinality Constraints

Consider the `SHOW` relationship type:

- Cardinality ratio for `MOVIE : SCREENINGS` is **1 : N**
  - Each movie can be shown in **many** screenings.
  - Each screening shows a **maximum of one** movie.

```
    MOVIE ───(1)─── SHOW ───(N)─── SCREENING
             (Shown in)     (Shows)
```

### Possible Cardinality Ratios for Binary Relationships

| Ratio     | Name         |
| --------- | ------------ |
| **1 : 1** | One to One   |
| **1 : N** | One to Many  |
| **M : N** | Many to Many |

---

## Cardinality Constraints — Examples

### ? : ? — Employment

```
    CONTRACT
    (contracts)
       │
       ▼
    EMPLOYMENT
    (is contracted by)
       │
       ▼
    EMPLOYEE
```

### 1 : 1 — One to One

```
    CONTRACT
    (contracts)
       │
    1  │  1
       │
       ▼
    EMPLOYMENT
    (is contracted by)
       │
       ▼
    EMPLOYEE
```

### 1 : N — One to Many

```
    LECTURER ───(Teaches)── LECTURE ───(Learns from)── STUDENT
         │                   (M)                    (N)
```

---

## Participation Constraints

Specify the **minimum** number of relationship instances that an entity can participate in.

Two types:

- **Total participation** — every entity must participate.
- **Partial participation** — some entities participate, others do not.

Formally, participation constraints specify if the **existence** of an entity depends on its being related to another entity via the relationship type.

---

## Total Participation

Company policy states that **every Employee MUST work for a department**:

```
    EMPLOYEE ─════ WORKS ─════ DEPARTMENT
        │        (Works in)   (Employs)
        │            │              │
        │         (N)            (1)
        │
    ════ (double line = total participation)
```

An employee entity can **only exist** if they participate in at least one `WORKS` relationship between `EMPLOYEE` and `DEPARTMENT`.

- The participation of `EMPLOYEE` in `WORKS` is called **total participation**.
- Total participation is also called **existence dependency**.

---

## Partial Participation

In the same company, **not every employee** will be responsible for managing a department:

```
    EMPLOYEE ────── MANAGE ────── DEPARTMENT
        │        (manages)   (managed by)
        │           │             │
        │          (N)           (1)
        │
    ─── (single line = partial participation)
```

An employee entity can **exist** without participating in the `MANAGE` relationship.

- The participation of `EMPLOYEE` in `MANAGE` is called **partial participation**.

Together, **cardinality constraints** and **participation constraints** are referred to as the **structural constraints** of a relationship type.

### Notation

| Notation        | Meaning                                    |
| --------------- | ------------------------------------------ |
| **Single line** | Partial participation                      |
| **Double line** | Total participation (existence dependency) |

---

## Relationship Type Attributes

In the Entity Relationship Model, **relationship types can have attributes**, similar to entity types.

```
    EMPLOYEE ──── MANAGE ──── DEPARTMENT
        │      (Start Date)      │
        │                        │
        │         (manages)      │
        │         (managed by)   │
```

### Migrating Relationship Attributes

These relationship attributes can be migrated to participating entities depending on cardinality:

| Cardinality | Migration Rule                                                        |
| ----------- | --------------------------------------------------------------------- |
| **1 : 1**   | Attribute can be migrated to **either** side                          |
| **1 : N**   | Attribute can only be migrated to the **N side**                      |
| **M : N**   | Attribute **cannot** be migrated; remains as a relationship attribute |

### 1 : 1 Example

```
    EMPLOYEE ───(Start Date)─── CONTRACT ───(Start Date)─── EMPLOYMENT
        │                        (contracts)                 │
        │                                                     │
        │                       (is contracted by)            │
        │                                                     │
        └─────────────────────────────────────────────────────┘
```

### 1 : N Example

```
    EMPLOYEE ────(Start Date)─── MANAGE ──── DEPARTMENT
        │                          (manages)
        │                          (managed by)
        │
     (1)                             (N)
```

The `Start Date` attribute migrates to the **N side** (`DEPARTMENT`).

### M : N Example

```
    LECTURER ──(Contact, Hours)── LECTURE ──(Learns from)── STUDENT
           (Teaches)                 (M)                    (N)
```

The `Contact` and `Hours` attributes **cannot** be migrated and remain as relationship attributes.

---

## Cinema Example (Revisited)

**Scenario:** Present the relationships between `MOVIE`, `THEATRE`, `SCREENING`, and `SCREEN`:

- A movie is **shown in** a screening
- A Screen (room) **has a location in** a theatre
- A Screening **is displayed in** a Screen (room)

### Full ER Diagram

```
    MOVIE ────(1)── SHOW ────(N)── SCREENING ────(1)── DISPLAY ────(N)── SCREEN
     │              (Shows)   (shown in)   (displays)   (located in)   │
     │                                                                 │
     │    ┌─────┬─────┐                          ┌─────┬─────┐         │
     │    │Director │                           │Number │         │
     │    └───┬───┬─┘                          └───┬───┘         │
     │        │   │                                  │            │
     │  ┌─────┴───┴─────┐                     ┌──────┴──────┐     │
     │  │  Running Time   │                     │   Location   │     │
     │  └──────┬────────┘                     └─────────────┘     │
     │         │                                                    │
     │  ┌──────┴──────┐                                              │
     │  ▼             ▼                                              │
     │ Title      Release Date                                        │
     │              │                                                 │
     │       ┌──────┴──────┐                                    ┌─────┴─────┐
     │       ▼             ▼                                    │  Capacity  │
     │     Month          Year                                   └───────────┘
     │        │
     │        ▼
     │   Synopsis
     │        │
     │        ▼
     │      Genre
     │        │
     │        ▼
     │       Cert
     │
     │
     │
     │
     │
     └──────────────────────────────────────────────────────────────┘

    THEATRE ────(1)── LOCALE ────(N)── SCREEN
               (contains)  (Number)
                  │
        ┌────────┴────────┐
        ▼                 ▼
     Name             Address
                         │
                  ┌──────┴──────┐
                  ▼             ▼
                Town         County
                  │
                  ▼
                Website
                  │
                  ▼
                Phone No
```

### Relationships Summary

| Relationship | Entities               | Cardinality |
| ------------ | ---------------------- | ----------- |
| `SHOW`       | `MOVIE` → `SCREENING`  | 1 : N       |
| `LOCALE`     | `THEATRE` → `SCREEN`   | 1 : N       |
| `DISPLAY`    | `SCREENING` → `SCREEN` | 1 : N       |

---

## DVD Shop Example

**Scenario:** Model a DVD Rental shop called **LotsoVision**:

- The shop stores information about the DVDs it rents (titles, cert, genre, etc.) and the customers that rent them (Name, Address, Phone, etc.).
- A customer can rent **many** DVDs. Each DVD can be rented to **many** customers.

### Entities

```
    ┌──────────┐         ┌──────────┐
    │  CERT    │         │ ADDRESS  │
    └────┬─────┘         └────┬─────┘
         │                    │
    ┌────┴─────┐         ┌────┴─────┐
    │    ID    │         │   NAME   │
    └────┬─────┘         └────┬─────┘
         │                    │
    ┌────┴─────┐         ┌────┴─────┐
    │   TITLE  │         │  PHONE   │
    └────┬─────┘         └──────────┘
         │
    ┌────┴─────┐
    │  GENRE   │ (multi-valued)
    └──────────┘

        DVD               CUSTOMER
```

### Relationship

```
    DVD ────(M)── RENTAL ────(N)── CUSTOMER
              (rented to)    (rents)
                     │
                  Returned Date
```

---

## Airline Example

**Scenario:** Represent an Airline company that schedules many flights:

- An airline company flies **many** flights.
- Each flight is flown by **only one** airline.

### Entities

```
    ┌──────────┐         ┌──────────┐
    │ ADDRESS  │         │   ID     │
    └────┬─────┘         └────┬─────┘
         │                    │
    ┌────┴─────┐         ┌────┴─────┐
    │   NAME   │         │ NUMBER   │
    └──────────┘         └────┬─────┘
                             │
                       ┌─────┴─────┐
                       │  PHONE    │
                       └───────────┘

        AIRLINE

    ┌──────────┐         ┌──────────┐
    │ DEPARTURE │        │ ARRIVAL  │
    │   TIME    │        │  TIME    │
    └──────────┘         └──────────┘
             │
       ┌─────┴─────┐
       │ CAPACITY  │ (multi-valued)
       └───────────┘

        FLIGHT
```

### Relationship

```
    AIRLINE ────(1)── SCHEDULE ────(N)── FLIGHT
               (flies)  (is flown by)
```

---

## Factory Example

**Scenario:** The Globex Corporation operates many factories:

- Each factory is located in a region; each region can have **more than one** factory.
- Each factory employs **many** employees, but each employee is employed by **only one** factory.

### Entities

```
    ┌──────────┐         ┌──────────┐
    │ ADDRESS  │         │   ID     │
    └────┬─────┘         └────┬─────┘
         │                    │
    ┌────┴─────┐         ┌────┴─────┐
    │   NAME   │         │ PHONE    │
    └──────────┘         └──────────┘

       REGION

    ┌──────────┐         ┌──────────┐
    │ ADDRESS  │         │  PPS     │
    └────┬─────┘         └────┬─────┘
         │                    │
    ┌────┴─────┐         ┌────┴─────┐
    │  PHONE   │         │  NAME    │
    └──────────┘         └────┬─────┘
                             │
                       ┌─────┴─────┐
                       │  MANAGER   │
                       └───────────┘

       FACTORY           EMPLOYEE
```

### Relationships

```
    REGION ────(1)── LOCALE ────(N)── FACTORY
              (located in)  (contains)

    FACTORY ────(1)── EMPLOY ────(N)── EMPLOYEE
                 (employs)  (employed by)
```

---

## Builder Example

**Scenario:** BigBuilder Construction Company — a building contractor specialising in mid-range homes:

- BigBuilder has **customers** and **employees**, handles **projects**, and owns **equipment**.
- A customer can engage the company for work on **more than one** project.
- Employees can work on **more than one** project at a time.
- Equipment is **always assigned to only one** project at a time.

### Entities

```
    ┌──────────┐         ┌──────────┐
    │   NAME   │         │   ID     │
    └──────────┘         └────┬─────┘
                             │
                       ┌─────┴─────┐
                       │   PHONE    │
                       └───────────┘

      CUSTOMER

    ┌──────────┐         ┌──────────┐
    │ ADDRESS  │         │   PPS    │
    └────┬─────┘         └────┬─────┘
         │                    │
    ┌────┴─────┐         ┌────┴─────┐
    │   NAME   │         │  PHONE   │
    └──────────┘         └──────────┘

      EMPLOYEE

    ┌──────────┐         ┌──────────┐
    │   NAME   │         │   ID     │
    └──────────┘         └──────────┘

      PROJECT

    ┌──────────┐         ┌──────────┐
    │   NAME   │         │   ID     │
    └──────────┘         └────┬─────┘
                             │
                       ┌─────┴─────┐
                       │  MANAGER   │
                       └───────────┘

     EQUIPMENT
```

### Relationships

```
    CUSTOMER ────(1)── ENGAGE ────(M)── PROJECT
              (engages)  (is engaged)

    EMPLOYEE ────(M)── ASSIGN ────(N)── PROJECT
                (assigned to) (assigned)

    EQUIPMENT ────(1)── ASSIGN ────(N)── PROJECT
                (assigned to) (assigned)

    FACTORY ────(1)── EMPLOY ────(N)── EMPLOYEE
                 (employs)  (employed by)
```

---

_Information Management and Data Engineering_
