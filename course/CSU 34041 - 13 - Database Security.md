# CSU34041 — Database Security

**Lecturer:** Yvette Graham  
**Email:** ygraham@tcd.ie

---

## Overview

- Integrity v Security
- Access Control
- Discretionary Access Control
- Mandatory Access Control
- Discretionary v Mandatory Access Control
- Role-based Access Control

---

## Recall from Previous Lecture

---

## Integrity vs Security

Integrity and Security are related but they are **not the same**.

| **Integrity**                          | **Security**                           |
| -------------------------------------- | -------------------------------------- |
| Concerned with _accidental_ corruption | Concerned with _deliberate_ corruption |

| **Integrity**         | **Security**      |
| --------------------- | ----------------- |
| Integrity Constraints | Security Policies |
|                       | Access Control    |

---

## Access Control

Prevent unauthorised persons from accessing the system:

- To obtain information
- To make malicious changes

A DBMS can restrict access to the database through:

- User Accounts
- Privileges
- Security Levels

---

## Access Control Responsibilities

The **Database Administrator (DBA)** is responsible for:

- **User Account Creation**
  - Encrypted table maintained by the DBMS
- **Privilege Granting and Revocation**
  - Discretionary Access Control
- **Security Level Assignment**
  - Mandatory Access Control
  - Role-Based Access

---

## Discretionary Access Control

---

## Privileges

Access privileges can be specified at two levels:

### Account Level

The DBA can specify the privileges that each account holds **independently** of the relations in the database.

### Relation Level

The DBA can control privilege to access each individual relation or view in the database.

---

## Account Level Privileges

These privileges apply to the capabilities provided to an account.

**Examples:**

- `CREATE SCHEMA`
- `CREATE TABLE`
- `CREATE VIEW`
- `ALTER`
- `DROP`

---

## Relation Level Privileges

Can be specified on **entire relations** or **specific attributes** — determining what operations can be performed.

- Each relation has an **"owner"** — typically the account that created the table.
- The owner controls the **granting** and **revoking** of privileges to other accounts for that table.

### Privilege Types

| Privilege        | Description                                                                             |
| ---------------- | --------------------------------------------------------------------------------------- |
| **Read**         | Gives the ability to use `SELECT` to retrieve rows from the relation                    |
| **Modification** | Gives the ability to use `INSERT`, `UPDATE` and `DELETE` to modify rows in the relation |
| **Reference**    | Gives the ability to refer to this relation when specifying integrity constraints       |

---

## Views

Views are an important **discretionary authorisation mechanism**.

They allow the owner of a relation(s) to grant **partial access** to the information contained in that relation:

- Access to a restricted set of **attributes**
- Access to a restricted set of **rows**

A view acts as a **new relation** in the database.

### Creating a View

A view is created from a query using `CREATE VIEW`:

```sql
CREATE VIEW PopularBooks AS
SELECT ISBN, Title, Author, PublishDate
FROM Books
WHERE IsPopular = 1;
```

---

## Granting Privileges

Privileges are allocated to users using the `GRANT` command in SQL:

```sql
GRANT privilege TO user;
GRANT privilege ON relation TO user;
```

### Relation Owner

- Automatically has **all** relation privileges granted to them.
- Can use the `GRANT` command to specify user privileges for that relation.

---

## Revoking Privileges

It is often desirable to remove a privilege from a particular user:

- Temporary access
- Abuse of privilege

In SQL, the `REVOKE` command is used to cancel privileges:

```sql
REVOKE privilege FROM user;
REVOKE privilege ON relation FROM user;
```

---

## Propagation of Privileges

Whenever the owner **A** of a relation **R** grants privileges on **R** to another user **B**, the privilege can be given **with** or **without** the `GRANT OPTION`.

- If the `GRANT OPTION` is given, then **B** can also grant that privilege on **R** to other users.

```sql
GRANT privilege ON relation TO user WITH GRANT OPTION;
```

---

## Dangers of Propagation

**Scenario 1 — Privileges propagate without the owner's knowledge:**

1. **A** (owner of relation **R**) grants **B** the `DELETE` privilege on **R**, _with_ `GRANT OPTION`
2. **B** grants **C** the `DELETE` privilege on **R**, also _with_ `GRANT OPTION`
3. Privileges propagate without the knowledge of the relation owner
4. If **A** revokes the privilege granted to **B**, all privileges that **B** propagated should be automatically revoked by the DBMS

**Scenario 2 — Revocation does not cascade when paths overlap:**

1. **A** (owner of relation **R**) grants **B** the `DELETE` privilege on **R**, _with_ `GRANT OPTION`
2. **A** grants **C** the `DELETE` privilege on **R**, also _with_ `GRANT OPTION`
3. **B** and **C** both grant **D** the `DELETE` privilege on **R**
4. **B** later revokes the `DELETE` privilege from **D**
5. **D** continues to have the `DELETE` privilege — it was also granted by **C**

---

## Example — Step 1: Create Accounts

A DBA creates four user accounts: **James**, **Victoria**, **Henry** and **George**.

The DBA only wants James to be able to create relations in the database:

```sql
GRANT CREATE TABLE TO James;
```

James now has the ability to create tables — but he does **not** have the ability to grant `CREATE TABLE` to other users.

---

## Example — Step 2: Grant Without Propagation

James wants to grant **Henry** the ability to **insert**, **retrieve** and **delete** rows in both tables.

He does **not** want Henry to be able to pass this ability on to other users.

```sql
GRANT INSERT, SELECT, DELETE ON Land, Lords TO Henry;
```

---

## Example — Step 3: Grant With Propagation

James wants to grant **Victoria** the ability to **retrieve** information from either table.

He also trusts her to pass on this ability to other users of the database.

```sql
GRANT SELECT ON Land, Lords TO Victoria WITH GRANT OPTION;
```

---

## Example — Step 4: Propagation

Victoria can now propagate this privilege to other user accounts using `GRANT`.

She wants to grant **George** the ability to retrieve information from the **Lords** table:

```sql
GRANT SELECT ON Lords TO George;
```

---

## Example — Step 5: Revoke

James decides to revoke the `SELECT` privilege on **Lords** from Victoria.

```sql
REVOKE SELECT ON Lords FROM Victoria;
```

The DBMS must now automatically revoke the `SELECT` privilege from **George**, as it was granted to him by Victoria, who no longer has the privilege.

---

## Example — Step 6: Views for Fine-Grained Access

James feels a bit bad and wants to give Victoria back the ability to see the **Lords** information.

- He also wants Victoria to be able to propagate this privilege again.
- However, he only wants her to be able to see:
  - `Name`, `Age` and `Address`
  - Lords who received the **"Victoria Cross"**

**How does he achieve this?**

---

## Example — Step 7: Create a View

James creates a view on the **Lords** table:

```sql
CREATE VIEW Lords_Restricted AS
SELECT Name, Age, Address
FROM Lords
WHERE Decoration = 'Victoria Cross';
```

After the view is created, James grants `SELECT` to Victoria:

```sql
GRANT SELECT ON Lords_Restricted TO Victoria WITH GRANT OPTION;
```

---

## Example — Step 8: Attribute-Level Privileges

James wants to grant **Henry** the ability to **update** the `Salary` field in the **Lords** table:

```sql
GRANT UPDATE (Salary) ON Lords TO Henry;
```

- `UPDATE` and `INSERT` are examples of privileges that can be specified on **attribute(s)**.
- `DELETE` and `SELECT` are **not** attribute-specific — that functionality is handled using **Views**.

---

## Mandatory Access Control

---

## What is MAC?

**Mandatory Access Control (MAC)** classifies data and users based upon **security levels**.

- Can be combined with discretionary access control
- Desirable in government, military and intelligence contexts

> MAC is **not** commonly available in commercial DBMS. Some companies (e.g. Oracle) have released special versions of DBMS for government which include MAC.

---

## Security Levels

The most simple example of security levels:

```
Top Secret ≥ Secret ≥ Confidential ≥ Unclassified
     TS  ≥   S   ≥      C      ≥      U
```

Each **subject** and **object** are given a security level:

| Term        | Description                         | Examples                                    |
| ----------- | ----------------------------------- | ------------------------------------------- |
| **Subject** | The active entity requesting access | User account, application program           |
| **Object**  | The passive entity being accessed   | Relation, tuple, attribute, view, operation |

The security level of the subject is **compared** with that of the object for the DBMS to decide if the action is permitted.

---

## Discretionary v Mandatory Access Control

| **Discretionary Access Control**       | **Mandatory Access Control** |
| -------------------------------------- | ---------------------------- |
| Flexible                               | Rigid                        |
| Complex to manage                      | Very secure                  |
| Can be vulnerable to malicious attacks |                              |

**Trade-off:** Security vs. Applicability

---

## Role-based Access Control

---

## Role-based Access Control (RBAC)

- Privileges and other permissions are associated with **organisational roles** rather than individual user accounts.
- Users are then assigned to appropriate roles.

### Creating Roles in SQL

```sql
CREATE ROLE
DESTROY ROLE
```

### Assigning Privileges and Users

- `GRANT` and `REVOKE` are used to allocate privileges to the created roles.
- Users are allocated to roles:

```sql
GRANT role TO user1;
```

- Multiple individuals can be assigned to each role.
- Any individual assigned to a role automatically has the privileges associated with that role.
- An individual can be assigned to **multiple roles**.

---

## Security of Databases

Ensuring security for large databases is an important and difficult task.

Many different issues are involved: legal, social, ethical, etc.

### General Data Protection Regulations (GDPR)

Most countries have GDPR, which requires holders of personal information to take **reasonable precautions** to ensure that there is **no unauthorised access** to the data.

---

## Practice Problem — Database Security

Consider the **EMPLOYEE** relational database schema. Suppose that all the relations were created by (and hence are owned by) user **X**, who wants to grant the following privileges to user accounts **A**, **B**, **C**, **D** and **E**:

| Account | Privileges Required                                                                                                                          |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **A**   | Can retrieve or modify any relation **except** `DEPENDENT`. Can grant any of these privileges to other users.                                |
| **B**   | Can retrieve all attributes of `EMPLOYEE` and `DEPARTMENT` **except** `SALARY`, `MGRSSN`, and `MGRSTARTDATE`.                                |
| **C**   | Can retrieve or modify `WORKS_ON`. Can only retrieve `FNAME`, `MINIT`, `LNAME`, `SSN` from `EMPLOYEE` and `PNAME`, `PNUMBER` from `PROJECT`. |
| **D**   | Can retrieve any attribute of `EMPLOYEE` or `DEPENDENT` and can modify `DEPENDENT`.                                                          |
| **E**   | Can retrieve any attribute of `EMPLOYEE` but **only** for tuples where `DNO = 3`.                                                            |

**Write SQL statements to grant these privileges. Use views where appropriate.**

---
