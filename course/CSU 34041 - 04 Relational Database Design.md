# CSU 34041 — Information Management II

## Relational Database Modelling and Functional Dependency

---

### Today's Lecture

1. Problems in Relational Models
2. Duplicate vs Redundant Data
3. Normal Form Databases
4. Determinants and Identifiers
5. Determinants and Redundancy
6. Well-normalised Tables
7. Fully-normalised Tables
8. Multivalued Determinacy
9. Advantages of Full Normalisation

---

### Problems in Relational Modelling

**Objectives**

- Illustrate techniques to describe information in terms of table definitions and occurrences
- Guard against anomalies when we insert, delete or lose consistency of data in the tables
- How do we know our tables are correct?

---

### Key Points to Remember About Relational Models

1. Ordering of rows is not significant
2. Ordering of columns is not significant
3. Each row/column intersection contains a single attribute value. Multiple values are not allowed
4. Each row in a table must be distinct.

→ A row can always be uniquely identified by quoting an appropriate combination of attribute values.

A table conforming to these restrictions is called a **normalised table** or **first normal form**.

---

### Example Problem

Suppose a company called **TechScience** wishes to create a database for managing its engineers and the engineering projects on which they work.

Suggest a relational structure (i.e. table(s)) for storing:

- Engineer employee IDs
- Engineer Employee Names
- Project IDs
- Project Names

**Policy:** No engineer can work on more than one project at a time. But a project can have multiple engineers working on it.

---

### Which Is the Correct Table Structure?

**Solution A:**

`AllInformation (EngineerId, EngineerName, ProjectID, ProjectName)`

**Solution B:**

```
Engineer (EngineerId, EngineerName)
Project (ProjectID, ProjectName, EngineerId)
```

**Solution C:**

```
Engineer (EngineerId, EngineerName, ProjectID)
Project (ProjectID, ProjectName)
```

**Solution D:**

```
Engineer (EngineerId, EngineerName)
Project (ProjectID, ProjectName)
EngineerAllocationsToProjects (EngineerId, ProjectID)
```

---

### Solution A: Single Table

**AllInformation** (EngineerId, EngineerName, ProjectID, ProjectName)

| EngineerId | EngineerName | ProjectID | ProjectName   |
| ---------- | ------------ | --------- | ------------- |
| 007        | James Bond   | 888       | Ventilator    |
| 008        | Peter Parker | 888       | Ventilator    |
| 009        | Bruce Wayne  | 999       | Heart Monitor |

**Is there any unnecessary duplication?**

→ **Yes.** ProjectName "Ventilator" is duplicated. If we delete one copy, we can still deduce the value from the other — so it is _unnecessarily duplicated_ (i.e. redundant).

Unnecessary duplication creates problems when updating data — you need to ensure all copies are updated when their value changes.

---

### Solution B: Two Tables

```
Project (ProjectID, ProjectName, EngineerId)
Engineer (EngineerId, EngineerName)
```

| ProjectID | ProjectName   | EngineerId |
| --------- | ------------- | ---------- |
| 888       | Ventilator    | 007        |
| 888       | Ventilator    | 008        |
| 999       | Heart Monitor | 009        |

| EngineerId | EngineerName      |
| ---------- | ----------------- |
| 007        | James Bond        |
| 008        | Sarah-Jane Parker |
| 009        | Bruce Wayne       |

**Is there unnecessary duplication?** → **Yes.** "Ventilator" is still duplicated.

---

### Solution C: Two Tables

```
Engineer (EngineerId, EngineerName, ProjectID)
Project (ProjectID, ProjectName)
```

| EngineerId | EngineerName      | ProjectID |
| ---------- | ----------------- | --------- |
| 007        | James Bond        | 888       |
| 008        | Sarah-Jane Parker | 888       |
| 009        | Bruce Wayne       | 999       |

| ProjectID | ProjectName   |
| --------- | ------------- |
| 888       | Ventilator    |
| 999       | Heart Monitor |

**Is there unnecessary duplication?** → **No.** You cannot delete an attribute value in any of the tables without losing some information from the database. You can't delete a value and then work out what that value was.

---

### Solution D: Three Tables

```
Engineer (EngineerId, EngineerName)
Project (ProjectID, ProjectName)
EngineerAllocationsToProjects (EngineerId, ProjectID)
```

| EngineerId | EngineerName      |
| ---------- | ----------------- |
| 007        | James Bond        |
| 008        | Sarah-Jane Parker |
| 009        | Bruce Wayne       |

| ProjectID | ProjectName   |
| --------- | ------------- |
| 888       | Ventilator    |
| 999       | Heart Monitor |

| EngineerId | ProjectID |
| ---------- | --------- |
| 007        | 888       |
| 008        | 888       |
| 009        | 999       |

**Is there unnecessary duplication?** → **No.**

You can't delete an attribute value in any of the tables without losing some information from the database.

---

### Duplicate vs Redundant Data

> **Duplicated data** — occurs where an attribute (column) has two or more identical values.

> **Redundant data** — occurs if you can delete a value without information being lost.

→ **Redundancy is unnecessary duplication.**

---

### Duplication vs. Redundancy: Example

| Part# | Part Desc. |
| ----- | ---------- |
| P2    | Nut        |
| P2    | nut        |
| P1    | Bolt       |
| P1    | bolt       |
| P3    | Washer     |
| P3    | washer     |
| P4    | Nut        |
| P4    | nut        |

- Parts and their textual descriptions are contained in the table.
- We can see some information is **duplicated** (e.g. "nut" appears multiple times).
- Is there any **redundant** information here?

If we delete a "nut" value, we still have other rows with "nut" — we can still work out what the value was. But we have **not** lost information about _which part_ has that description.

→ **Nut was duplicate but NOT redundant!** (each row is distinguishable by Part#)

---

### Duplication vs. Redundancy: With Supplier

Now introduce **S#** — the supplier ID.

| S#  | Part# | Part Desc. |
| --- | ----- | ---------- |
| S2  | P1    | Bolt       |
| S2  | P1    | bolt       |
| S7  | P6    | Bolt       |
| S2  | P4    | Nut        |
| S5  | P1    | Bolt       |

- Table represents: Part ID and its description **AND** who supplies each part.
- Two suppliers can supply the same part.
- We can see duplicate information (e.g. "Bolt" × 3).
- Is any of the information here redundant?

If we delete "bolt" — we can still deduce it from other rows. **Some duplicated data was redundant.**

---

### Eliminating Redundancy

We cannot just delete values from the table! Preferable to **split the table into 2 tables**:

**Parts table:**

| Part# | Part Desc. |
| ----- | ---------- |
| P1    | Bolt       |
| P4    | Nut        |
| P6    | Bolt       |

**Supplies table:**

| S#  | Part# |
| --- | ----- |
| S2  | P1    |
| S7  | P6    |
| S2  | P4    |
| S5  | P1    |

- Eliminated redundancy by table splitting.
- P1 description only appears once.
- Relationship is made by including Part# in both tables.

So far we've assumed that table structures which permit redundancy can be recognised by inspection of table occurrence. **This is not entirely accurate** — attribute values are subject to insertion, change, and deletion.

---

### Eliminating Redundancy (cont.)

Consider this table **SP**:

| S#  | P#  | Desc |
| --- | --- | ---- |
| S2  | P1  | Bolt |
| S7  | P1  | Bolt |
| S2  | P4  | Nut  |

Inspection of table SP does **not** reveal any redundancy. It could even suggest that _"no two suppliers may supply the same part#"_.

→ **Need to take care not to conclude too much from inspecting data** — think more deeply about possible data.

---

### Repeating Groups

We stated earlier: _"Each attribute must have at most one value in each row."_

Violating this — having multiple values in a single cell — creates **repeating groups**:

| S#  | SName   | P#         |
| --- | ------- | ---------- |
| S5  | Wells   | P1         |
| S2  | Heath   | P1, P4, P6 |
| S9  | Edwards | P8, P2, P6 |

**Problems:**

1. Table is an asymmetric representation of symmetrical data
2. Rows can be sorted into S# but not into P#
3. Rows are different length due to variation in number of P#'s
4. If rows were fixed length, they would need to be padded with null values

**→ Not possible in a relational database.**

---

### Elimination of Repeating Groups (Method 1)

Easiest way to eliminate repeating groups is to write out the table occurrence using a **vertical layout** and fill in the blanks by duplicating the non-repeating data:

| S#  | SName   | P#  |
| --- | ------- | --- |
| S5  | Wells   | P1  |
| S2  | Heath   | P1  |
| S2  | Heath   | P4  |
| S2  | Heath   | P6  |
| S9  | Edwards | P8  |
| S9  | Edwards | P2  |
| S9  | Edwards | P6  |

But this can lead to **'redundancy'** of information! (Does the right-hand table contain redundant information?)

---

### Elimination of Repeating Groups (Method 2)

Split the table into **two tables** so that the repeating group appears in one table and the rest of the attributes in another. Need to provide correspondence by including a key attribute with the repeating group table.

**Suppliers table:**

| S#  | SName   |
| --- | ------- |
| S5  | Wells   |
| S2  | Heath   |
| S9  | Edwards |

**Supplies table:**

| S#  | P#  |
| --- | --- |
| S5  | P1  |
| S2  | P1  |
| S2  | P4  |
| S2  | P6  |
| S9  | P8  |
| S9  | P2  |
| S9  | P6  |

---

### Unfortunate Conclusion

It is **not possible** to tell by looking at relational tables in a database whether:

- There is the potential for redundancy

> **A snapshot of a table is an inadequate guide to the presence or absence of redundant data.**

We need to know the **underlying rules** — the DBA must discover the rules which apply to the conceptual model.

---

### Bad Database Design

| customerID | date_of_birth | surname |
| ---------- | ------------- | ------- |
| 1001       | 25-03-1980    | Jones   |
| 1001       | 26-03-1980    | Jones   |
| 1002       | 13-01-1985    | Smith   |

**Data integrity fail!** — Customer 1001 has two different dates of birth.

> When something in the database can be logically impossible → bad data → bad database design → **not normalised**.

---

### Normalized Tables

A normalized database is structured so that it **cannot contain redundant information**.

→ You can't give customer 2 dates of birth even if you wanted to.

**Benefits of normalized tables:**

- Easier to understand
- Easier to modify
- Protected from anomalies (bad insert, delete, or updates)

---

### Codd's Normal Forms

Codd identified rules which govern the way we create tables to avoid anomalies when inserting or deleting values in these tables. These rules are called **Normal Forms**.

There are three and a half important levels (and two further levels which are occasionally used).

---

### 1st Normal Form (1NF)

A relation is in first normal form if the domain of each attribute contains **only atomic values** and the value of each attribute contains **only a single value** from that domain.

#### How to Violate 1NF

**1. Using the order of rows to represent information**

| Names  |
| ------ |
| Scary  |
| Sporty |
| Posh   |
| Geri   |
| Baby   |

There is no right order — using row order to convey information violates 1NF.

**2. Mixing data types in a single column**

| Names  | height_in_cm        |
| ------ | ------------------- |
| Scary  | 165                 |
| Sporty | 167                 |
| Posh   | Between 160 and 165 |

Now a column has a mixture of data types — violates 1NF.

**3. A table without a valid primary key**

Having duplicate primary key values — violates 1NF.

**4. Repeating groups in a row**

| cust_id | product_1 | quantity_1 | product_2    | quantity_2 | product_3 | quantity_3 |
| ------- | --------- | ---------- | ------------ | ---------- | --------- | ---------- |
| 1       | camp_soup | 1          | sars_vinegar | 2          | saxa_salt | 1          |

Having repeated groups in the same row — violates 1NF.

---

### 2nd Normal Form (2NF)

A relation is in 2nd normal form if, in addition to satisfying the criteria for 1st normal form, **every non-key column is fully functionally dependent on the entire primary key**.

#### How to Violate 2NF

Having a non-key attribute that is dependent on **part of** a primary key.

**Example — Shopping Basket:**

| cust_id | product       | quantity | cust_rating |
| ------- | ------------- | -------- | ----------- |
| 1       | camp_soup     | 1        | gold        |
| 1       | sars_vinegar  | 2        | gold        |
| 1       | saxa_salt     | 1        | gold        |
| 2       | tesco_popcorn | 2        | silver      |
| 2       | tesco_juice   | 2        | silver      |

Primary key is `{cust_id, product}`. But `cust_rating` depends only on `cust_id` — **part of** the primary key. Violates 2NF.

**Remedy:** Decompose into:

| cust_id | product      | quantity |
| ------- | ------------ | -------- |
| 1       | camp_soup    | 1        |
| 1       | sars_vinegar | 2        |

| cust_id | cust_rating |
| ------- | ----------- |
| 1       | gold        |
| 2       | silver      |

---

### 3rd Normal Form (3NF)

A relation is in 3rd normal form if, in addition to satisfying the criteria for 2nd normal form, **no non-key attributes are transitively dependent upon the primary key**.

#### Test

Relation should not have a non-key attribute functionally determined by another non-key attribute (or by a set of non-key attributes). That is, there should be **no transitive dependency** of a non-key attribute on the primary key.

#### Remedy

Decompose and set up a relation that includes the non-key attribute(s) that functionally determine other non-key attribute(s).

---

### Boyce-Codd Normal Form (BCNF / 3½ NF)

> **All attributes in a relation should be dependent on the key, the whole key and nothing but the key.**

---

### Summary: Test & Remedy

| Normal Form      | Test                                                                                                                                              | Remedy (Normalize)                                                                                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **First (1NF)**  | Relation should have no multivalued attributes or nested relations.                                                                               | Form new relations for each multivalued attribute or nested relation.                                                                                                                          |
| **Second (2NF)** | For relations where primary key contains multiple attributes, no non-key attribute should be functionally dependent on a part of the primary key. | Decompose and set up a new relation for each partial key with its dependent attribute(s). Keep a relation with the original primary key and any attributes fully functionally dependent on it. |
| **Third (3NF)**  | Relation should not have a non-key attribute functionally determined by another non-key attribute (no transitive dependency).                     | Decompose and set up a relation that includes the non-key attribute(s) that functionally determine other non-key attribute(s).                                                                 |

---

### Determinants

If there are rules such that duplicate values of attribute **A** are always associated with the same value of attribute **B** (within any given occurrence of the table), then attribute **A** is a **determinant** of attribute **B**.

Notation: **A → B**

**Example:** If each possible P# value has precisely one associated part description value (i.e. P4 has just one description "nut"), then we can say that **P#** is a determinant of **Part Description**.

```
P# → P_Desc
P# → Qty_in_Stock
```

---

### Determinants: Stock Table

| P#  | P_Desc | Qty  |
| --- | ------ | ---- |
| P1  | Bolt   | 5000 |
| P2  | Nut    | 8300 |
| P3  | Washer | 9750 |
| P4  | nut    | 2326 |

**Question:** Is P_Desc a determinant of P#? **No.**
**Question:** Is P_Desc a determinant of Qty? **No.**

---

### Superfluous Attribute

If P# determines Qty, then the composite attribute {P#, P_Desc} also determines Qty, but P_Desc is **superfluous**.

→ We assume determinants do not contain any superfluous attributes.

---

### Determinacy Diagrams

We need a notation to express where one attribute determines another — we use **determinacy diagrams**.

```
A → B
```

**Example — Stock table determinacy diagram:**

```
P# → P_Desc
P# → Qty
```

Since P# determines both P_Desc and Qty:

```
P# → P_Desc
P# → Qty
```

---

### Determinacy Diagrams (2): Enterprise Rules

**Example enterprise rules:**

- Supplier identified by single S# & a part is identified by single P#
- Each supplier has only one SName but different suppliers may have same names
- A given supplier supplies a given part in just one pack size
- A supplier may supply many different parts in many different pack sizes

**Draw the determinacy diagram.**

---

### Determinacy Diagrams (3): Answers

- **S# is a determinant of SName** (each supplier has one name)
- **{S#, P#} is a determinant of PackSize** (a given supplier supplies a given part in one pack size)

```
S# → SName
{S#, P#} → PackSize
```

---

### Transitive Determinants

If A is determinant of B **and** B is determinant of C, then **A is also determinant of C**.

```
A → B → C
Therefore: A → C
```

---

### Identifiers

"No two rows in a table can have identical values throughout" — therefore an individual row can always be identified by quoting the values of all its attributes. However, some values may not be needed.

**Example:** Employee (Employee#, Employee_name, Salary)

**Rules:**

- No two rows should have the same value for Employee#
- → Employee# is a **row identifier** of the table

**Note:** Where a composed attribute forms the identifier, no component part (of the identifier) can be null (**entity constraint**).

---

### Identifiers: Candidate Keys

In a diagram with attributes {D, E, F, G, H, I, K, L, M, N, O, P, Q}:

- **Identifier D** — uniquely identifies all rows
- **Identifier G** — uniquely identifies all rows
- **Identifier {K, L}** — composite identifier
- **Identifiers P & Q** — both are candidate identifiers

→ **2 candidate identifiers**

---

### Determinacy & Redundancy

Given a determinacy diagram, we can detect and eliminate table structures which could contain redundant data.

**Example:** A company sells products to customers through its sales team.

```
Customer# → Salesman# → Salesman_name
```

- Each customer# is associated with one salesman#, but a salesman# may be associated with several different customer#
- Therefore salesman# could have duplicate values
- But salesman# is a determinant of salesman name
- Therefore each occurrence of a duplicate salesman# value will be associated with the same salesman name → **table can contain redundant values of salesman**

**But:** Customer# values cannot be duplicated (because customer# is the identifier for our table), so we cannot allow redundant values of salesman#.

> **Potential redundancy arises because salesman# is a determinant but we did not choose it as an identifier.**

---

### Boyce-Codd Rule for Detecting Redundancy

```
Customer#  Salesman#  Salesman_name
1          21         John
2          25         Jack
3          29         Jim
4          29         Jim
```

- Customer# is the identifier (determinant & identifier)
- Salesman# is a determinant only (non-identifying determinant)
- Potential redundancy: "Jim" appears twice

---

### Parts and Suppliers Example

| Qty | S#  | P_Desc | P#  | Unit Price |
| --- | --- | ------ | --- | ---------- |

- Potential redundancy in values of P_Desc and Unit_Price
- **P# is a determinant but not a candidate identifier!**
- This gives rise to the **Boyce-Codd Rule** for detecting redundancy

---

### Transformation into Well-Normalised Table (3NF / BCNF)

**Boyce/Codd rule for determining redundancy:**

> _"Every determinant must be a candidate identifier."_

A table which obeys this rule is said to be in **Boyce/Codd Normal Form (BCNF)**.

To put it another way:

> _"All attributes in a relation should be dependent on the key, the whole key and nothing but the key."_

**Remedy:** A determinant which is **not** a candidate identifier is called a **non-identifying determinant**. To transform a badly normalised table into well-normalised tables:

> Create new tables such that each non-identifying determinant in the old table becomes a candidate identifier in a new table.

---

### Example of BCNF Normalisation

**Original table (not in BCNF):**

```
Customer# → Salesman# → Salesman_name
```

| Customer# | Salesman# | Salesman_name |
| --------- | --------- | ------------- |
| 3         | A         | John          |
| 4         | A         | John          |
| 5         | B         | Jack          |
| 6         | C         | Jim           |

**Danger if we tried to update Salesman_name** — "John" appears twice; updating one without the other creates inconsistency.

**After normalisation:**

**Customer-Salesman table:**

| Customer# | Salesman# |
| --------- | --------- |
| 3         | A         |
| 4         | A         |
| 5         | B         |
| 6         | C         |

**Salesman table:**

| Salesman# | Salesman_name |
| --------- | ------------- |
| A         | John          |
| B         | Jack          |
| C         | Jim           |

---

### Fully Normalised Tables

Fully normalised tables are structured in such a way that they **cannot contain redundant data**.

Generally, a well-normalised table (i.e. one in which each determinant is a candidate identifier) is also fully normalised, but **not always** — further normalisation may be desirable.

---

### Fully Normalised Tables: Hidden Transitive Dependency

**Badly normalised:**

| order# | customer# | customer_name |

This has a **hidden transitive dependency**: order# → customer# → customer_name

**After normalisation:**

**Order-Customer table:**

| order# | customer# |
| ------ | --------- |
| 1      | C1        |
| 2      | C2        |
| 3      | C1        |

**Customer_name table:**

| customer# | customer_name |
| --------- | ------------- |
| C1        | Smith         |
| C2        | Jones         |

If we delete Smith from row 3 of customer_name table:

- We can still use order#(1) to find corresponding customer# in order-customer table
- Search order-customer table for another order# placed by that customer
- Use order# to search customer_name table for corresponding customer_name

---

### Multivalued Determinacy

**Example: Library Database Enterprise Rules**

- Each book has a unique book#
- Each author has a unique author#
- Every author has a name and every book has a title
- Each subject classification has a unique subject_name
- Book# does not distinguish an individual copy of a book, only an individual work
- A book may be written by several authors and be classified under several subject_names
- An author may write several books
- A subject_name may be applied to several books

**Determinacy diagram:**

```
author# → author_name
book# → book_title
subject_name → subject_classification
```

---

### Well-Normalised Tables (Library)

```
Author (author#, author_name)
Book (book#, book_title)
Author_Book_Subject (author#, book#, subject_name)
```

---

### Book Example: Multivalued Dependency

Book# B15 is jointly authored by A2 and A5 and is classified under subject names **biology** and **physics**.

If every author of a given book is always associated with **all** the subject-names under which the book is classified, then the attribute subject-name can contain certain redundant values.

| Author# | Book# | Subject-name |
| ------- | ----- | ------------ |
| A2      | B15   | biology      |
| A2      | B15   | physics      |
| A5      | B15   | biology      |
| A5      | B15   | physics      |
| A2      | B18   | physics      |

If subject names biology & physics were deleted from rows 1 and 2, it would be possible to deduce those values from rows 3 and 4.

**Therefore: Author-Book-Subject is well-normalised but NOT fully normalised.**

> The table is not fully normalised because the same set of subject-names is associated with each author of the same book. **Book# is said to multi-determine author# & subject_name.**

---

### Full Normalisation (Library)

Full normalisation can be achieved by splitting the table into two parts:

**Author-Book table:**

| Author# | Book# |
| ------- | ----- |
| A2      | B15   |
| A5      | B15   |
| A2      | B18   |

**Book-Subject table:**

| Book# | Subject-name |
| ----- | ------------ |
| B15   | Biology      |
| B15   | Physics      |
| B18   | Physics      |

---

### Advantages of Full Normalisation

So far, emphasis has been placed on eliminating redundancy. **Further benefits relate to deletion and insertion operations.**

#### Deletion Side Effect

In a non-fully normalised table:

| C#  | CName  | S#  | SName  |
| --- | ------ | --- | ------ |
| C1  | Brown  | S4  | Jones  |
| C2  | Carter | S7  | Samson |
| C3  | Cross  | S4  | Jones  |
| C4  | Barns  | S8  | Baker  |

- **Delete C2** → delete whole tuple → **lose salesman information** (Samson)
- Deleting C# on its own is not allowed as it is an identifier and cannot be null

#### Insertion Side Effect

- **Add Salesman S3** whose name is Hall
- You **cannot** do this until that salesman is associated with a customer, otherwise identifier C# will be null

**Should be modelled as:**

**Customer table:**

| C#  | CName  |
| --- | ------ |
| C1  | Brown  |
| C2  | Carter |
| C3  | Cross  |
| C4  | Barns  |

**Salesman table:**

| S#  | SName  |
| --- | ------ |
| S3  | Hall   |
| S4  | Jones  |
| S7  | Samson |
| S8  | Baker  |

---

### Summary: Codd's Normal Forms

| Normal Form      | Definition                                                                                                                                                                       |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1NF**          | A relation is in first normal form if the domain of each attribute contains only atomic values and the value of each attribute contains only a single value from that domain.    |
| **2NF**          | A relation is in 2nd normal form if, in addition to satisfying the criteria for 1st normal form, every non-key column is fully functionally dependent on the entire primary key. |
| **3NF**          | A relation is in 3rd normal form if, in addition to satisfying the criteria for 2nd normal form, no non-key attributes are transitively dependent upon the primary key.          |
| **BCNF** (3½ NF) | All attributes in a relation should be dependent on the key, the whole key and nothing but the key.                                                                              |

---
