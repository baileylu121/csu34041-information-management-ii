# CSU 34041 — Information Management II

## Relational Algebra & the Relational Model

**Lecturer:** Yvette Graham  
**Email:** Yvette.Graham@tcd.ie

---

## Today's Class

- Relational Algebra
  - **Unary Operations**
    - Selection (rows)
    - Projection (columns)
    - Combining Selection and Projection
  - **Binary Operations**
    - Intersection, Union, Difference
    - Joins

---

## What is Relational Algebra?

Relational Algebra is the **basic set of operations for the Relational Model**.

It is important because it:

- Provides a **formal foundation** for relational model operations
- Is used as a **basis for implementing and optimising queries**
- Is **incorporated in the SQL language** for RDBMS

---

## What is an Algebra?

A mathematical system consisting of:

- **Operators** — symbols denoting procedures that construct new values from given values
- **Operands** — variables or values from which new values can be constructed

---

## What is Relational Algebra?

An algebra whose operands are:

- **Relations**, or
- **Variables that represent relations**

The result is an algebra that can be used as a **query language for relations**.

Operators are designed to:

- Do the most common things we need to do with relations in a database

---

## Relational Algebra Operations

Relational Algebra can be seen as a collection of operations on relations, which fall into **two groups**:

### Set Operations

Standard mathematical operations on sets:

- **Union**, **Intersection**, **Set Difference**
- Applicable as each relation is defined to be a set of tuples in the relational model

### Relational Database Operations

| Category   | Operations      | Description                                                        |
| ---------- | --------------- | ------------------------------------------------------------------ |
| **Unary**  | SELECT, PROJECT | Operate on a single relation                                       |
| **Binary** | JOIN            | Combine related tuples across two relations using a join condition |

---

## Selection in Relational Algebra

### The SELECT Operation

The **SELECT** operation is used to identify the subset of tuples from a relation that satisfy a selection condition.

- Acts as a **filter** on a relation
- **Horizontal partition** of a relation

#### Formal Notation (σ)

```
σ<sub>select condition</sub>(R)
```

#### Example

To identify all employees in department 4:

```
σ<sub>(Dno=4)</sub>(EMPLOYEE)
```

### Result of Selection

- The result is a **new relation** made up of those tuples that satisfied the selection condition
- This new relation has the **same attributes** as the relation R upon which the selection was performed

### Selection Conditions

A Boolean expression made up of a number of clauses:

```
<attribute name> <comparison op> <constant value>
```

| Component          | Description                                |
| ------------------ | ------------------------------------------ |
| **Attribute name** | Name of an attribute of R                  |
| **Comparison op**  | `=`, `<`, `≤`, `>`, `≥`, `≠`               |
| **Constant value** | A constant value from the attribute domain |

#### Examples

**Constant value comparison:**

```
σ<sub>(Dno=4)</sub>(EMPLOYEE)
```

**Attribute-to-attribute comparison:**

```
σ<sub>(Salary > lower_tax_band)</sub>(EMPLOYEE)
```

### Boolean Operators

Selection conditions can be joined by Boolean operators:

| Operator | Meaning                                                                |
| -------- | ---------------------------------------------------------------------- |
| **AND**  | `(cond1 AND cond2)` is TRUE if both are TRUE; otherwise FALSE          |
| **OR**   | `(cond1 OR cond2)` is TRUE if either or both are TRUE; otherwise FALSE |
| **NOT**  | `(NOT cond)` is TRUE if cond is FALSE; otherwise FALSE                 |

#### Complex Example

> Select all employees who either work in department 4 and make over €25,000 a year **or** work in department 5 and make over €30,000 a year.

```
σ<sub>((Dno=4 AND Salary>25000) OR (Dno=5 AND Salary>30000))</sub>(EMPLOYEE)
```

### Domain Restrictions

| Domain Type                                                | Valid Operators              |
| ---------------------------------------------------------- | ---------------------------- |
| **Ordered** (Numeric, Currency, Dates)                     | `=`, `<`, `≤`, `>`, `≥`, `≠` |
| **Unordered** (e.g. Color = {Red, Blue, Green, Yellow, …}) | `=`, `≠` only                |

> Some domains allow string operators like substring as a selection condition.

### Properties of Selection

**Degree:** The degree of the SELECT operator is the **same** as the degree of the relation R.

**Tuples:** The number of tuples returned is always **less than or equal to** the number of tuples in R.

**Selectivity:** The fraction of tuples in a relation selected by a condition is known as the _selectivity_ of that condition.

> For `σ<sub>(Dno=4)</sub>(EMPLOYEE)`, if 3 out of 8 tuples match: selectivity = 3/8 = **37.5%**

**Commutativity:** A sequence of select statements can be applied in any order:

```
σ<sub>(condition 1)</sub>(σ<sub>(condition 2)</sub>(R))  =  σ<sub>(condition 2)</sub>(σ<sub>(condition 1)</sub>(R))
```

**Cascading:** A sequence of select operations can be combined into a single operation:

```
σ<sub>(condition 1) AND (condition 2) AND … AND (condition n)</sub>(R)
```

### Selection in SQL

Algebraic notation:

```
σ<sub>(Dno=4 AND Salary>25000)</sub>(EMPLOYEE)
```

SQL equivalent:

```sql
SELECT * FROM EMPLOYEE
WHERE Dno = 4
  AND Salary > 25000;
```

---

## Projection in Relational Algebra

### The PROJECT Operation

The **PROJECT** operation selects specific attributes from a table, while discarding the others.

- **Vertical partition** of a relation

#### Formal Notation (π)

```
π<sub>attribute list</sub>(R)
```

#### Example

To list all employees' first names, last names, and salaries:

```
π<sub>(Fname, Lname, Salary)</sub>(EMPLOYEE)
```

### Result of Projection

- The resulting relation has **only the attributes** specified in the attribute list
- The degree of the resulting relation equals the **number of attributes** in the list

> For `π<sub>(Fname, Lname, Salary)</sub>(EMPLOYEE)`, the degree is **3**.

### Duplicate Elimination

When projecting non-key attributes (e.g. forename and surname), **duplicate tuples** are likely to occur.

Since the result of a Project operation must be a valid relation containing only **distinct tuples**, the operation automatically removes duplicates.

> This is a key difference from SQL: SQL does **not** automatically eliminate duplicates in the `SELECT` clause. To replicate relational algebra's duplicate elimination, use the `DISTINCT` keyword:
>
> ```sql
> SELECT DISTINCT Fname, Lname, Salary FROM EMPLOYEE;
> ```

### Projection in SQL

Algebraic notation:

```
π<sub>(Fname, Lname, Salary)</sub>(EMPLOYEE)
```

SQL equivalent:

```sql
SELECT DISTINCT Fname, Lname, Salary
FROM EMPLOYEE;
```

---

## Combining Selection and Projection

Complex queries often need to use **combinations** of Select and Project operations. This can be achieved in two ways:

1. **Nesting** of operations in a single relational algebra expression
2. **Intermediate result relations** — one operation at a time

### Example

> Retrieve the last name, first name and salary of all employees who work in department 4 with a salary greater than 25,000, or work in department 5 with a salary greater than 30,000.

**Selection first:**

```
σ<sub>((Dno=4 AND Salary>25000) OR (Dno=5 AND Salary>30000))</sub>(EMPLOYEE)
```

**Projection:**

```
π<sub>(Lname, Fname, Salary)</sub>(EMPLOYEE)
```

### Option 1: Nesting

A single relational algebra expression with nesting:

```
π<sub>(Fname, Lname, Salary)</sub>(
    σ<sub>(Dno=4 AND Salary>25000)</sub>(EMPLOYEE)
)
```

### Option 2: Intermediate Relations

Operations applied one at a time using intermediate relations:

```
EMPS ← σ<sub>(Dno=4 AND Salary>25000)</sub>(EMPLOYEE)

π<sub>(Fname, Lname, Salary)</sub>(EMPS)
```

### Combined in SQL

```sql
SELECT DISTINCT Fname, Lname, Salary
FROM EMPLOYEE
WHERE Dno = 4
  AND Salary > 25000;
```

---

## Examples

### Example 4.1

**A)** Find all employees who earn more than 15,000

```
σ<sub>(Salary > 15000)</sub>(EMPLOYEE)
```

**B)** Get a list of names and addresses of all employees

```
π<sub>(Fname, Lname, Address)</sub>(EMPLOYEE)
```

**C)** Find all employees who are born before 1960 and earn more than €45,000

```
σ<sub>(Salary > 45000 AND Bdate < 1960-01-01)</sub>(EMPLOYEE)
```

**D)** Find the name, social security number and date of birth of all employees who work in department number 4

```
π<sub>(Fname, Lname, Ssn, Bdate)</sub>(σ<sub>(Dno=4)</sub>(EMPLOYEE))
```

Or using an intermediate relation:

```
EMPS ← σ<sub>(Dno=4)</sub>(EMPLOYEE)
π<sub>(Fname, Lname, Ssn, Bdate)</sub>(EMPS)
```

**E)** Find the name of all dependents who were born after 1980

```
π<sub>(Fname, Lname)</sub>(σ<sub>(Bdate > 1980-12-31)</sub>(DEPENDENTS))
```

---

## Set Operations

### Set Operators

Standard mathematical operations used to merge the elements of two sets:

- **Union**
- **Intersection**
- **Set Difference**

These are **binary operations** — each is applied to two sets.

### Union Compatibility

To use set operations, two relations must be **union compatible**:

1. They must have the **same number of attributes** (same degree)
2. Each corresponding pair of attributes must have the **same domain**

Two relations R(A₁, A₂, …, Aₙ) and S(B₁, B₂, …, Bₙ) are union compatible if:

- They have the same degree _n_
- dom(Aᵢ) = dom(Bᵢ) for 1 ≤ i ≤ n

> The _domain_ is the permitted range of values for an attribute of an entity.

---

### Union (∪)

**Notation:** `R ∪ S`

The result is a new relation containing all tuples that are either in R **or** S **or in both**.

- Duplicate tuples are discarded
- **Commutative:** `R ∪ S = S ∪ R`
- **Associative:** `R ∪ (S ∪ T) = (R ∪ S) ∪ T`

---

### Intersection (∩)

**Notation:** `R ∩ S`

The result is a new relation containing all tuples that are in **both** R **and** S.

- **Commutative:** `R ∩ S = S ∩ R`
- **Associative:** `R ∩ (S ∩ T) = (R ∩ S) ∩ T`

---

### Set Difference (−)

**Notation:** `R − S`

The result is a new relation that includes all tuples that are in R **but not in** S.

- **Not commutative:** `R − S ≠ S − R`

---

### Set Operations in SQL

| Relational Algebra | SQL Keyword |
| ------------------ | ----------- |
| Union              | `UNION`     |
| Intersection       | `INTERSECT` |
| Set Difference     | `EXCEPT`    |

SQL also provides **multi-set operators** (which do not eliminate duplicates):

| Multi-set Operator |
| ------------------ |
| `UNION ALL`        |
| `INTERSECT ALL`    |
| `EXCEPT ALL`       |

---

## Join

### The Join Operation

**Notation:** `R ⋈<sub>(join condition)</sub> S`

Used to combine related tuples from two relations into a single tuple.

- Important for processing **relationships between relations**
- Makes use of **Foreign Keys** and **Referential Integrity constraints**

### Join Result

For relations R(A₁, A₂, …, Aₙ) and S(B₁, B₂, …, Bₘ):

- The result Q has **n + m attributes**: Q(A₁, A₂, …, Aₙ, B₁, B₂, …, Bₘ)
- A tuple for each combination of tuples (one from R, one from S) that **satisfy the join condition**

### Join Condition

- Specified on attributes from **both** relations
- Evaluated for **every combination** of tuples from the two relations
- Each tuple combination for which the condition is **TRUE** is included in the result as a single, combined tuple

### Example

> Return the name of the manager of each department.

```
π<sub>(Dname, Fname, Lname)</sub>(
    DEPARTMENT ⋈<sub>(Mgr_ssn = Ssn)</sub> EMPLOYEE
)
```

### Join in SQL

Given two tables:

**EMPLOYEE**

| EMPNO | NAME     | JOB        | DEPTNO |
| ----- | -------- | ---------- | ------ |
| 7856  | MCNULTY  | OFFICER    | 30     |
| 7710  | DANIELS  | LIEUTENANT | 40     |
| 7992  | GREGGS   | DETECTIVE  | 10     |
| 7428  | MORELAND | DETECTIVE  | 20     |

**DEPARTMENT**

| DEPTNO | NAME      | LOCATION    |
| ------ | --------- | ----------- |
| 10     | NARCOTICS | TOWER 221   |
| 20     | HOMICIDE  | CITY CENTER |
| 30     | MARINE    | DOCKS       |
| 40     | EVIDENCE  | DOWNTOWN    |

```sql
SELECT employee.name, job, department.name
FROM employee, department
WHERE employee.deptno = department.deptno;
```

**Result:**

| NAME     | JOB        | NAME      |
| -------- | ---------- | --------- |
| MCNULTY  | OFFICER    | MARINE    |
| DANIELS  | LIEUTENANT | EVIDENCE  |
| GREGGS   | DETECTIVE  | NARCOTICS |
| MORELAND | DETECTIVE  | HOMICIDE  |

---

## Join Examples

### Example 4.2

**A)** Join the DEPARTMENT and PROJECT tables

```
DEPARTMENT ⋈<sub>(Dnumber = Dnum)</sub> PROJECT
```

**B)** Get a list of project names and locations and the name of the department they belong to

```
π<sub>(Pname, Plocation, Dname)</sub>(
    DEPARTMENT ⋈<sub>(Dnumber = Dnum)</sub> PROJECT
)
```

**C)** Find the name and location of all departments

```
π<sub>(Dname, Dlocation)</sub>(
    DEPARTMENT ⋈<sub>(Dnumber = Dnum)</sub> PROJECT
)
```

**D)** Get a list of names, social security numbers and dependent names for all employees who have dependents

```
π<sub>(Fname, Lname, Dependent_name)</sub>(
    EMPLOYEE ⋈<sub>(Ssn = Essn)</sub> DEPENDENT
)
```

**E)** Get a list of the names and department names of all employees who were born in or after 1970

```
π<sub>(Fname, Lname, Dname)</sub>(
    σ<sub>(Bdate ≥ 1970-01-01)</sub>(
        EMPLOYEE ⋈<sub>(Dno = Dnumber)</sub> DEPARTMENT
    )
)
```
