# CSU34041 — Database Constraints

**Lecturer:** Yvette Graham  
**Email:** ygraham@tcd.ie

---

## Overview

- Types of Constraints
- Explicit Constraints
- Integrity Constraints in Detail
- Constraint Violations
- Complex Constraints

---

## Relational Model Constraints

### Explicit Constraints

Constraints expressed within the **Relational Schema**.

### Semantic Constraints

Constraints that **cannot** be expressed within the Relational Schema.

- Can be expressed in SQL in some cases
- Usually enforced by the application programs

---

## Integrity vs Security

> Integrity and Security are related but they are **not** the same.

| **Integrity**                          | **Security**                           |
| -------------------------------------- | -------------------------------------- |
| Concerned with _accidental_ corruption | Concerned with _deliberate_ corruption |
| Integrity Constraints                  | Security Policies — Access Control     |

---

## Integrity Constraints

Three types of integrity constraint are considered part of the relational model:

1. **Key**
2. **Entity Integrity**
3. **Referential Integrity**

The DBMS must be able to enforce these constraints.

---

## Key Constraints

Keys are used to **uniquely identify a tuple**.

- Specifies that there may not be any duplicate entries in key attributes
- Having a duplicate value in a Key implies that we cannot uniquely identify some tuples

### Primary Key vs Candidate Keys

- **Primary Key** — the chosen candidate key
- **Candidate Keys** — all attributes/attribute sets that could serve as a primary key

---

## Entity Integrity Constraints

Specifies that there may not be any **NULL** values in the Primary Key attribute.

- The Primary Key is used to uniquely identify each tuple in a relation
- Having NULL in a Primary Key implies that we cannot identify some tuples

---

## Referential Integrity

Referential Integrity constraints are specified **between two relations**.

> A tuple in one relation that refers to another relation must refer to an **existing tuple** in that relation.

A **Foreign Key** formally specifies a Referential Integrity Constraint between two relations.

Entity constraints are specified on **individual relations**; Referential Integrity constraints are specified **between two relations**.

---

## NULL Keys

| Rule            | Detail                               |
| --------------- | ------------------------------------ |
| **Primary Key** | No part of a Primary Key can be NULL |
| **Foreign Key** | May be NULL in certain circumstances |

A decision must be made during schema design as to whether it is valid for the foreign key to be NULL at any point.

### Composite Foreign Keys

If a composite Foreign Key is allowed to contain NULLs, then **either all** the component attributes should be NULL or **none** of them — in order to enforce referential integrity.

---

## NULL Key Example

Consider a `GP_ID` (Primary Key) and `GP` (Foreign Key) in a relation.

| Question             | Answer                                                  |
| -------------------- | ------------------------------------------------------- |
| Can `GP_ID` be NULL? | **NO** — `GP_ID` is a primary key                       |
| Can `GP` be NULL?    | **Yes** — `GP` is only a foreign key, so it can be NULL |

---

## Referential Integrity in Practice

> Should we allow `student_no` in the `result` table to be NULL?

**No.** This would defy logic — a result should not be able to exist without a student. It is also the PK — it can't be null.

---

## Constraint Violation

There are three basic operations that modify the state of relations in a database:

1. **Insert**
2. **Update**
3. **Delete**

These operations must not violate the integrity constraints specified for the database — Key, Entity, and Referential Integrity.

---

## Insert Constraint Violation

An insert provides a list of attribute values for a new tuple _t_ that is to be added to relation _R_.

Inserts can violate **all** integrity constraints:

- **Key** — may not be any duplicate entries in key attributes
- **Entity Integrity** — may not be any NULL values in the Primary Key attribute
- **Referential Integrity** — a Foreign Key formally specifies a referential integrity constraint between two relations

### Example: EMPLOYEE

The EMPLOYEE relation has attributes including `Ssn` (PK), `Fname`, `Lname`, `Bdate`, `Address`, `Sex`, `Salary`, `Super_ssn` (FK), `Dno` (FK).

#### Can we insert?

```
< 'Cecilia', 'F', 'Kolonsky', NULL, '1960-04-05',
  '6357 Windy Lane, Katy, TX', F, 28000, NULL, 4 >
```

**No.** This insertion violates the **Entity Integrity** constraint — NULL is provided for the Primary Key (`Ssn`), so the insertion is rejected.

---

```
< 'Alicia', 'J', 'Zelaya', '999887777', '1960-04-05',
  '6357 Windy Lane, Katy, TX', F, 28000, '987654321', 4 >
```

**No.** This insertion violates the **Key** constraint — another tuple with the same `Ssn` value already exists in the EMPLOYEE relation, so it is rejected.

---

```
< 'Cecilia', 'F', 'Kolonsky', '677678989', '1960-04-05',
  '6357 Windswept, Katy, TX', F, 28000, '987654321', 7 >
```

**No.** This insertion violates the **Referential Integrity** constraint specified on `Dno` in EMPLOYEE — no corresponding tuple exists in DEPARTMENT with `Dnumber = 7`.

---

```
< 'Cecilia', 'F', 'Kolonsky', '677678989', '1960-04-05',
  '6357 Windy Lane, Katy, TX', F, 28000, NULL, 4 >
```

**Yes.** This insertion satisfies all constraints, so it is acceptable.

---

## Delete Constraint Violation

To specify a deletion, a condition on the attributes of a relation is created which selects one or more tuples to be deleted.

The Delete operation can only violate the **Referential Integrity** constraint.

### Example 1

> Can we delete any tuples in `WORKS_ON` with `Essn = '999887777'` and `Pno = 10`?

**Yes.** This deletion is acceptable and deletes exactly one tuple.

### Example 2

> Can we delete any tuples in `EMPLOYEE` with `Ssn = '999887777'`?

**No.** This deletion is not acceptable because there are tuples in `WORKS_ON` that refer to this tuple. If the tuple in EMPLOYEE is deleted, Referential Integrity violations will result.

### Example 3

> Can we delete any tuples in `EMPLOYEE` with `Ssn = '333445555'`?

**No.** This deletion will result in even worse Referential Integrity violations. The tuple involved is referenced by tuples from the `EMPLOYEE`, `DEPARTMENT`, `WORKS_ON`, and `DEPENDENT` relations.

---

## Cascading Deletes

An option to address Delete operations which violate Referential Integrity is to **cascade** (or propagate) the deletion.

**For instance:**

1. Delete any tuples in `EMPLOYEE` with `Ssn = '999887777'`
2. The DBMS could automatically delete the offending tuples from `WORKS_ON` in addition to the original tuple in `EMPLOYEE`

> ⚠️ This must be implemented carefully, as it can lead to unintentional loss of data.

---

## Update Constraint Violation

An Update operation is used to change the values of one or more attributes of a relation.

To specify an update, a condition on the attributes of a relation is created which selects one or more tuples to be modified.

Updates can violate **all** integrity constraints:

- **Key**
- **Entity Integrity**
- **Referential Integrity**

### Example 1

> Can we update the salary of any EMPLOYEE tuples with `Ssn = '999887777'` to `28000`?

**Yes.** This modification is acceptable and updates exactly one tuple.

### Example 2

> Can we update the `Dno` of any EMPLOYEE tuples with `Ssn = '999887777'` to `1`?

**Yes.** This modification is acceptable and updates exactly one tuple.

### Example 3

> Can we update the `Dno` of the EMPLOYEE tuple with `Ssn = '999887777'` to `7`?

**No.** This update violates **Referential Integrity** — there is no entry in the DEPARTMENT relation with a `Dnumber` of 7.

### Example 4

> Can we update the `Ssn` of any EMPLOYEE tuples with `Ssn = '999887777'` to `'987654321'`?

**No.** This update violates:

- The **Key** constraint — it repeats a value that already exists as a Primary Key in another tuple
- **Referential Integrity** constraints — there are other relations that refer to the existing value of `Ssn`

---

## Cascading Updates

As with Delete, an option to address Update operations which violate Referential Integrity is to **cascade** (or propagate) the update.

**For instance:**

- Update the `Ssn` of any EMPLOYEE tuples with `Ssn = '333445555'` to `'123123123'`
- The DBMS could automatically update the relations which have a Foreign Key to `Ssn` — `WORKS_ON`, `DEPARTMENT`, `DEPENDENT` and `EMPLOYEE` itself

---

## Alternatives to Cascading

The alternatives to the cascading of updates or deletes are:

1. **Rejection** — reject the update or delete as long as foreign key references exist
2. **SET NULL** — update of the corresponding foreign key to NULL
3. **SET DEFAULT** — update of the corresponding foreign key to some default value

---

## Constraints in SQL

### Table vs Assertions

| Type                  | Description                                                                                                                                                                               |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Table Constraints** | Specified as part of relation/table definition; specified on each table individually; typically specified during table creation in `CREATE TABLE`; can be added later using `ALTER TABLE` |
| **Assertions**        | Constraints that affect more than one table                                                                                                                                               |

---

## Primary Key Constraints

The `PRIMARY KEY` constraint specifies the attribute(s) that form the Primary Key.

### Single Attribute

The constraint can directly follow the attribute specification:

```sql
Dnumber INT PRIMARY KEY
```

### Composite Keys

Composite keys are specified at the end of the `CREATE TABLE` statement:

```sql
PRIMARY KEY (Dnumber, Dlocation)
```

---

## UNIQUE

There is often more than one candidate key in a relation. Secondary keys can be specified using the `UNIQUE` constraint.

### Single Attribute

```sql
Engine_num INT UNIQUE
```

### Composite

```sql
UNIQUE (Licence_Yr, Licence_Mth, Licence_Day)
```

---

## NOT NULL

By default, SQL allows NULLs as attribute values. A `NOT NULL` constraint may be specified if NULLs are not permitted for a specific attribute.

> This is always the case for any attribute that forms part of the Primary Key.

```sql
CREATE TABLE Person (
    PPS       CHAR(8)  NOT NULL PRIMARY KEY,
    Fname     VARCHAR(255) NOT NULL,
    Lname     VARCHAR(255),
    Phone     INT
);
```

---

## More Complex Constraints

More complex constraints can be specified using:

1. **CHECK**
2. **ASSERTION**
3. **TRIGGER**

---

## CHECK

More complex constraints can be specified using the `CHECK` clause — used to restrict the values that can be entered for an attribute.

- Each `CHECK` is specified on one or more attributes from a **single table**
- The `CHECK` is performed for every tuple that is inserted or modified

### CHECK Clauses

CHECK clauses are specified within the `CREATE TABLE` statement.

#### On an individual attribute:

```sql
Dnumber INT NOT NULL CHECK (Dnumber > 0 AND Dnumber < 21)
```

#### On multiple attributes from the same table:

```sql
CHECK (Dept_create_date <= Mgr_start_date)
```

---

## Referential Integrity in SQL

Referential Integrity is specified using the `FOREIGN KEY` clause.

### Single Foreign Key

Specified at the end of the `CREATE TABLE` statement:

```sql
FOREIGN KEY (Dno)
REFERENCES DEPARTMENT(Dnumber)
```

### Composite Foreign Keys

```sql
FOREIGN KEY (artist, album)
REFERENCES ALBUM(artist, name)
```

### Referential Integrity Violation

As discussed earlier, Referential Integrity can be violated on update, insert, or delete.

- **Default action in SQL** is to **reject** the operation
- It is possible to specify an alternate action by attaching a clause to each FK:
  - `SET NULL`
  - `CASCADE`
  - `SET DEFAULT`

---

## Naming Constraints

Constraints can be given explicit names for clarity and manageability.

---

## Assertions

Constraints that affect **more than one table** are called Assertions.

---

## SQL Triggers

A trigger in SQL is a set of actions that automatically **runs (fires)** when a specific event happens in a database.

> **Think of it like:** _"If something happens in a table, automatically do this."_

### Why Use Triggers?

| Purpose                                     | Description                         |
| ------------------------------------------- | ----------------------------------- |
| **Enforce business rules**                  | Apply domain-specific logic         |
| **Maintain data consistency**               | Ensure invariants across operations |
| **Automatically log changes** (audit trail) | Track modifications over time       |
| **Prevent invalid operations**              | Go beyond what CHECK can express    |

---

### Example 1: Prevent Negative Salary

**What happens:**

- **Before** inserting a new employee
- If `salary < 0` → ❌ reject the insert

---

### Example 2: Audit Log (AFTER UPDATE)

**What happens:**

- **After** salary is updated
- A record is automatically added to `Salary_Log`

---

## Practice Questions

Determine whether the following commands will be successful. If not, identify what constraint they violate and why.

### Insert Operations

| #   | Command                                                                                                                                       |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| A   | `INSERT INTO Project VALUES ('Awesome Project', NULL, 'London', 5)`                                                                           |
| B   | `INSERT INTO Works_on VALUES ('999887777', 20, NULL)`                                                                                         |
| C   | `INSERT INTO Dependent VALUES ('123456789', 'Elizabeth', 'F', '1991-05-15', 'Daughter')`                                                      |
| D   | `INSERT INTO Employee VALUES ('Cecilia', 'F', 'Kolonsky', '677678989', '1960-04-05', '6357 Windswept, Katy, TX', 'F', 28000, '987654321', 8)` |

### Delete Operations

| #   | Command                                          |
| --- | ------------------------------------------------ |
| E   | `DELETE FROM Dependent WHERE ESSN = '123456789'` |
| F   | `DELETE FROM Department WHERE Dno = 1`           |
| G   | `DELETE FROM Employee WHERE SSN = '123456789'`   |

### Update Operations

| #   | Command                                                                                  |
| --- | ---------------------------------------------------------------------------------------- |
| H   | `UPDATE Department SET Mgr_ssn = NULL WHERE Dno = 5`                                     |
| I   | `UPDATE Dependent SET Dob = '1983-09-25' WHERE ESSN = '333445555' AND Name = 'Theodore'` |
| J   | `UPDATE Works_on SET Pno = 25 WHERE ESSN = '123456789'`                                  |
