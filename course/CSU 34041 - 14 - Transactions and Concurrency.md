# Transactions and Concurrency Control

> **Course:** CSU34041 — Information Management II  
> **Instructor:** Yvette Graham  
> **Email:** ygraham@tcd.ie  
> **Recommended Reading:** Chapters 20 & 21, _Fundamentals of Database Systems_, Elmasri & Navathe, 7th Edition

---

## Table of Contents

1. [Introduction](#introduction)
2. [Transactions](#transactions)
   - [Transaction Failure](#transaction-failure)
   - [Transaction Properties (ACID)](#transaction-properties-acid)
3. [Concurrency Control](#concurrency-control)
   - [Lost Update](#lost-update)
   - [Temporary Update (Dirty Read)](#temporary-update-dirty-read)
   - [Incorrect Summary](#incorrect-summary)
4. [Schedules](#schedules)
   - [Schedule Conflicts](#schedule-conflicts)
   - [Serial Schedules](#serial-schedules)
   - [Issues with Serial Schedules](#issues-with-serial-schedules)
5. [Serializability & Result Equivalence](#serializability--result-equivalence)
   - [Result Equivalence](#result-equivalence)
   - [Conflict Equivalence](#conflict-equivalence)
6. [Concurrency Control Protocols](#concurrency-control-protocols)
   - [Locking](#locking)
     - [Binary Lock](#binary-lock)
     - [Read/Write Lock](#readwrite-lock)
     - [Lock Conversion](#lock-conversion)
   - [Two-Phase Locking](#two-phase-locking)
     - [Problems & Limitations](#problems--limitations)
   - [Deadlock](#deadlock)
     - [Deadlock Prevention Protocols](#deadlock-prevention-protocols)
       - [No-Waiting](#no-waiting)
       - [Wait-Die](#wait-die)
       - [Wound-Wait](#wound-wait)
       - [Cautious Waiting](#cautious-waiting)
     - [Deadlock Detection](#deadlock-detection)
   - [Starvation](#starvation)
     - [Starvation Solutions](#starvation-solutions)
   - [Timestamp Ordering](#timestamp-ordering)

---

## Introduction

Airline reservations, credit card processing, online shopping — these are examples of very large real-world database systems:

- Can potentially have **thousands of users** performing operations at the same time
- Operations can be **complex**, involving a number of separate actions
  - e.g. Create booking → update remaining seats → charge credit card → issue confirmation

**Transactions** and **Concurrency Control** are the mechanisms by which a DBMS manages complex processes and multi-user access.

| Concept                 | Definition                                                                              |
| ----------------------- | --------------------------------------------------------------------------------------- |
| **Transaction**         | A logical unit of DB processing that is completed in its entirety to ensure correctness |
| **Concurrency Control** | Used when two operations try to access the same data at the same time                   |

---

## Transactions

A transaction includes one or more DB access operations:

- **Insertion, Deletion, Modification, Retrieval**

Transactions are classified into two types:

| Type                        | Description                                                          |
| --------------------------- | -------------------------------------------------------------------- |
| **Read-Only Transactions**  | The DB operations retrieve data, but do _not_ update any information |
| **Read-Write Transactions** | Transactions which update the DB                                     |

### Transaction Termination

The end of a transaction is signalled by one of two outcomes:

| Outcome              | Description                                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Commit**           | Successful termination — completes the current transaction, making its changes permanent                           |
| **Rollback / Abort** | Unsuccessful termination — undoes the operations in the current transaction, cancelling the changes made to the DB |

### Transaction Failure

There are a number of reasons why a transaction might fail:

- **System crash** — hardware, software, or network error
- **Transaction error** — e.g. divide by zero, incorrect attribute reference, incorrect parameter value
- **Checks failing within the transaction** — e.g. insufficient funds to make a withdrawal

### Transaction Properties (ACID)

All transactions should possess the **ACID** properties:

| Property                     | Description                                                                                                                                                                             |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Atomicity**                | A transaction is an atomic unit of processing — it should either be performed in its entirety, or not performed at all                                                                  |
| **Consistency Preservation** | A transaction should preserve the consistency of the DB — it should take the database from one consistent state to another                                                              |
| **Isolation**                | A transaction should appear as though it is being executed in isolation — the execution of a transaction should not be interfered with by any other transactions executing concurrently |
| **Durability (Permanency)**  | The changes applied by a committed transaction must persist in the database — these changes must not be lost because of any failure                                                     |

---

## Concurrency Control

Concurrency control problems arise when multiple transactions access the same data concurrently. Three key issues:

### Lost Update

A lost update occurs when two or more transactions:

1. Access the **same data item**
2. Are executed **concurrently**
3. Are interleaved in such a way that results in an **incorrect value** being written to the database

### Temporary Update (Dirty Read)

A temporary update occurs when two or more transactions:

1. Access the **same data item**
2. Are executed **concurrently**
3. Are interleaved
4. One transaction **fails and must roll back**

The other transaction has read data that was never committed — this is also known as a **"Dirty Read."**

### Incorrect Summary

An incorrect summary occurs when two or more transactions:

1. Access the **same data item**
2. Are executed **concurrently**
3. Are interleaved
4. One transaction is **calculating an aggregate summary** on attributes while another transaction is **updating those attributes**

The aggregate is computed over an inconsistent snapshot of the data.

---

## Schedules

A **schedule** is a sequence of operations from one or more transactions, executed in some order.

### Schedule Conflicts

Two operations in a schedule are said to **conflict** if:

1. They belong to **different transactions**
2. They access the **same item X**
3. At least one of the operations is a **write(X)**

> **Intuition:** Two operations are conflicting if changing their order can result in a different outcome — or cause one of the concurrency issues discussed above.

### Serial Schedules

**Formally:** A schedule _S_ is **serial** if, for every transaction _T_ participating in the schedule, all operations of _T_ are executed consecutively. Otherwise, the schedule is **non-serial**.

In a serial schedule:

- Only **one transaction is executed at a time**
- The commit (or abort) of the active transaction initiates execution of the next transaction

> **Assumption:** Every serial schedule is correct.
>
> - All transactions should be independent (**Isolation**)
> - Each transaction is assumed to be correct if executed on its own (**Consistency Preservation**)
> - Hence, the ordering of transactions in a serial schedule does _not_ matter — once every transaction is executed from beginning to end, the result is correct.

### Issues with Serial Schedules

Serial schedules are **theoretically correct** but **practically unacceptable**:

- They **limit concurrency**
- If a transaction is waiting for an operation to complete, it is not possible to switch processing to another transaction
- If a transaction is very long, **all other transactions must wait**

---

## Serializability & Result Equivalence

It can be determined which non-serial schedules are **equivalent** to a serial schedule — those schedules can be allowed to occur.

**How is equivalence measured?**

- **Result equivalence** — same final database state
- **Conflict equivalence** — same order of conflicting operations

If a non-serial schedule meets either criterion, it is said to be **serializable**.

Being able to say that a schedule is serializable is the same as saying it is **correct**:

> All serial schedules are correct → If schedule _S_ is equivalent to a serial schedule → Hence, _S_ is also correct.

Serializable schedules give the benefit of **concurrent execution** without giving up **correctness**.

### Result Equivalence

Two schedules are said to be **result equivalent** if they produce the **same final state** of the DB.

> This is the simplest notion of equivalence — however, two schedules could **coincidentally** produce the same result without being truly equivalent.

### Conflict Equivalence

Two schedules are said to be **conflict equivalent** if the order of any two **conflicting operations** is the same in both schedules.

> **Reminder:** Two operations conflict if they belong to different transactions, access the same item _X_, and at least one is a write.

If two conflicting operations are applied in different orders, the effect on the DB can be different:

| Scenario          | Example                                    | Why Not Equivalent                                                                        |
| ----------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------- |
| **Read / Write**  | S_A: `r₁(X), w₂(X)` vs S_B: `w₂(X), r₁(X)` | The value read by `r₁(X)` may differ — it may have been updated by the write              |
| **Write / Write** | S_A: `w₁(X), w₂(X)` vs S_B: `w₂(X), w₁(X)` | The next `r(X)` will read potentially different values; the final value of _X_ may differ |

**Determining serializability:** Swap non-conflicting operations to see if a schedule can be transformed into an equivalent serial schedule.

---

## Concurrency Control Protocols

Most DBMSs have a set of **protocols** that:

- Must be followed by **every transaction**
- Are **enforced by the concurrency control subsystem**
- **Ensure the serializability** of all schedules in which the transactions participate

### Locking

A **lock** is a variable associated with a data item that describes the status of the data item with respect to operations that can be applied to it.

- Data items may be at a variety of **granularities**: DB, table, tuple, attribute, etc.
- Locks are used to **synchronise access** by concurrent transactions

There are two main types:

1. **Binary lock**
2. **Read/Write lock**

#### Binary Lock

A binary lock can have only two states: **locked** and **unlocked**.

Two operations are used:

| Operation     | Description                |
| ------------- | -------------------------- |
| `lock_item`   | Request a lock on the item |
| `unlock_item` | Release the lock           |

Each transaction locks the item **before** using it, and **unlocks** it when finished.

> Binary locking is **rarely used** because it is too restrictive:
>
> - At most, **one transaction** can access each item
> - Several transactions should be able to access a data item **concurrently for read access**

#### Read/Write Lock

If multiple transactions want to **read** an item, they can access it **concurrently** — read operations are **not conflicting**.

However, if a transaction is to **write** an item, it must have **exclusive access**.

Three locking operations:

| Operation    | Description                       |
| ------------ | --------------------------------- |
| `read_lock`  | Acquire a shared (read) lock      |
| `write_lock` | Acquire an exclusive (write) lock |
| `unlock`     | Release the lock                  |

| Lock Type        | Also Known As  | Behaviour                                       |
| ---------------- | -------------- | ----------------------------------------------- |
| **Read-locked**  | Shared lock    | Allows other transactions to also read the item |
| **Write-locked** | Exclusive lock | Only a single transaction has access            |

#### Lock Conversion

A transaction may need to **upgrade** or **downgrade** a lock (e.g., from read to write, or write to read). This is called **lock conversion**.

---

### Two-Phase Locking (2PL)

The **Two-Phase Locking** protocol ensures serializability. Every transaction's lock operations can be divided into two phases:

| Phase               | Behaviour                                                        |
| ------------------- | ---------------------------------------------------------------- |
| **Growing Phase**   | The transaction may **acquire** locks but **cannot release** any |
| **Shrinking Phase** | The transaction may **release** locks but **cannot acquire** any |

> Once a transaction releases any lock, it enters the shrinking phase and cannot acquire further locks.

**Theorem:** Any schedule resulting from 2PL is **conflict-serializable**.

#### Problems & Limitations

Two-Phase Locking, while guaranteeing serializability, has two major problems:

1. **Deadlock** — two or more transactions wait forever for locks held by each other
2. **Starvation** — some transactions may be delayed indefinitely

---

### Deadlock

A **deadlock** occurs when two or more transactions are **permanently blocked**, each waiting for a lock held by another transaction in the group.

#### Deadlock Prevention Protocols

Prevention protocols avoid deadlocks by ensuring that deadlock conditions **cannot arise**.

##### No-Waiting

A transaction **never waits** for a lock:

- If the requested lock is not immediately available, the transaction **aborts** (rolls back)
- The aborted transaction can **restart** later

> **Trade-off:** Simple, but may cause unnecessary rollbacks and wasted work.

##### Wait-Die

A **timestamp-based** scheme where older transactions **wait** for younger ones, and younger transactions **die** (abort) when requesting locks held by older ones.

| Scenario                                                | Action                                               |
| ------------------------------------------------------- | ---------------------------------------------------- |
| **Older** transaction requests lock held by **younger** | **Wait** — older transaction waits                   |
| **Younger** transaction requests lock held by **older** | **Die** — younger transaction aborts, restarts later |

> Older transactions have priority. A younger transaction is rolled back preemptively.

##### Wound-Wait

The **opposite** of Wait-Die — older transactions **preempt** younger ones.

| Scenario                                                | Action                                                           |
| ------------------------------------------------------- | ---------------------------------------------------------------- |
| **Older** transaction requests lock held by **younger** | **Wound** — older transaction aborts the younger one, then waits |
| **Younger** transaction requests lock held by **older** | **Wait** — younger transaction waits                             |

> Older transactions have priority. An older transaction "wounds" (forces rollback of) a younger holder.

##### Wait-Die vs. Wound-Wait Summary

|                                   | Wait-Die                  | Wound-Wait                  |
| --------------------------------- | ------------------------- | --------------------------- |
| **Older requests younger's lock** | Older **waits**           | Older **wounds** (preempts) |
| **Younger requests older's lock** | Younger **dies** (aborts) | Younger **waits**           |
| **Deadlock possibility**          | None (no cycles possible) | None (no cycles possible)   |

##### Cautious Waiting

A transaction **waits** for a lock, but only if the lock is held by an **older** transaction. If held by a younger transaction, the requesting transaction **aborts**.

> Combines elements of both Wait-Die and Wound-Wait.

#### Deadlock Detection

Instead of preventing deadlocks, **detect** them after they occur:

1. Maintain a **wait-for graph** where nodes are transactions and edges represent "waits for" relationships
2. Periodically check for **cycles** in the graph
3. If a cycle is found, **select a victim** transaction to abort
4. The victim is rolled back and the waiting transaction can proceed

> **Trade-off:** Allows more concurrency than prevention, but detection overhead and victim selection add complexity.

---

### Starvation

**Starvation** occurs when a transaction is **delayed indefinitely** — it never gets access to the resources it needs, even though it is not in a deadlock.

This can happen when:

- A transaction is **consistently chosen as a victim** for rollback
- A transaction **waits forever** for locks held by a steady stream of other transactions

#### Starvation Solutions

- **Age-based priority** — older waiting transactions get priority (used in Wait-Die / Wound-Wait)
- **Timeout** — if a transaction waits longer than a threshold, abort it
- **Fair queuing** — enforce FIFO ordering for lock requests
- **Limit retries** — cap the number of times a transaction can be rolled back

---

### Timestamp Ordering

**Timestamp Ordering** is a concurrency control protocol that assigns a unique **timestamp** to each transaction based on its start time.

The protocol ensures that transactions are processed in **timestamp order**, maintaining serializability without using locks.

> Each data item maintains the **read-timestamp** and **write-timestamp** — the timestamps of the most recent read and write operations.

---

## Summary

| Topic                    | Key Points                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------- |
| **Transaction**          | Logical unit of processing; commit or rollback                                                     |
| **Properties / Failure** | ACID: Atomicity, Consistency, Isolation, Durability                                                |
| **Concurrency Control**  | Prevents lost updates, dirty reads, incorrect summaries                                            |
| **Schedules**            | Serial vs. non-serial; serializability ensures correctness                                         |
| **Serial Schedules**     | Correct but limit concurrency                                                                      |
| **Schedule Conflicts**   | Different transactions, same item, at least one write                                              |
| **Result Equivalence**   | Same final DB state                                                                                |
| **Conflict Equivalence** | Same order of conflicting operations                                                               |
| **Locking**              | Binary (rare), Read/Write (shared/exclusive)                                                       |
| **Binary Lock**          | Locked / Unlocked; too restrictive                                                                 |
| **Read/Write Lock**      | Shared (read) and Exclusive (write) modes                                                          |
| **Lock Conversion**      | Upgrading or downgrading lock modes                                                                |
| **Two-Phase Locking**    | Growing phase (acquire only) → Shrinking phase (release only); guarantees conflict serializability |
| **Deadlock**             | Circular wait for locks                                                                            |
| **Deadlock Prevention**  | No-Waiting, Wait-Die, Wound-Wait, Cautious Waiting                                                 |
| **Deadlock Detection**   | Wait-for graph + cycle detection                                                                   |
| **Starvation**           | Indefinite delay; solved via age-based priority, timeouts, fair queuing                            |
| **Timestamp Ordering**   | Lock-free protocol using transaction timestamps to enforce serializability                         |

---

_End of lecture — CSU34041 Transactions and Concurrency Control_
