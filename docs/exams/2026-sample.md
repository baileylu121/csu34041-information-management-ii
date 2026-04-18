# 2026 Sample

The exam has two parts:

- **Part 1** is to be completed with pen and paper.
- **Part 2** should be completed on your assigned computer via Blackboard.

---

## Part 1: Question 1 (Pen & Paper)

### (50 marks)

A university wants to design a database to manage information about its academic departments, lecturers, modules, and students. The requirements are as follows:

- Each department has a department name and an office location.
- Each lecturer has a name, an email, and belongs to exactly one department.
- Each module has a unique module code, a title, and a number of credits to be awarded for that module once completed.
- Each module is coordinated by exactly one lecturer, but a lecturer may coordinate many modules.
- A module is offered by one department, and each department may offer many modules.
- Each student has a unique student ID number, a name, a date of birth, and an email address.
- A student can enrol in many modules, and a module can have many students.
- For each enrolment, the university must store the enrolment date and the student's grade.
- A lecturer may act as an academic advisor for many students, but each student has at most one academic advisor.
- Some lecturers are also Heads of Department. Each department has exactly one Head of Department, and a lecturer can head at most one department.

#### (a) — 30 marks

Draw an ER diagram that includes:

- All entities
- Primary keys
- Attributes
- Multivalued attributes
- Weak entities (if needed)
- Specialisation / generalisation
- Relationship attributes
- Cardinality and participation constraints

#### (b) — 20 marks

Map the ER diagram to relational tables, explaining each step as you go.

---

## Part 2: Multiple Choice Questions (Computer & Blackboard)

Each MCQ below is worth **5 marks**.

---

### MC Question 1

A database administrator grants the following permissions:

```sql
GRANT SELECT, UPDATE ON Employees TO user1;
GRANT SELECT ON Employees TO user2;
```

Later, the administrator executes:

```sql
REVOKE SELECT ON Employees FROM user1;
```

**Which of the following is TRUE?**

|        |                                                                     |
| ------ | ------------------------------------------------------------------- |
| **A.** | user1 loses both SELECT and UPDATE privileges                       |
| **B.** | user1 retains UPDATE but loses SELECT                               |
| **C.** | user1 retains both privileges due to dependency                     |
| **D.** | user1 cannot perform any operations until privileges are reassigned |

---

### MC Question 2

Consider the following schedule involving two transactions:

- **T1:** `R(X), W(X)`
- **T2:** `R(X), W(X)`

**Schedule:** `R1(X), R2(X), W1(X), W2(X)`

**Which statement is correct?**

|        |                                                                 |
| ------ | --------------------------------------------------------------- |
| **A.** | The schedule is conflict-serializable                           |
| **B.** | The schedule is view-serializable but not conflict-serializable |
| **C.** | The schedule is not serializable                                |
| **D.** | The schedule is strict                                          |

---

### MC Question 3

Which of the following scenarios **BEST** justifies using a document-oriented NoSQL database over a relational database?

|        |                                                                |
| ------ | -------------------------------------------------------------- |
| **A.** | Strong ACID guarantees are required for financial transactions |
| **B.** | Data schema is fixed and highly normalised                     |
| **C.** | Frequent schema evolution with nested, semi-structured data    |
| **D.** | Complex joins across multiple tables are required              |

---

### MC Question 4

Given the table:

```
Orders(order_id, customer_id, amount)
```

Which query returns customers whose total order amount exceeds 1000?

|        |                                                                                  |
| ------ | -------------------------------------------------------------------------------- |
| **A.** | `SELECT customer_id FROM Orders WHERE SUM(amount) > 1000;`                       |
| **B.** | `SELECT customer_id FROM Orders GROUP BY customer_id HAVING SUM(amount) > 1000;` |
| **C.** | `SELECT customer_id FROM Orders WHERE amount > 1000;`                            |
| **D.** | `SELECT DISTINCT customer_id FROM Orders HAVING SUM(amount) > 1000;`             |

---

### MC Question 5

Under GDPR, which of the following is considered a lawful basis for processing personal data?

|        |                                           |
| ------ | ----------------------------------------- |
| **A.** | Data is publicly available                |
| **B.** | User consent has been explicitly obtained |
| **C.** | The company benefits financially          |
| **D.** | Data is anonymised after processing       |

---

### MC Question 6

Consider the following SQL constraint:

```sql
ALTER TABLE Employees
ADD CONSTRAINT chk_salary CHECK (salary > 0 AND salary < 100000);
```

**Which statement is TRUE?**

|        |                                                                 |
| ------ | --------------------------------------------------------------- |
| **A.** | The constraint is enforced only during insertion                |
| **B.** | The constraint can be bypassed using transactions               |
| **C.** | The constraint is enforced on both INSERT and UPDATE operations |
| **D.** | The constraint guarantees uniqueness of salary values           |

---

### MC Question 7

A company based in Ireland operates an e-commerce platform and processes customer data (names, emails, purchase history).

**Scenario:**

1. Users initially give consent for data processing during account creation.
2. The company later decides to use the same data for targeted advertising and updates consent with the users.
3. A user requests erasure of their data.
4. The company deletes the user's personal data from its main database but retains it in backups and analytics datasets.

**Which of the following is the MOST accurate assessment under GDPR?**

|        |                                                                                                                  |
| ------ | ---------------------------------------------------------------------------------------------------------------- |
| **A.** | The company is compliant because initial consent was originally obtained and then updated to include advertising |
| **B.** | The company is non-compliant due to unlawful processing and incomplete erasure                                   |
| **C.** | The company is compliant if data is only used internally for analytics                                           |
| **D.** | The company is non-compliant because GDPR is a basic human right applicable worldwide                            |

---

### MC Question 8

Consider two transactions operating under strict two-phase locking (Strict 2PL):

- **T1:** `R(X), W(X), R(Y), W(Y)`
- **T2:** `R(Y), W(Y), R(X), W(X)`

**Execution proceeds as follows:**

1. T1 acquires a shared lock on X and reads it.
2. T2 acquires a shared lock on Y and reads it.
3. T1 upgrades to an exclusive lock on X and writes it.
4. T2 upgrades to an exclusive lock on Y and writes it.
5. T1 requests a lock on Y.
6. T2 requests a lock on X.

**What will happen?**

|        |                                                          |
| ------ | -------------------------------------------------------- |
| **A.** | Both transactions complete successfully without conflict |
| **B.** | A deadlock occurs between T1 and T2                      |
| **C.** | One transaction is rolled back due to dirty reads        |
| **D.** | The schedule is serialisable without blocking            |

---

### MC Question 9

Three transactions with timestamps (lower = older):

- **T1** (TS = 1) — oldest
- **T2** (TS = 2)
- **T3** (TS = 3) — youngest

They request locks in the following order:

1. T2 acquires a lock on resource X.
2. T3 acquires a lock on resource Y.
3. T1 requests X.
4. T2 requests Y.
5. T3 requests X.

**Assume the system uses Wait-Die. Which of the following correctly describes what happens?**

|        |                     |
| ------ | ------------------- |
| **A.** | T1 aborts           |
| **B.** | T3 aborts           |
| **C.** | T1 waits, T3 aborts |
| **D.** | T2 aborts           |

---

### MC Question 10

The same scenario is repeated here from MC Question 9:

Three transactions with timestamps (lower = older):

- **T1** (TS = 1) — oldest
- **T2** (TS = 2)
- **T3** (TS = 3) — youngest

They request locks in the following order:

1. T2 acquires a lock on resource X.
2. T3 acquires a lock on resource Y.
3. T1 requests X.
4. T2 requests Y.
5. T3 requests X.

**Assume the system uses Wound-Wait. Which of the following correctly describes what happens?**

|        |           |
| ------ | --------- |
| **A.** | T1 waits  |
| **B.** | T2 aborts |
| **C.** | T3 aborts |
| **D.** | T2 waits  |

---

_End of Sample Exam_
