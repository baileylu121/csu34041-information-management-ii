# Design Optimisation

---

## Lecture Outline

**Part 1**

- Database Design
- Design Guidelines — Central Guidelines (1–4)
- Design Optimisation
- Functional Dependency Definition
- Quiz

**Part 2**

- Normalisation: 1NF, 2NF, 3NF
- Superkeys
- Boyce-Codd Normal Form (BCNF)
- Quiz

---

## Database Design

In previous lectures we have discussed various aspects of database design:

- The Relational Model
- The Entity Relationship Model
- Entity Relationship Diagrams
- Mapping to a Logical Database Design
- Relational Database Schema

We previously looked at **Functional Dependency** as a modelling technique. We now revisit it as a way of **assessing the quality of a relation design**.

---

## Why Formal Analysis?

- Need a **formal method** for analysing how relations and attributes are grouped
- A measure of **appropriateness or quality**, other than the intuition of the designer
- To **assess the quality of the design**

### Measures

1. Design guidelines
2. Functional Dependencies
3. Normalisation

---

## Design Guidelines

A set of **informal guidelines** that can be used as measures to determine the quality of a relation schema design.

| Measure | Description                   |
| ------- | ----------------------------- |
| **1**   | Attribute Semantics           |
| **2**   | Reduction of Redundancy       |
| **3**   | Reduction of NULLs            |
| **4**   | Generation of Spurious Tuples |

> These measures are not always independent of one another.

---

## Guideline 1 — Attribute Semantics

Attributes belonging to a relation have certain **real-world meaning**. The semantics of a relation refers to its meaning resulting from the interpretation of attribute values in a tuple.

Careful ER modelling and accurate mapping to logical design help ensure that a relational schema design has clear meaning.

### Guideline 1

> Design a relation schema so that it is **easy to explain its meaning**.
>
> - Give relations and attributes meaningful names.
> - **Do not** combine attributes from multiple entity types and relationship types into a single relation.
> - The result should be straightforward to interpret and easy to explain.

### Violating Guideline 1

These relations violate Guideline 1 by **unnecessarily mixing attributes from distinct real-world entities**:

- **Employee** and **Department**
- **Project** and **Employee**

---

## Guideline 2 — Reduction of Redundancy

One goal of database schema design is to **minimise storage space** used. Grouping attributes into relational schema has a significant effect on storage space by reducing the storage of redundant information (e.g. information unnecessarily duplicated).

Storing merged entities in single relations leads to **update anomalies**, classified into:

- **Insertion** anomalies
- **Deletion** anomalies
- **Modification** anomalies

### Guideline 2

> Design the relation schemas so that **no insertion, deletion or modification anomalies** are present.
>
> - If anomalies are present, note them clearly and ensure all application programs operate correctly.
>
> This second guideline is consistent with Guideline 1.

### Insert Anomalies

To insert a new employee into `EMP_DEPT` it is necessary to include either:

- All attribute values for the department the employee works for, **or**
- `NULL`s, if the employee is not yet assigned

Consistency becomes an issue. Inserting a new department is difficult.

### Deletion Anomalies

Deletion of Employees and Departments is **inextricably linked**:

> If we delete the last employee currently assigned to a particular department, the information related to that department is **lost from the database**.

This problem does not occur if using separate relations.

### Modification Anomalies

Modification makes consistency an issue. If the manager of a department is changed:

- It is necessary to update the tuples of **every employee** who works for that department
- Records can easily get **out of sync**

This problem does not occur if using separate relations.

---

## Guideline 3 — Reduction of NULLs

> Avoid placing attributes in a relation schema whose values may **frequently be NULL**.

- If `NULL`s are unavoidable, ensure they apply in **exceptional cases** and not the majority of tuples.
- Using space efficiently and avoiding `NULL` values are the main criteria for deciding upon attribute inclusion or exclusion.
- If excluded, **create a separate relation** for that attribute.

### Why Avoid NULLs?

If many attributes do not apply to all tuples of a relation, you end up with many `NULL` values:

- **Wastes** storage space
- Can make understanding attribute meanings **more difficult**
- Leads to **difficulty with Joins**
- **Difficulty with aggregate functions**
  - `COUNT` and `SUM`

### What Does NULL Mean?

A `NULL` value may typically have **two interpretations**:

| Interpretation               | Example                                                         |
| ---------------------------- | --------------------------------------------------------------- |
| **Missing but inapplicable** | Zip Code for Irish addresses (although we do now have EirCode!) |
| **Missing but applicable**   | An employee's date of birth is empty                            |
| **Unknown**                  | —                                                               |
| **Known but absent**         | —                                                               |

### Violating Guideline 3

If only **15% of employees** have an office, then including an `Office_Number` attribute in the `EMPLOYEE` relation would violate Guideline 3.

Instead, create an **`EMPLOYEE_OFFICE`** relation:

| Ssn | Office_Number |
| --- | ------------- |
| —   | —             |

A tuple is entered in the relation for all employees with an office.

---

## Guideline 4 — Generation of Spurious Tuples

- Joins across relations should only be performed on **Primary Key – Foreign Key** pairs of attributes.
- If joins are performed on attributes which are **not** a Primary Key – Foreign Key pairing, **spurious tuples** are generated.
- These tuples represent information which is **not valid**.

### Guideline 4

> Design relation schemas so that they can be joined using **equality conditions on primary key / foreign key pairs**.
>
> - This guarantees that **no spurious tuples** are generated by the join.
> - Avoid relations that contain matching attributes that are **not** foreign key / primary key combinations.

---

## Design Guidelines Summary

| Guideline | Principle                                                         |
| --------- | ----------------------------------------------------------------- |
| **1**     | Ensure attribute semantics are easily understood                  |
| **2**     | Reduce redundant information in tuples                            |
| **3**     | Reduce the number of `NULL` values in tuples                      |
| **4**     | Ensure spurious tuples are not generated — enforce PK/FK matching |

---

## Design Optimisation

---

## Functional Dependencies for Optimisation

Functional Dependency Analysis is a **formal tool** for analysing relational schemas:

- Enables the designer to **detect and describe** problems in more precise terms
- One of the **most important concepts** in relational schema design theory
- Main tool for **measuring the appropriateness** of groupings of attributes into relations

---

## Functional Dependency — Definition

A **functional dependency** is a constraint between two sets of attributes.

Suppose our relational database schema has _n_ attributes: A₁, A₂, …, Aₙ. Think of the whole database as being described by a single **universal relation**: R = {A₁, A₂, …, Aₙ}.

A functional dependency, denoted by **X → Y**:

- Specifies a constraint on the possible tuples that can form a relation state _r_ of R
- Between two sets of attributes X and Y (subsets of R)
- The constraint: for any two tuples _t₁_ and _t₂_ in _r_(R) that have **t₁[X] = t₂[X]**, they must also have **t₁[Y] = t₂[Y]**

In other words: the values of attribute set X from a tuple in _r_ **uniquely determine** (or **functionally determine**) the values of attribute set Y.

- There is a functional dependency **from X to Y**, or
- **Y is functionally dependent on X**

> The abbreviation for functional dependency is **FD** or **f.d.**
>
> - The set of attributes X is called the **left-hand side** of the FD.
> - Y is called the **right-hand side**.

---

## Things to Note

- If X is a **candidate key** of R, then **X → Y** for any subset of attributes Y of R. Thus **X → R**.

  > In other words: if X has to be unique for every instance of R, then X uniquely determines all the other attribute values of R.

- If **X → Y** in R, this does **not** necessarily imply that **Y → X** in R.
  > Functional dependency is **not commutative**.

---

## Identification of FDs

A functional dependency is a **property of the semantics or meaning** of the attributes.

> A database designer will use their understanding of the semantics of the attributes of R to specify the functional dependencies that must hold on all instances of R.

ER modelling supports the development of this understanding.

### Example

Using the semantics of the attributes and relation, the following FDs should hold:

```
Ssn       → Ename
Pnumber   → {Pname, Plocation}
{Ssn, Pnumber} → Hours
```

---

## Disproving a FD

> You **cannot** use a single set of data _r_(R) to **prove** a FD, but you **can** use it to **disprove** a FD.

**Can we prove** `Text → Course`?

**Can we disprove** `Teacher → Course`?

No single teacher teaches only one course — a single counter-example disproves it.

---

## Constraints

Whenever the semantics of two sets of attributes of R indicate that a FD should hold, the dependency is specified as a **constraint**.

> FDs are used to further enhance a relation schema R by specifying constraints that **must hold at all times**.

---

## Diagrammatic Notation

---

## Normalisation

---

## What is Normalisation?

The normalisation process takes a relational schema through a series of tests to certify whether it satisfies a certain **normal form**.

### Normal Forms

| Normal Form            | Abbreviation |
| ---------------------- | ------------ |
| First Normal Form      | **1NF**      |
| Second Normal Form     | **2NF**      |
| Third Normal Form      | **3NF**      |
| Boyce-Codd Normal Form | **BCNF**     |

Normalisation can be considered **relational design by analysis**:

1. ER Modelling
2. Mapping to Relational Schema
3. Functional Dependencies
4. **Normalisation**

---

## Normalisation — Process

Normalisation is the process of **analysing relation schemas** based on their primary keys and functional dependencies to:

- **Minimise redundancy**
- **Minimise** insertion, deletion and modification anomalies

Relations which do **not** pass the normal form tests are **decomposed** into smaller relation schemas.

### Required Properties

Normalisation through decomposition must confirm **two properties** in the resulting database design:

1. **Non-Additive (Lossless) Join Property**

   > This guarantees that spurious tuple generation does **not** occur.

2. **Dependency Preservation Property**
   > This ensures that each functional dependency is represented in an individual relation.

### Benefits

Normalisation provides database designers with:

- A **formal framework** for analysing relations based on their primary keys and functional dependencies
- A **set of normal form tests** that can be carried out on individual relation schemas so that the relational database can be normalised to the desired degree

---

## First Normal Form (1NF)

> In 1NF, **all attribute values must be atomic**.
>
> The word _atom_ comes from the Latin _atomis_, meaning indivisible (or literally "not to cut").

1NF dictates that **at every row–column intersection**, there exists only **one value**, not a list of values.

### Benefits

If lists of values are stored in a single column, there is **no simple way** to manipulate those values.

### Achieving 1NF

1NF also disallows **multi-valued attributes** that are themselves **composite**.

To achieve 1NF:

1. **Remove** the attribute(s) that violate 1NF and put them into a **separate, new relation**
2. **Add** the primary key of the original relation to the new relation (this serves as a **foreign key**)
3. The primary key of the new relation is a **composite primary key**

> This decomposes a non-1NF relation into **two 1NF relations**.

Follow the same steps for multiple multi-valued attributes.

### 1NF Example

A database stores information about people:

- People can own **more than one car**
- People can have **more than one phone number**

```
Person
├── PPS_num
├── Name
├── Car_Reg_No
├── Car_Model
├── Car_CC
└── Phone_Num
```

**Is this table in 1NF?** No — `Car_Reg_No`, `Car_Model`, `Car_CC` (multi-valued attribute: cars) and `Phone_Num` (multi-valued attribute: phone numbers) violate atomicity.

**Normalization:**

```
Person          Person_Car          Person_Phone
├── PPS_num     ├── PPS_num         ├── PPS_num
├── Name        ├── Car_Reg_No      ├── Phone_Num
                ├── Car_Model
                └── Car_CC
```

---

## Second Normal Form (2NF)

### Full Functional Dependency

A FD **X → Y** is said to be **fully functional dependent** if the removal of any single attribute from the set of attributes X means that the dependency **no longer holds**.

> Think of X as a composite primary key. All other attributes must be dependent upon the **full key**, not just part of it.

For any attribute A ∈ X: **(X − {A}) does not functionally determine Y**.

### Partial Functional Dependency

A FD **X → Y** is said to be a **partial functional dependency** if a single attribute can be removed from the set of attributes X yet the dependency **still holds**.

For any attribute A ∈ X: **(X − {A}) → Y**.

### Second Normal Form (2NF)

A table is in **Second Normal Form (2NF)** if:

- It is **1NF compliant**, **and**
- Every non-key column is **fully functionally dependent** on the **entire primary key**.

> In other words:
>
> - Tables should only store data relating to **one "thing"** (or entity)
> - That entity should be described by its **primary key**

---

## 2NF Example

Consider a single table `EMP_PROJ` with primary key **Ssn & Pnumber** and attributes **Hours, Ename, Pname, Plocation**.

```
EMP_PROJ
├── Ssn
├── Pnumber
├── Hours
├── Ename
├── Pname
└── Plocation
```

**Composite Primary Key:** {Ssn, Pnumber}

| Functional Dependency               | Type           |
| ----------------------------------- | -------------- |
| {Ssn, Pnumber} → Hours              | **Full FD**    |
| {Ssn, Pnumber} → Ename              | **Partial FD** |
| {Ssn, Pnumber} → {Pname, Plocation} | **Partial FD** |

**Note 1:** `Ename` only **partially** depends on the composite primary key — it does not functionally depend on the `Pnumber` part.

**Note 2:** `Pname` and `Plocation` only **partially** functionally depend on the composite primary key — they depend only on the `Pnumber` part (not at all on the `Ssn` part).

### Achieving 2NF

1. **Limit** the functional dependencies of attributes to only the parts of the primary key they are dependent upon
2. **Decompose** the relation into separate relations using these FDs
3. The primary key of the new relation is the **left-hand side** of the FD

> This decomposes a non-2NF relation into a set of new relations which are in 2NF.

### 2NF Example (cont.)

Taking `EMP_PROJ` again:

1. **Limit** the functional dependencies to only the parts of the primary key they depend upon
2. **Decompose** the relation into separate relations using these functional dependencies
3. The primary key of the new relations is the **left-hand side** of the functional dependencies

**Normalized to:**

```
EMP_WORKS         PROJECT
├── Ssn           ├── Pnumber
├── Pnumber       ├── Pname
├── Hours         └── Plocation
└── (PK: Ssn, Pnumber)
```

---

## Third Normal Form (3NF)

A table is in **Third Normal Form (3NF)** if:

- It is **2NF compliant**, **and**
- **No non-key attributes** are **transitively dependent** upon the primary key.

### Transitive Dependency

A functional dependency **X → Y** in relation R is said to be **transitive dependent** if:

- There exists a set of attributes **Z** in R which is **neither a candidate key nor a subset of any key** of R
- And both **X → Z** and **Z → Y** hold true

### Example

> **Ssn → Dmgr_ssn** is a transitive dependency through **Dnumber**:
>
> - **Ssn → Dnumber** and **Dnumber → Dmgr_ssn** hold
> - **Dnumber** is not a key itself or a subset of any key of `EMP_DEPT`

### Achieving 3NF

1. **Identify** any transitive dependencies in the relation
2. **Decompose** the relation into two separate relations using these transitive dependencies
3. The primary key of the new relation is the **middle attribute** of the transitive dependency

> This decomposes a non-3NF relation into two new 3NF relations.

### 3NF Example

To normalise to 3NF:

1. **Identify** any transitive dependencies in the relation
2. **Decompose** the relation into two separate relations using these transitive dependencies
3. The primary key of the new relation is the **middle attribute** of the transitive dependency

### Summary: 2NF and 3NF

Any functional dependency in which the left-hand side is:

- A **non-key attribute**, or
- A **component attribute** of a composite primary key

…is a **problematic FD**.

> 2NF and 3NF remove these problematic functional dependencies by decomposing them into new relations.

---

## Superkeys

---

## Superkey

A **superkey** SK is any set of attributes in the relation R, whose combined values will be **unique for every tuple**:

> t₁[SK] ≠ t₂[SK]

Every relation has one **default superkey** — the set of all its attributes (as, by definition, every instance of a relation must be unique).

### Car Example

| Attribute  |     |
| ---------- | --- |
| Engine_No  |     |
| Reg_Year   |     |
| Reg_County |     |
| Reg_Num    |     |
| Model      |     |
| CC         |     |

**Candidate Keys:**

- `Engine_No`
- `{Reg_Year, Reg_County, Reg_Num}`

**Primary Key:** `Engine_No`

**Superkeys:**

- `{Engine_No, Reg_Year, Reg_County, Reg_Num}`
- `{Engine_No, Reg_Year, Reg_County, Reg_Num, Model}`
- `{Reg_Year, Reg_County, Reg_Num}`
- `{Reg_Year, Reg_County, Reg_Num, Model}`

> A superkey is any superset of a candidate key.

---

## Boyce-Codd Normal Form (BCNF)

---

## BCNF

BCNF was created to be a **simpler form of 3NF** — sometimes called **3.5NF**.

However, it was found to be **stricter than 3NF**:

- Every relation in **BCNF** is also in **3NF**
- Every relation in **3NF** is **not necessarily** in **BCNF**

### Definition

A table is in **Boyce-Codd Normal Form (BCNF)** if:

> Whenever a functional dependency **X → Y** holds in the relation R, **X is a superkey** of R.

---

## BCNF Example

Consider a relation schema describing **parcels of land** available for sale in different counties:

```
LOTS
├── Property_id#
├── County
├── Lot#
├── Area
└── ...
```

**Two candidate keys:**

- `Property_id#`
- `{County_name, Lot#}`

### Sample Data

| Property_id# | County | Lot# | Area   |
| ------------ | ------ | ---- | ------ |
| 65           | Dublin | 701  | Fingal |
| 66           | Cork   | 702  | Bantry |

### The BCNF Violation

Suppose there are thousands of lots in the `LOTS` relation, but:

- The lots are from only two counties: **Wicklow** and **Monaghan**
- Valid lot sizes in Wicklow are only **0.5, 0.6, 0.7, 0.8, 0.9, and 1.0** acres
- Valid lot sizes in Monaghan are **1.1, 1.2, …, 1.9, and 2.0** acres

In such a situation there would be an additional functional dependency:

> **Area → County_name**

This **breaks BCNF** — `Area` is **not a superkey**.

### Achieving BCNF

1. **Identify** all functional dependencies in the relations
   > Identify any FDs where the left-hand side is **not** a superkey
2. **Decompose** the relation into separate relations, creating a new relation for the offending FD
3. The primary key of the new relation is the **left-hand attribute** of the offending functional dependency

> This decomposes a non-BCNF relation into two new BCNF relations.

---

## Normalisation Summary

Normalisation **tests** a relation schema to certify whether it satisfies a normal form:

| Normal Form            | Abbreviation |
| ---------------------- | ------------ |
| First Normal Form      | **1NF**      |
| Second Normal Form     | **2NF**      |
| Third Normal Form      | **3NF**      |
| Boyce-Codd Normal Form | **BCNF**     |

### Process

1. Evaluate each relation against the criteria for **each normal form in turn**
2. **Decompose** relations where necessary

### Boyce-Codd Rule

> **"Every determinant must be a candidate identifier."**

In other words:

> **"All attributes in a relation should be dependent on the key, the whole key, and nothing but the key."**

---

## Steps for Modelling (Prior to Creating a Database)

### I. Identify and Model the Information as an ER Model

- Represent the required **entities and attributes**
- Represent the **relationships** between those entities and any attributes of those relationships
- Define the **cardinality** of the relationships
- Define the **participation constraints** of the relationships (total or partial)

### II. Map from the ER model to a relational schema

### III. Identify the functional dependencies in the relation schema

### IV. Normalise the relation schema to **BCNF**

---

## Denormalization

In practice, there are times when **fully normalized tables** can slow down **performance** too much. This leads to the decision to **denormalize** the tables.

### The Correct Design Process

1. **Design** the database to create fully normalized tables (**correctness**)
2. **Denormalize** tables **only where needed** to speed up **performance**

> Denormalization needs to be done with **extreme caution** as it can introduce **anomalies** that we would like to avoid.

---

## Lecture Recap

**Part 1**

- Database Design
- Design Guidelines — Central Guidelines (1–4)
- Design Optimisation
- Functional Dependency Definition

**Part 2**

- Normalisation: 1NF, 2NF, 3NF
- Superkeys
- Boyce-Codd Normal Form (BCNF)
