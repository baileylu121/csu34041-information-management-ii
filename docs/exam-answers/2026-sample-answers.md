# 2026 Sample

---

## Part 1: Question 1 — University Database Design (50 marks)

### (a) ER Diagram (30 marks)

#### Entities and Attributes

| Entity         | Attributes                          | Primary Key    |
| -------------- | ----------------------------------- | -------------- |
| **Department** | departmentName, officeLocation      | departmentName |
| **Lecturer**   | name, email                         | email          |
| **Module**     | moduleCode, title, credits          | moduleCode     |
| **Student**    | studentID, name, dateOfBirth, email | studentID      |

#### Multivalued Attributes

**None identified.** The requirements do not specify any attribute that would hold multiple values per entity instance (e.g., a lecturer with multiple phone numbers, or a student with multiple email addresses). All attributes are single-valued.

#### Weak Entities

**None required.** Every entity possesses a full primary key that uniquely identifies each instance independently:

- `Department.departmentName` uniquely identifies a department.
- `Lecturer.email` uniquely identifies a lecturer.
- `Module.moduleCode` uniquely identifies a module.
- `Student.studentID` uniquely identifies a student.

No entity depends on another for its identity, so no weak entities exist.

#### Specialisation / Generalisation

**Lecturer ⊃ HeadOfDepartment**

This is a **partial, overlapping specialisation**:

- **Partial**: Not every lecturer is a Head of Department ("_Some_ lecturers are also Heads of Department").
- **Overlapping**: A lecturer can simultaneously hold both roles — they teach and coordinate modules _and_ head a department. The constraints do not make these mutually exclusive.

The specialisation is represented by the **IS-A** relationship between the superclass _Lecturer_ and the subclass _HeadOfDepartment_. The subclass inherits all attributes of Lecturer (name, email) and adds the 1:1 relationship to Department.

#### Relationships

| Relationship    | Entities                         | Cardinality | Participation                                                                                                                          | Relationship Attributes |
| --------------- | -------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| **BelongsTo**   | Department — Lecturer            | 1:N         | Lecturer: total (each lecturer belongs to exactly one department); Department: partial (a department may have zero or more lecturers)  | None                    |
| **Coordinates** | Lecturer — Module                | 1:N         | Module: total (each module is coordinated by exactly one lecturer); Lecturer: partial (a lecturer may coordinate zero or more modules) | None                    |
| **Offers**      | Department — Module              | 1:N         | Module: total (each module is offered by one department); Department: partial                                                          | None                    |
| **Enrols**      | Student — Module                 | M:N         | Both partial (the requirements use "can" for both directions, indicating capability not obligation)                                    | enrolmentDate, grade    |
| **Advises**     | Lecturer — Student               | 1:N         | Student: partial (each student has _at most one_ advisor); Lecturer: partial (a lecturer may advise zero or more students)             | None                    |
| **Heads**       | Lecturer (subclass) — Department | 1:1         | Department: total (each department has _exactly one_ Head); Lecturer: partial (a lecturer can head _at most one_ department)           | None                    |

#### ER Diagram (Textual Representation)

```
                    ┌─────────────────┐
                    │   Department    │
                    ├─────────────────┤
                    │ *departmentName │
                    │   officeLocation│
                    └───────┬─────────┘
                            │ 1
                            │ Offers
                            │ N
                    ┌───────┴─────────┐
                    │     Module      │
                    ├─────────────────┤
                    │ *moduleCode     │
                    │   title         │
                    │   credits       │
                    └───────┬─────────┘
                            │
              Coordinates   │ 1
              Lecturer ─────┤ N
                            │
                    ┌───────┴─────────┐
                    │    Lecturer     │
                    ├─────────────────┤
                    │ *email          │
                    │   name          │
                    └───────┬─────────┘
                            │
              BelongsTo ────┤ 1
                    N       │
                    ┌───────┴─────────┐
                    │   Department    │
                    └─────────────────┘

                    ┌─────────────────┐
                    │    Lecturer     │
                    │    (superclass) │
                    └───────┬─────────┘
                            │ IS-A (partial, overlapping)
                    ┌───────┴─────────┐
                    │ HeadOfDepartment│
                    │   (subclass)    │
                    └───────┬─────────┘
                            │ 1
                            │ Heads
                            │ 1
                    ┌───────┴─────────┐
                    │   Department    │
                    └─────────────────┘

                    ┌─────────────────┐
                    │    Student      │
                    ├─────────────────┤
                    │ *studentID      │
                    │   name          │
                    │   dateOfBirth   │
                    │   email         │
                    └───────┬─────────┘
                            │
              Enrols ───────┤ M
               (dashed      │
               diamond)     │ N
                            │
                    ┌───────┴─────────┐
                    │     Module      │
                    └─────────────────┘

  Relationship Attributes (attached to Enrols):
    • enrolmentDate
    • grade

                    ┌─────────────────┐
                    │    Lecturer     │
                    └───────┬─────────┘
                            │ 1
                            │ Advises
                            │ N
                    ┌───────┴─────────┐
                    │    Student      │
                    └─────────────────┘
```

**Key notation:**

- `*` denotes primary key attributes (underlined in a hand-drawn diagram).
- Dashed oval/diamond for the **Enrols** relationship to indicate it is an associative entity (linking M:N relationship) with its own attributes.
- The specialisation of Lecturer into HeadOfDepartment is shown with a circle and "d" (disjoint) or "o" (overlapping) — here **o** for overlapping, and **p** for partial (dashed circle).
- Total participation is shown with a double line; partial with a single line.

---

#### (b) Relational Schema Mapping (20 marks)

**Step 1: Map each strong entity to a table**

Each entity with a full primary key becomes a relation with the same structure:

```
Department(departmentName PK, officeLocation)
Lecturer(email PK, name)
Module(moduleCode PK, title, credits)
Student(studentID PK, name, dateOfBirth, email)
```

**Step 2: Map 1:N relationships by placing the foreign key on the "many" side**

**BelongsTo** (Department 1:N Lecturer):

- Each lecturer belongs to exactly one department → add `departmentName` FK to Lecturer.
- Participation of Lecturer is total → `departmentName` is NOT NULL.

```
Lecturer(email PK, name, departmentName FK NOT NULL REFERENCES Department(departmentName))
```

**Coordinates** (Lecturer 1:N Module):

- Each module is coordinated by exactly one lecturer → add `coordEmail` FK to Module.
- Participation of Module is total → `coordEmail` is NOT NULL.

```
Module(moduleCode PK, title, credits, coordEmail FK NOT NULL REFERENCES Lecturer(email))
```

**Offers** (Department 1:N Module):

- Each module is offered by one department → add `departmentName` FK to Module.
- Participation of Module is total → `departmentName` is NOT NULL.

```
Module(moduleCode PK, title, credits, coordEmail FK NOT NULL REFERENCES Lecturer(email),
       departmentName FK NOT NULL REFERENCES Department(departmentName))
```

**Advises** (Lecturer 1:N Student):

- Each student has at most one academic advisor → add `advisorEmail` FK to Student.
- Participation of Student is partial → `advisorEmail` is nullable.

```
Student(studentID PK, name, dateOfBirth, email, advisorEmail FK NULL REFERENCES Lecturer(email))
```

**Step 3: Map M:N relationship to an associative entity (junction table)**

**Enrols** (Student M:N Module) with attributes `enrolmentDate` and `grade`:

- Create a new table with FKs from both sides as the composite primary key, plus the relationship attributes.

```
Enrolment(studentID FK, moduleCode FK, enrolmentDate, grade,
          PK: (studentID, moduleCode))
```

The composite primary key `(studentID, moduleCode)` enforces that a student can enrol in a given module at most once (which is semantically correct — a student does not enrol in the same module twice).

**Step 4: Map the 1:1 relationship (Heads)**

**Heads** (HeadOfDepartment 1:1 Department):

- A 1:1 relationship can be mapped by placing the FK in either table. The standard approach is to place the FK in the table with **total participation** (the "must have" side).
- Department has total participation (each department has _exactly one_ Head) → place `headEmail` FK in Department.
- Lecturer has partial participation (a lecturer heads _at most one_ department) → `headEmail` is nullable.
- Add a UNIQUE constraint on `headEmail` to enforce the 1:1 cardinality on the lecturer side.

```
Department(departmentName PK, officeLocation, headEmail FK UNIQUE NULL REFERENCES Lecturer(email))
```

**Step 5: Map the specialisation (IS-A relationship)**

**Lecturer ⊃ HeadOfDepartment** (partial, overlapping):

- Since the specialisation is overlapping (a lecturer can be both a regular lecturer and a head), the simplest and most correct approach is to **not create a separate HeadOfDepartment table**. Instead, the HeadOfDepartment role is captured by the `headEmail` FK in Department (Step 4), which references the Lecturer table. Any lecturer whose email appears in `Department.headEmail` is a head.
- An alternative (creating a separate HeadOfDepartment table with a FK back to Lecturer) would be necessary only if the subclass had attributes unique to heads. Since no such attributes exist, the FK-in-either-table approach is sufficient.

**Final Relational Schema:**

```
Department(departmentName PK, officeLocation, headEmail FK UNIQUE NULL
           REFERENCES Lecturer(email))

Lecturer(email PK, name, departmentName FK NOT NULL
         REFERENCES Department(departmentName))

Module(moduleCode PK, title, credits,
       coordEmail FK NOT NULL REFERENCES Lecturer(email),
       departmentName FK NOT NULL REFERENCES Department(departmentName))

Student(studentID PK, name, dateOfBirth, email,
        advisorEmail FK NULL REFERENCES Lecturer(email))

Enrolment(studentID FK, moduleCode FK, enrolmentDate, grade,
          PK: (studentID, moduleCode),
          FK: studentID REFERENCES Student(studentID),
          FK: moduleCode REFERENCES Module(moduleCode))
```

**Summary of mapping decisions:**

| ER Concept                         | Relational Mapping Strategy             | Rationale                                                  |
| ---------------------------------- | --------------------------------------- | ---------------------------------------------------------- |
| Strong entity                      | Direct 1:1 table conversion             | Each entity has a full PK                                  |
| 1:N relationship                   | FK on the "many" side                   | Standard mapping; preserves referential integrity          |
| M:N relationship                   | Junction table with composite PK        | Required — cannot represent M:N with FKs alone             |
| Relationship attributes            | Included in junction table              | They describe the relationship instance, not either entity |
| 1:1 relationship                   | FK on total-participation side + UNIQUE | Minimises nulls; UNIQUE enforces cardinality               |
| Partial overlapping specialisation | No separate table; role captured by FK  | No subclass-specific attributes; avoids unnecessary joins  |

---

## Part 2: Multiple Choice Questions — Full Answers (50 marks, 5 marks each)

---

### MC Question 1

**Question:** A database administrator grants `SELECT, UPDATE` on `Employees` to `user1` and `SELECT` to `user2`. Later, the administrator executes `REVOKE SELECT ON Employees FROM user1`. Which is TRUE?

**Answer: B — user1 retains UPDATE but loses SELECT**

**Detailed Explanation:**

In SQL, `GRANT` and `REVOKE` operate on **individual privileges**, not as a grouped bundle. Each privilege is tracked and managed independently.

- `GRANT SELECT, UPDATE ON Employees TO user1` grants two separate privileges to `user1`: the ability to `SELECT` rows and the ability to `UPDATE` rows.
- `REVOKE SELECT ON Employees FROM user1` removes **only** the `SELECT` privilege from `user1`. The `UPDATE` privilege is unaffected because it was granted separately and is stored as a distinct entry in the system catalog (e.g., `information_schema.role_table_grants` or `sys.database_permissions`).

This is analogous to having two separate keys: removing one key does not affect the other.

**Why the other options are wrong:**

- **A** is incorrect because `REVOKE` is privilege-specific. It does not cascade to other privileges held by the same user on the same object.
- **C** is incorrect because there is no privilege dependency here. Privilege dependencies exist in the context of `GRANT ... WITH GRANT OPTION`, where revoking a privilege from a user who has granted it to others would cascade. That is not the case here.
- **D** is incorrect because `user1` still retains the `UPDATE` privilege and can perform update operations on `Employees`.

---

### MC Question 2

**Question:** Schedule: `R1(X), R2(X), W1(X), W2(X)`. Which statement is correct?

**Answer: C — The schedule is not serializable**

**Detailed Explanation:**

**Conflict-Serializability Test (Precedence Graph):**

Two operations conflict if they belong to different transactions, access the same data item, and at least one is a write.

| Pair         | Transactions | Operations   | Conflict? | Direction |
| ------------ | ------------ | ------------ | --------- | --------- |
| R1(X), W2(X) | T1, T2       | Read, Write  | Yes       | T1 → T2   |
| R2(X), W1(X) | T2, T1       | Read, Write  | Yes       | T2 → T1   |
| W1(X), W2(X) | T1, T2       | Write, Write | Yes       | T1 → T2   |

The precedence graph contains edges T1 → T2 and T2 → T1, forming a **cycle**. Therefore, the schedule is **not conflict-serializable**.

**View-Serializability Test:**

A schedule is view-serializable if it is view-equivalent to some serial schedule. Two schedules are view-equivalent if all three of the following conditions hold:

1. The **initial read** is the same (same transaction reads the initial value of X).
2. The **final write** is the same (same transaction performs the last write to X).
3. Every **direct read-from** relation is the same.

In the given schedule `R1(X), R2(X), W1(X), W2(X)`:

- Initial read: T1 reads the initial value of X (no prior write).
- Final write: T2 writes to X last.
- Read-from relations: R2 reads from initial value (W1 has not executed when R2 runs); W1 is read by no one (its value is overwritten by W2); W2 is the final write.

Checking both possible serial schedules:

**T1 → T2** (`R1(X), W1(X), R2(X), W2(X)`):

- Initial reader: T1 ✓
- Final writer: T2 ✓
- Read-from: R2 reads from W1 (T1's write). In the original schedule, R2 reads from the initial value. ✗

**T2 → T1** (`R2(X), W2(X), R1(X), W1(X)`):

- Initial reader: T2. In the original schedule, T1 is the initial reader. ✗

Neither serial schedule is view-equivalent to the original. The schedule is **not view-serializable**.

**Conclusion:** The schedule is neither conflict-serializable nor view-serializable.

**Why the other options are wrong:**

- **A** is wrong because the precedence graph has a cycle (T1 → T2 → T1).
- **B** is wrong because the schedule is _not_ view-serializable — no serial schedule preserves the same read-from relations as the original.
- **D** is wrong because a strict schedule requires that any transaction that writes to a data item must commit or abort before any other transaction reads that item. Here, T2 reads X (R2) before T1 writes and commits (W1), so the schedule is not strict.

---

### MC Question 3

**Question:** Which scenario **BEST** justifies using a document-oriented NoSQL database over a relational database?

**Answer: C — Frequent schema evolution with nested, semi-structured data**

**Detailed Explanation:**

Document-oriented databases (e.g., MongoDB, CouchDB, Firebase) store data as self-describing documents (typically JSON, BSON, or XML). Their key advantages over RDBMS are:

1. **Schema flexibility**: Documents within the same collection can have different structures. Fields can be added, removed, or renamed without migrations or DDL changes. This is ideal for applications with evolving requirements.
2. **Nested data**: Documents can contain nested objects and arrays naturally, avoiding the need for complex JOINs and normalisation.
3. **Semi-structured data**: Documents handle data with irregular or unpredictable structure (e.g., product catalogs with varying attributes, user profiles with optional fields).

**Why the other options are wrong:**

- **A** is wrong because document databases typically provide **weaker** ACID guarantees than RDBMS. Financial transactions require strong consistency, which is the strength of relational databases.
- **B** is wrong because a fixed, highly normalised schema is the ideal use case for RDBMS. Normalisation eliminates redundancy and ensures data integrity — strengths of relational systems, not document databases.
- **D** is wrong because complex multi-table JOINs are computationally expensive in document databases (which store related data through embedding or manual referencing). RDBMS with their JOIN engine is purpose-built for this.

---

### MC Question 4

**Question:** Given `Orders(order_id, customer_id, amount)`, which query returns customers whose total order amount exceeds 1000?

**Answer: B — `SELECT customer_id FROM Orders GROUP BY customer_id HAVING SUM(amount) > 1000;`**

**Detailed Explanation:**

This query requires **group-level filtering**, which mandates the `HAVING` clause:

1. `GROUP BY customer_id` aggregates all orders belonging to each customer into a single group.
2. `SUM(amount)` computes the total order amount per customer within each group.
3. `HAVING SUM(amount) > 1000` filters groups — retaining only those customers whose aggregated total exceeds 1000.

**Why the other options are wrong:**

- **A** is syntactically invalid. Aggregate functions like `SUM()` cannot appear in a `WHERE` clause because `WHERE` is evaluated **before** grouping. The SQL standard requires aggregate filtering to use `HAVING`.
- **C** returns individual orders (not customer totals) where a single order exceeds 1000. It does not aggregate across all orders per customer. For example, a customer with three orders of 500 each (total 1500) would not be returned because no single order exceeds 1000.
- **D** is incorrect because `DISTINCT` is meaningless here without a `GROUP BY`. `DISTINCT` operates on rows, not groups. `HAVING` without `GROUP BY` applies to the entire table as a single implicit group, returning either the single aggregated result or nothing — not per-customer totals.

---

### MC Question 5

**Question:** Under GDPR, which is a lawful basis for processing personal data?

**Answer: B — User consent has been explicitly obtained**

**Detailed Explanation:**

GDPR Article 6(1) specifies **six lawful bases** for processing personal data:

| Lawful Basis         | Article | Description                                                                            |
| -------------------- | ------- | -------------------------------------------------------------------------------------- |
| **Consent**          | 6(1)(a) | The data subject has given clear, explicit consent                                     |
| Contract             | 6(1)(b) | Processing is necessary for contract performance                                       |
| Legal obligation     | 6(1)(c) | Processing is required by law                                                          |
| Vital interests      | 6(1)(d) | Processing is necessary to protect someone's life                                      |
| Public task          | 6(1)(e) | Processing is necessary for official duties                                            |
| Legitimate interests | 6(1)(f) | Processing is necessary for legitimate purposes (balanced against data subject rights) |

**Explicit consent** (option B) is the most straightforward lawful basis and matches option B exactly. Under GDPR, consent must be: freely given, specific, informed, and unambiguous (Article 4(11)), and require a clear affirmative action (Article 7(2)).

**Why the other options are wrong:**

- **A** is wrong: Public availability of data does **not** constitute a lawful basis. Even publicly available data requires a lawful basis under Article 6 before processing.
- **C** is wrong: Financial benefit to the company is not a lawful basis. It might potentially fall under "legitimate interests" (6(1)(f)), but only after a balancing test against the data subject's rights and interests. Financial benefit alone is insufficient.
- **D** is wrong: Post-processing anonymisation is a security/privacy measure, not a lawful basis. The lawful basis must exist **before** processing begins. Additionally, true anonymisation (irreversible) falls outside GDPR scope entirely, but the question asks about the basis for _processing_ personal data.

---

### MC Question 6

**Question:** `CHECK (salary > 0 AND salary < 100000)`. Which statement is TRUE?

**Answer: C — The constraint is enforced on both INSERT and UPDATE operations**

**Detailed Explanation:**

A `CHECK` constraint is a **declarative integrity constraint** evaluated by the database engine whenever a row is modified. It is enforced at the row level on every data modification that could violate it:

- **INSERT**: The new row's values are evaluated against the CHECK condition. If the condition evaluates to `FALSE` (or `UNKNOWN`/`NULL`), the insertion is rejected.
- **UPDATE**: When an existing row is updated, the new values are evaluated against the CHECK condition. If the condition fails, the update is rejected.

This enforcement is automatic and cannot be bypassed by application logic — it is enforced at the storage engine level.

**Why the other options are wrong:**

- **A** is wrong because CHECK constraints are enforced on **all** modifying operations (INSERT and UPDATE), not just insertion.
- **B** is wrong because CHECK constraints are enforced **within** transactions. A transaction cannot bypass a CHECK constraint; if the constraint would be violated, the transaction (or the specific statement) fails.
- **D** is wrong because CHECK constraints validate **value ranges**, not uniqueness. A `UNIQUE` constraint or `PRIMARY KEY` enforces uniqueness. Multiple rows can have the same salary value within the allowed range.

---

### MC Question 7

**Question:** An Irish e-commerce company obtains consent for data processing, later uses data for advertising (with updated consent), receives an erasure request, deletes from main DB but retains in backups and analytics. What is the GDPR assessment?

**Answer: B — The company is non-compliant due to incomplete erasure**

**Detailed Explanation:**

**Violation: Incomplete Erasure — Right to be Forgotten (Article 17)**

Article 17 gives data subjects the right to erasure ("right to be forgotten"). When a valid erasure request is received, the controller must erase personal data **without undue delay**. This obligation extends to:

- **All copies and reproductions** of the data.
- **Backups**: The company must erase from backups as well, though the GDPR acknowledges practical limitations. The European Data Protection Board (EDPB) guidance states that data in backups may be retained until the backup is overwritten or restored, but the controller must ensure the data is **not accessible or used** during that period.
- **Analytics datasets**: These are not exempt. If analytics datasets contain personal data, that data must be erased or anonymised. Retaining personal data in analytics without a lawful basis is unlawful processing.

The company's failure to erase from backups and analytics datasets is a clear violation. Simply deleting from the main database is insufficient.

**Why the other options are wrong:**

- **A** is wrong because compliance requires more than just obtaining consent. The erasure obligation (Article 17) was not fulfilled, making the company non-compliant regardless of consent quality.
- **C** is wrong because "internal use" is not a GDPR exemption. All processing, including internal analytics, requires a lawful basis and must comply with all GDPR principles (including erasure).
- **D** is wrong because GDPR is not a "basic human right applicable worldwide." GDPR is a regional regulation that applies to: (1) organisations established in the EU/EEA, and (2) organisations outside the EU that offer goods/services to, or monitor the behaviour of, EU data subjects. It is not a universal human right instrument; it is a regulatory framework. (The right to data protection is recognised as a fundamental right under Article 8 of the EU Charter of Fundamental Rights, but GDPR itself has defined territorial scope.)

---

### MC Question 8

**Question:** Under Strict 2PL, T1 and T2 execute as described. What happens?

**Answer: B — A deadlock occurs between T1 and T2**

**Detailed Explanation:**

**Strict Two-Phase Locking (Strict 2PL)** protocol rules:

- Transactions acquire **shared (S)** locks for reads and **exclusive (X)** locks for writes.
- Locks are held until the transaction **commits or aborts** (the "strict" part — no lock release until end of transaction).
- Locks can be **upgraded** (S → X) if no other transaction holds any lock on the same item.

**Step-by-step execution:**

| Step | Action                     | Lock State                                                                                  |
| ---- | -------------------------- | ------------------------------------------------------------------------------------------- |
| 1    | T1 acquires S-lock on X    | T1: {X: S}                                                                                  |
| 2    | T2 acquires S-lock on Y    | T1: {X: S}, T2: {Y: S}                                                                      |
| 3    | T1 upgrades to X-lock on X | T1: {X: X}, T2: {Y: S} (upgrade succeeds — no contention on X)                              |
| 4    | T2 upgrades to X-lock on Y | T1: {X: X}, T2: {Y: X} (upgrade succeeds — no contention on Y)                              |
| 5    | T1 requests lock on Y      | **BLOCKED** — T2 holds X-lock on Y. T1 needs at least S-lock on Y, but X-lock is exclusive. |
| 6    | T2 requests lock on X      | **BLOCKED** — T1 holds X-lock on X. T2 needs at least S-lock on X, but X-lock is exclusive. |

**Result:**

- T1 is waiting for T2 to release Y.
- T2 is waiting for T1 to release X.
- Neither transaction can proceed. This is a **circular wait**, which is a classic **deadlock**.

The deadlock detection mechanism (or timeout) in the DBMS will eventually resolve this by aborting one of the transactions and allowing the other to proceed.

**Why the other options are wrong:**

- **A** is wrong because both transactions cannot complete — they are blocked waiting for each other.
- **C** is wrong because there are no dirty reads here. Both transactions hold exclusive locks, preventing any other transaction from reading uncommitted data. The issue is deadlock, not dirty reads.
- **D** is wrong because the schedule is **not** serialisable without blocking. The strict 2PL protocol guarantees serialisability, but in this case, the protocol itself causes a deadlock, meaning the transactions cannot execute concurrently without one being aborted.

---

### MC Question 9

**Question:** Wait-Die scheme with T1 (TS=1), T2 (TS=2), T3 (TS=3). What happens?

**Answer: C — T1 waits, T3 aborts**

**Detailed Explanation:**

**Wait-Die Scheme** (older transactions wait, younger transactions die/abort):

The Wait-Die protocol is a **deadlock prevention** scheme based on timestamps. The rules are:

| Requesting Transaction | Holding Transaction | Age Relationship     | Action                                                                       |
| ---------------------- | ------------------- | -------------------- | ---------------------------------------------------------------------------- |
| Older (lower TS)       | Younger (higher TS) | Requester is older   | **WAIT** — older transactions are not aborted                                |
| Younger (higher TS)    | Older (lower TS)    | Requester is younger | **DIE** (abort) — younger transactions are restarted with the same timestamp |

**Step-by-step execution:**

| Step | Action                | Lock State             | Result                                                         |
| ---- | --------------------- | ---------------------- | -------------------------------------------------------------- |
| 1    | T2 acquires lock on X | T2 holds X             | Success                                                        |
| 2    | T3 acquires lock on Y | T2 holds X, T3 holds Y | Success                                                        |
| 3    | T1 requests lock on X | T2 holds X             | T1 (TS=1) is **older** than T2 (TS=2). T1 **WAITS**.           |
| 4    | T2 requests lock on Y | T3 holds Y             | T2 (TS=2) is **older** than T3 (TS=3). T2 **WAITS**.           |
| 5    | T3 requests lock on X | T2 holds X             | T3 (TS=3) is **younger** than T2 (TS=2). T3 **DIES** (aborts). |

**Result:**

- T1 is waiting (older, allowed to wait).
- T2 is waiting (older, allowed to wait).
- T3 is aborted (younger, forced to die).

**Why the other options are wrong:**

- **A** is wrong because T1 is older than T2, so T1 waits rather than aborts.
- **B** is incomplete — while T3 does abort, this option ignores that T1 also waits. Option C is more complete and accurate.
- **D** is wrong because T2 successfully acquired X in step 1 and is not aborted. T2 is waiting for Y (step 4), but it is not aborted — it is older than T3.

---

### MC Question 10

**Question:** Same scenario as MC Question 9, but using **Wound-Wait** scheme. What happens?

**Answer: B — T2 aborts**

**Detailed Explanation:**

**Wound-Wait Scheme** (older transactions wound/abort younger ones, younger transactions wait):

The Wound-Wait protocol is another **deadlock prevention** scheme based on timestamps. The rules are:

| Requesting Transaction | Holding Transaction | Age Relationship     | Action                                                                    |
| ---------------------- | ------------------- | -------------------- | ------------------------------------------------------------------------- |
| Older (lower TS)       | Younger (higher TS) | Requester is older   | **WOUND** — the younger holder is aborted; the older transaction proceeds |
| Younger (higher TS)    | Older (lower TS)    | Requester is younger | **WAIT** — younger transactions wait for older ones                       |

**Step-by-step execution:**

| Step | Action                | Lock State             | Result                                                                                     |
| ---- | --------------------- | ---------------------- | ------------------------------------------------------------------------------------------ |
| 1    | T2 acquires lock on X | T2 holds X             | Success                                                                                    |
| 2    | T3 acquires lock on Y | T2 holds X, T3 holds Y | Success                                                                                    |
| 3    | T1 requests lock on X | T2 holds X             | T1 (TS=1) is **older** than T2 (TS=2). T1 **wounds** T2. T2 is **aborted**. T1 acquires X. |
| 4    | T2 requests lock on Y | T2 is already aborted  | **Skipped** — T2 no longer exists as an active transaction.                                |
| 5    | T3 requests lock on X | T1 holds X             | T3 (TS=3) is **younger** than T1 (TS=1). T3 **WAITS**.                                     |

**Result:**

- T1 proceeds (older, wounds T2).
- T2 is **aborted** (wounded by older T1).
- T3 waits (younger, must wait for older T1).

**Key difference from Wait-Die:** In Wait-Die, the younger transaction (T3) aborts when it encounters an older holder. In Wound-Wait, the **older** transaction wounds (aborts) the younger holder. Both schemes prevent deadlocks, but they differ in which transaction is aborted:

- Wait-Die: younger aborts.
- Wound-Wait: younger is aborted by the older (the older "wounds" the younger).

In this specific scenario, the outcome differs:

- Wait-Die (MC9): T3 aborts (younger requesting from older).
- Wound-Wait (MC10): T2 aborts (younger holder wounded by older requester).

**Why the other options are wrong:**

- **A** is wrong because T1 is older than T2, so T1 wounds T2 rather than waiting.
- **C** is wrong because T3 does not abort — T3 is younger and must wait. T3 only waits in step 5; it is not aborted by Wound-Wait.
- **D** is wrong because T2 is wounded and aborted by T1 (step 3), not allowed to wait.

---

## Summary of MCQ Answers

| Question | Answer | Key Concept                                                                                                  |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| MC 1     | **B**  | REVOKE is privilege-specific                                                                                 |
| MC 2     | **C**  | Not conflict-serializable (precedence graph cycle) and not view-serializable (no equivalent serial schedule) |
| MC 3     | **C**  | Document DBs excel at schema flexibility and nested data                                                     |
| MC 4     | **B**  | GROUP BY + HAVING for aggregate filtering                                                                    |
| MC 5     | **B**  | Explicit consent is a GDPR Article 6 lawful basis                                                            |
| MC 6     | **C**  | CHECK constraints enforced on INSERT and UPDATE                                                              |
| MC 7     | **B**  | Non-compliant: incomplete erasure (backups/analytics)                                                        |
| MC 8     | **B**  | Deadlock under Strict 2PL (circular wait)                                                                    |
| MC 9     | **C**  | Wait-Die: older waits, younger dies (T1 waits, T3 aborts)                                                    |
| MC 10    | **B**  | Wound-Wait: older wounds younger (T2 aborted by T1)                                                          |
