export type Question = {
  id: number;
  category: string;
  question: string;
  options: string[];
  correct: number; // index of correct answer (0-3)
  explanation: string;
  diagram?: string; // mermaid diagram syntax
  diagramType?: "erDiagram" | "graph TD" | "graph LR" | "sequenceDiagram";
};

export const quizQuestions: Question[] = [
  // ── Database Security & Access Control ──────────────────────────
  {
    id: 1,
    category: "Database Security",
    question:
      "A database administrator grants SELECT and UPDATE to user1, grants SELECT to user2, then revokes SELECT from user1. What happens to user1's privileges?",
    options: [
      "user1 loses both SELECT and UPDATE privileges",
      "user1 retains UPDATE but loses SELECT",
      "user1 retains both privileges due to dependency",
      "user1 cannot perform any operations until privileges are reassigned",
    ],
    correct: 1,
    explanation:
      "In SQL, GRANT and REVOKE operate on individual privileges, not as a grouped bundle. Each privilege is tracked and managed independently. REVOKE SELECT removes only the SELECT privilege; UPDATE is unaffected because it was granted separately.",
    diagram: `graph LR
  DBA["Database Admin"] -->|GRANT SELECT, UPDATE| user1
  DBA -->|GRANT SELECT| user2
  DBA -->|REVOKE SELECT| user1
  style DBA fill:#2d3436,stroke:#dfe6e9,color:#dfe6e9
  style user1 fill:#6c5ce7,stroke:#dfe6e9,color:#fff
  style user2 fill:#6c5ce7,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph LR",
  },
  {
    id: 2,
    category: "Database Security",
    question: "Which SQL command category includes GRANT and REVOKE?",
    options: [
      "Data Manipulation Language (DML)",
      "Data Definition Language (DDL)",
      "Data Control Language (DCL)",
      "Data Query Language (DQL)",
    ],
    correct: 2,
    explanation:
      "Data Control Language (DCL) includes GRANT and REVOKE — commands that control access and permissions. DDL covers CREATE/ALTER/DROP, DML covers INSERT/UPDATE/DELETE, and DQL covers SELECT.",
    diagram: `graph LR
  SQL["SQL Commands"] --> DDL[DDL: CREATE/ALTER/DROP]
  SQL --> DML[DML: INSERT/UPDATE/DELETE]
  SQL --> DQL[DQL: SELECT]
  SQL --> DCL[DCL: GRANT/REVOKE]
  style DCL fill:#6c5ce7,stroke:#dfe6e9,color:#fff
  style SQL fill:#2d3436,stroke:#dfe6e9,color:#dfe6e9`,
    diagramType: "graph LR",
  },

  // ── Concurrency Control ─────────────────────────────────────────
  {
    id: 3,
    category: "Concurrency Control",
    question: "Consider the schedule: R1(X), R2(X), W1(X), W2(X). Which statement is correct?",
    options: [
      "The schedule is conflict-serializable",
      "The schedule is view-serializable but not conflict-serializable",
      "The schedule is not serializable",
      "The schedule is strict",
    ],
    correct: 2,
    explanation:
      "The precedence graph contains edges T1→T2 (from R1,W2 and W1,W2 conflicts) and T2→T1 (from R2,W1 conflict), forming a cycle. Therefore, the schedule is neither conflict-serializable nor view-serializable.",
    diagram: `graph LR
  T1["T1"] -->|R1(X), W2(X)| T2["T2"]
  T2 -->|R2(X), W1(X)| T1
  style T1 fill:#e17055,stroke:#dfe6e9,color:#fff
  style T2 fill:#00b894,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph LR",
  },
  {
    id: 4,
    category: "Concurrency Control",
    question:
      "Under Strict Two-Phase Locking (Strict 2PL), T1 and T2 execute as follows: T1 acquires S-lock on X, T2 acquires S-lock on Y, T1 upgrades to X-lock on X, T2 upgrades to X-lock on Y, T1 requests lock on Y, T2 requests lock on X. What happens?",
    options: [
      "Both transactions complete successfully",
      "A deadlock occurs between T1 and T2",
      "One transaction is rolled back due to dirty reads",
      "The schedule is serializable without blocking",
    ],
    correct: 1,
    explanation:
      "T1 holds X-exclusive and waits for Y (held by T2). T2 holds Y-exclusive and waits for X (held by T1). This is a circular wait — a classic deadlock. In Strict 2PL, locks are held until commit/abort, so neither can release to unblock the other.",
    diagram: `graph LR
  T1["T1"] -->|holds X| Xlock["X: Exclusive"]
  T2["T2"] -->|holds Y| Ylock["Y: Exclusive"]
  T1 -.->|waits| Ylock
  T2 -.->|waits| Xlock
  style T1 fill:#e17055,stroke:#dfe6e9,color:#fff
  style T2 fill:#00b894,stroke:#dfe6e9,color:#fff
  style Xlock fill:#d63031,stroke:#dfe6e9,color:#fff
  style Ylock fill:#d63031,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph LR",
  },
  {
    id: 5,
    category: "Concurrency Control",
    question:
      "Wait-Die scheme: T1 (TS=1, oldest), T2 (TS=2), T3 (TS=3, youngest). T2 acquires X, T3 acquires Y, T1 requests X, T2 requests Y, T3 requests X. What happens?",
    options: ["T1 aborts", "T3 aborts", "T1 waits, T3 aborts", "T2 aborts"],
    correct: 2,
    explanation:
      "Wait-Die: older transactions wait, younger transactions die (abort). T1 (TS=1, older than T2) waits for X — allowed. T3 (TS=3, younger than T2) requests X held by T2 — T3 dies/aborts because it is younger.",
    diagram: `graph TD
  T1["T1 TS=1"] -->|older| W1[WAITS for X]
  T3["T3 TS=3"] -->|younger| D1[DIES/ABORTS]
  T2["T2 TS=2"] -->|holds X| HeldX[Lock on X]
  T2 -->|holds Y| HeldY[Lock on Y]
  style T1 fill:#00b894,stroke:#dfe6e9,color:#fff
  style T2 fill:#6c5ce7,stroke:#dfe6e9,color:#fff
  style T3 fill:#d63031,stroke:#dfe6e9,color:#fff
  style W1 fill:#00b894,stroke:#dfe6e9,color:#fff
  style D1 fill:#d63031,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph TD",
  },
  {
    id: 6,
    category: "Concurrency Control",
    question: "Same scenario but using Wound-Wait scheme. What happens?",
    options: ["T1 waits", "T2 aborts", "T3 aborts", "T2 waits"],
    correct: 1,
    explanation:
      "Wound-Wait: older transactions wound (abort) younger holders, younger transactions wait. T1 (TS=1, older than T2) wounds T2 (holder of X). T2 is aborted. T3 (TS=3, younger than T1) waits for X — younger must wait.",
    diagram: `graph TD
  T1["T1 TS=1"] -->|older wounds| T2["T2 TS=2"]
  T2 -->|wounded| ABORT[ABORTED]
  T3["T3 TS=3"] -->|younger| WAIT[WAITS for X]
  style T1 fill:#00b894,stroke:#dfe6e9,color:#fff
  style T2 fill:#d63031,stroke:#dfe6e9,color:#fff
  style T3 fill:#6c5ce7,stroke:#dfe6e9,color:#fff
  style ABORT fill:#d63031,stroke:#dfe6e9,color:#fff
  style WAIT fill:#636e72,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph TD",
  },
  {
    id: 7,
    category: "Concurrency Control",
    question: "What is a deadlock?",
    options: [
      "A transaction is delayed indefinitely",
      "Two or more transactions are permanently blocked, each waiting for a lock held by another",
      "A transaction reads uncommitted data from another",
      "Two transactions try to write to the same data item",
    ],
    correct: 1,
    explanation:
      "A deadlock occurs when two or more transactions are permanently blocked, each waiting for a lock held by another transaction in the group. This is distinct from starvation (indefinite delay) and dirty reads (reading uncommitted data).",
    diagram: `graph LR
  T1["T1"] -->|waits for| L2["Lock held by T2"]
  T2["T2"] -->|waits for| L1["Lock held by T1"]
  style T1 fill:#d63031,stroke:#dfe6e9,color:#fff
  style T2 fill:#d63031,stroke:#dfe6e9,color:#fff
  style L1 fill:#e17055,stroke:#dfe6e9,color:#fff
  style L2 fill:#e17055,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph LR",
  },

  // ── NoSQL vs Relational ─────────────────────────────────────────
  {
    id: 8,
    category: "NoSQL",
    question:
      "Which scenario BEST justifies using a document-oriented NoSQL database over a relational database?",
    options: [
      "Strong ACID guarantees are required for financial transactions",
      "Data schema is fixed and highly normalised",
      "Frequent schema evolution with nested, semi-structured data",
      "Complex joins across multiple tables are required",
    ],
    correct: 2,
    explanation:
      "Document-oriented databases (MongoDB, CouchDB) store self-describing documents (JSON/BSON). Their key advantages: schema flexibility (documents can have different structures), nested data (objects and arrays natively), and handling semi-structured data with irregular structure.",
    diagram: `graph LR
  RDBMS["Relational DB"] -->|Best for| Fixed["Fixed schema + joins"]
  NoSQL["Document DB"] -->|Best for| Flexible["Schema evolution + nested data"]
  style RDBMS fill:#636e72,stroke:#dfe6e9,color:#fff
  style NoSQL fill:#6c5ce7,stroke:#dfe6e9,color:#fff
  style Fixed fill:#e17055,stroke:#dfe6e9,color:#fff
  style Flexible fill:#00b894,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph LR",
  },
  {
    id: 9,
    category: "NoSQL",
    question: "What does BASE stand for in NoSQL systems?",
    options: [
      "Basic Availability, Soft-state, Eventual consistency",
      "Binary Access, Standard Encoding, Atomic execution",
      "Broad Application, Scalable Environment, Fast execution",
      "Built-in Analytics, Schema enforcement, ACID execution",
    ],
    correct: 0,
    explanation:
      "BASE: Basic Availability (application works basically all the time), Soft-state (does not have to be consistent all the time), Eventual consistency (will be in a known state eventually). This contrasts with ACID properties of relational databases.",
    diagram: `graph LR
  ACID["ACID (Relational)"] --> A[Atomicity]
  ACID --> C[Consistency]
  ACID --> I[Isolation]
  ACID --> D[Durability]
  BASE["BASE (NoSQL)"] --> B[Basic Availability]
  BASE --> S[Soft-state]
  BASE --> E[Eventual consistency]
  style ACID fill:#636e72,stroke:#dfe6e9,color:#fff
  style BASE fill:#6c5ce7,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph LR",
  },
  {
    id: 10,
    category: "NoSQL",
    question: "What does the CAP theorem state?",
    options: [
      "All three properties can be guaranteed simultaneously",
      "Only 2 of 3 can be guaranteed: Consistency, Availability, Partition Tolerance",
      "A database must be both consistent and available at all times",
      "Partition tolerance is optional in distributed systems",
    ],
    correct: 1,
    explanation:
      "The CAP theorem states that a distributed system can guarantee at most 2 of 3: Consistency (all nodes see same data), Availability (every request gets a response), and Partition Tolerance (system operates despite network failures). In practice, partition tolerance is non-negotiable, so trade-offs are between C and A.",
    diagram: `graph TD
  CAP["CAP Theorem"] --> C[Consistency<br/>All nodes see same data]
  CAP --> A[Availability<br/>Every request gets response]
  CAP --> P[Partition Tolerance<br/>Operates despite failures]
  CAP -.->|Choose 2 of 3| Tradeoff["Trade-off"]
  style CAP fill:#2d3436,stroke:#dfe6e9,color:#dfe6e9
  style C fill:#6c5ce7,stroke:#dfe6e9,color:#fff
  style A fill:#00b894,stroke:#dfe6e9,color:#fff
  style P fill:#e17055,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph TD",
  },

  // ── SQL & Relational Algebra ────────────────────────────────────
  {
    id: 11,
    category: "SQL",
    question:
      "Given table Orders(order_id, customer_id, amount), which query returns customers whose total order amount exceeds 1000?",
    options: [
      "SELECT customer_id FROM Orders WHERE SUM(amount) > 1000;",
      "SELECT customer_id FROM Orders GROUP BY customer_id HAVING SUM(amount) > 1000;",
      "SELECT customer_id FROM Orders WHERE amount > 1000;",
      "SELECT DISTINCT customer_id FROM Orders HAVING SUM(amount) > 1000;",
    ],
    correct: 1,
    explanation:
      "GROUP BY aggregates orders per customer, SUM(amount) computes totals per group, and HAVING filters groups (not individual rows). WHERE cannot use aggregate functions — it evaluates before grouping. DISTINCT without GROUP BY is meaningless here.",
    diagram: `graph LR
  Orders["Orders table"] -->|GROUP BY| Grouped["Per-customer groups"]
  Grouped -->|SUM(amount)| Totals["Customer totals"]
  Totals -->|HAVING > 1000| Result["Customers with >1000"]
  style Orders fill:#636e72,stroke:#dfe6e9,color:#fff
  style Grouped fill:#6c5ce7,stroke:#dfe6e9,color:#fff
  style Totals fill:#00b894,stroke:#dfe6e9,color:#fff
  style Result fill:#d63031,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph LR",
  },
  {
    id: 12,
    category: "Relational Algebra",
    question: "Which relational algebra operator eliminates duplicates automatically?",
    options: ["SELECT (σ)", "PROJECT (π)", "UNION (∪)", "JOIN (⋈)"],
    correct: 1,
    explanation:
      "PROJECT (π) automatically eliminates duplicates — this is the key difference from SQL SELECT which requires DISTINCT to achieve the same effect. SELECT (σ) filters rows but preserves duplicates.",
    diagram: `graph LR
  R["Relation R"] -->|π(A,B)| P["π(A,B)(R)<br/>(duplicates removed)"]
  R -->|σ(condition)| S["σ(R)<br/>(rows filtered)"]
  style R fill:#636e72,stroke:#dfe6e9,color:#fff
  style P fill:#6c5ce7,stroke:#dfe6e9,color:#fff
  style S fill:#00b894,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph LR",
  },
  {
    id: 13,
    category: "Relational Algebra",
    question: "What is the SQL equivalent of the relational algebra operation R − S (difference)?",
    options: [
      "SELECT ... EXCEPT SELECT ...",
      "SELECT ... INTERSECT SELECT ...",
      "SELECT ... UNION SELECT ...",
      "SELECT ... FROM R, S WHERE condition",
    ],
    correct: 0,
    explanation:
      "R − S returns tuples in R but not S. The SQL equivalent is EXCEPT (also called MINUS in some databases). INTERSECT is for R ∩ S, UNION is for R ∪ S, and the FROM/WHERE pattern is for JOIN.",
    diagram: `graph LR
  R["Set R"] -->|−| S["Set S"]
  S -->|R − S| Result["Tuples in R<br/>but not in S"]
  style R fill:#6c5ce7,stroke:#dfe6e9,color:#fff
  style S fill:#e17055,stroke:#dfe6e9,color:#fff
  style Result fill:#00b894,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph LR",
  },

  // ── GDPR ────────────────────────────────────────────────────────
  {
    id: 14,
    category: "GDPR",
    question: "Under GDPR, which is a lawful basis for processing personal data?",
    options: [
      "Data is publicly available",
      "User consent has been explicitly obtained",
      "The company benefits financially",
      "Data is anonymised after processing",
    ],
    correct: 1,
    explanation:
      "GDPR Article 6(1) specifies six lawful bases: consent, contract performance, legal obligation, vital interests, public task, and legitimate interests. Explicit consent must be freely given, specific, informed, and unambiguous. Public availability, financial benefit, and post-processing anonymisation are NOT lawful bases.",
    diagram: `graph TD
  GDPR["GDPR Article 6 Lawful Bases"]
  GDPR --> C1[Consent]
  GDPR --> C2[Contract]
  GDPR --> C3[Legal Obligation]
  GDPR --> C4[Vital Interests]
  GDPR --> C5[Public Task]
  GDPR --> C6[Legitimate Interests]
  style GDPR fill:#2d3436,stroke:#dfe6e9,color:#dfe6e9
  style C1 fill:#6c5ce7,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph TD",
  },
  {
    id: 15,
    category: "GDPR",
    question:
      "An Irish e-commerce company obtains consent, later uses data for advertising (with updated consent), receives an erasure request, but deletes only from the main database while retaining data in backups and analytics datasets. What is the GDPR assessment?",
    options: [
      "The company is compliant because consent was obtained and updated",
      "The company is non-compliant due to unlawful processing and incomplete erasure",
      "The company is compliant if data is only used internally",
      "The company is non-compliant because GDPR applies worldwide",
    ],
    correct: 1,
    explanation:
      "Article 17 (Right to be Forgotten) requires erasure of personal data from ALL copies and reproductions, including backups and analytics datasets. Simply deleting from the main database is insufficient. Backups may retain data until overwritten, but it must not be accessible or used.",
    diagram: `graph TD
  User["User Erasure Request"] -->|Article 17| Delete[Must erase ALL]
  Delete --> Main["Main DB ✓"]
  Delete --> Analytics["Analytics ✗<br/>(active use)"]
  Delete -.-> Backups["Backups<br/>(may retain until overwritten<br/>if not accessible/used]"]
  style User fill:#6c5ce7,stroke:#dfe6e9,color:#fff
  style Main fill:#00b894,stroke:#dfe6e9,color:#fff
  style Analytics fill:#d63031,stroke:#dfe6e9,color:#fff
  style Backups fill:#e17055,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph TD",
  },
  {
    id: 16,
    category: "GDPR",
    question: 'What is the definition of a "Data Controller" under GDPR?',
    options: [
      "A person who processes personal data on behalf of another",
      "A person, company, or body which decides the purposes and methods of processing personal data",
      "The software system that stores personal data",
      "A regulatory body that enforces GDPR compliance",
    ],
    correct: 1,
    explanation:
      "A Data Controller decides the purposes and methods of processing personal data. A Data Processor processes data on behalf of the controller. The controller bears primary responsibility for GDPR compliance.",
    diagram: `graph LR
  Controller["Data Controller<br/>(decides purpose/method)"] -->|directs| Processor["Data Processor<br/>(processes on behalf)"]
  Controller -->|processes| Data["Personal Data"]
  style Controller fill:#6c5ce7,stroke:#dfe6e9,color:#fff
  style Processor fill:#636e72,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph LR",
  },

  // ── Database Constraints ────────────────────────────────────────
  {
    id: 17,
    category: "Database Constraints",
    question:
      "Consider: ALTER TABLE Employees ADD CONSTRAINT chk_salary CHECK (salary > 0 AND salary < 100000). Which statement is TRUE?",
    options: [
      "The constraint is enforced only during insertion",
      "The constraint can be bypassed using transactions",
      "The constraint is enforced on both INSERT and UPDATE operations",
      "The constraint guarantees uniqueness of salary values",
    ],
    correct: 2,
    explanation:
      "CHECK constraints are enforced at the row level on every data modification (INSERT and UPDATE). They are enforced at the storage engine level and cannot be bypassed by application logic or transactions. Uniqueness is enforced by UNIQUE or PRIMARY KEY constraints, not CHECK.",
    diagram: `graph LR
  INSERT["INSERT"] -->|evaluates| CHECK{CHECK<br/>constraint}
  UPDATE["UPDATE"] -->|evaluates| CHECK
  CHECK -->|pass| ACCEPT["Row accepted"]
  CHECK -->|fail| REJECT["Row rejected"]
  style INSERT fill:#636e72,stroke:#dfe6e9,color:#fff
  style UPDATE fill:#636e72,stroke:#dfe6e9,color:#fff
  style ACCEPT fill:#00b894,stroke:#dfe6e9,color:#fff
  style REJECT fill:#d63031,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph LR",
  },
  {
    id: 18,
    category: "Database Constraints",
    question:
      "When a foreign key constraint is violated by a DELETE operation, which action propagates the change to referencing tuples?",
    options: ["SET NULL", "SET DEFAULT", "CASCADE", "REJECT"],
    correct: 2,
    explanation:
      "CASCADE propagates the change to referencing tuples — if the referenced row is deleted, all referencing foreign keys are also deleted. SET NULL sets FKs to NULL, SET DEFAULT sets them to a default value, and REJECT (default) simply rejects the operation.",
    diagram: `graph TD
  Parent["Parent row deleted"] -->|CASCADE| Children["Referencing rows<br/>also deleted"]
  Parent -->|SET NULL| RefNull["FK set to NULL"]
  Parent -->|SET DEFAULT| RefDefault["FK set to default"]
  Parent -->|REJECT| Blocked["Operation rejected"]
  style Parent fill:#636e72,stroke:#dfe6e9,color:#fff
  style Children fill:#d63031,stroke:#dfe6e9,color:#fff
  style RefNull fill:#e17055,stroke:#dfe6e9,color:#fff
  style RefDefault fill:#6c5ce7,stroke:#dfe6e9,color:#fff
  style Blocked fill:#636e72,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph TD",
  },

  // ── ER Modelling ────────────────────────────────────────────────
  {
    id: 19,
    category: "ER Modelling",
    question: "In an ER diagram, what does a double oval represent?",
    options: [
      "A key attribute",
      "A composite attribute",
      "A multi-valued attribute",
      "A derived attribute",
    ],
    correct: 2,
    explanation:
      "A double oval represents a multi-valued attribute (an attribute that can hold multiple values for a single entity instance, e.g., Genre for a Movie). Key attributes are underlined, composite attributes are connected by straight lines to their components, and derived attributes are typically shown with dashed outlines.",
    diagram: `erDiagram
  MOVIE {
    string title
    string synopsis
    string director
  }
  MOVIE ||--o{ GENRE : has
  style MOVIE fill:#636e72,stroke:#dfe6e9,color:#fff
  style GENRE fill:#6c5ce7,stroke:#dfe6e9,color:#fff`,
    diagramType: "erDiagram",
  },
  {
    id: 20,
    category: "ER Modelling",
    question:
      "In the university database scenario, a student can enrol in many modules and a module can have many students. What cardinality constraint is this, and how is it mapped to relational schema?",
    options: [
      '1:N — add FK to the "many" side table',
      "M:N — create a new junction table with composite PK",
      "1:1 — merge tables if both have total participation",
      "Recursive — add self-referencing FK",
    ],
    correct: 1,
    explanation:
      "M:N relationships are mapped to a new junction (associative entity) table containing foreign keys from both sides as a composite primary key. If the relationship has attributes (like enrolmentDate and grade), they become columns in the junction table.",
    diagram: `erDiagram
  STUDENT ||--o{ ENROLMENT : "enrols"
  MODULE ||--o{ ENROLMENT : "enrolled in"
  STUDENT {
    string studentID PK
    string name
  }
  MODULE {
    string moduleCode PK
    string title
  }
  ENROLMENT {
    string studentID PK, FK
    string moduleCode PK, FK
    date enrolmentDate
    string grade
  }
  style STUDENT fill:#636e72,stroke:#dfe6e9,color:#fff
  style MODULE fill:#636e72,stroke:#dfe6e9,color:#fff
  style ENROLMENT fill:#6c5ce7,stroke:#dfe6e9,color:#fff`,
    diagramType: "erDiagram",
  },
  {
    id: 21,
    category: "ER Modelling",
    question: "In ER modelling, what does a double line from an entity to a relationship indicate?",
    options: [
      "The entity has a multi-valued attribute",
      "Total participation (existence dependency)",
      "Partial participation",
      "The entity is a weak entity",
    ],
    correct: 1,
    explanation:
      "A double line indicates total participation — every entity instance MUST participate in the relationship (existence dependency). A single line indicates partial participation (some entities may participate, others may not).",
    diagram: `erDiagram
  MODULE ||--o{ STUDENT : "must enrol in"
  MODULE {
    string moduleCode PK
    string title
  }
  STUDENT {
    string studentID PK
    string name
  }
  style MODULE fill:#636e72,stroke:#dfe6e9,color:#fff
  style STUDENT fill:#00b894,stroke:#dfe6e9,color:#fff`,
    diagramType: "erDiagram",
  },

  // ── Normalisation ───────────────────────────────────────────────
  {
    id: 22,
    category: "Normalisation",
    question: "A relation is in 2NF if it is in 1NF and:",
    options: [
      "No non-key attribute is transitively dependent on the primary key",
      "Every determinant is a candidate identifier",
      "Every non-key attribute is fully functionally dependent on the entire primary key",
      "All attribute values are atomic",
    ],
    correct: 2,
    explanation:
      "2NF builds on 1NF (atomic values) by eliminating partial dependencies — every non-key attribute must depend on the ENTIRE primary key, not just part of it. 3NF additionally eliminates transitive dependencies. BCNF requires every determinant to be a candidate key.",
    diagram: `graph TD
  1NF["1NF<br/>Atomic values"] --> 2NF["2NF<br/>No partial dependency"]
  2NF --> 3NF["3NF<br/>No transitive dependency"]
  3NF --> BCNF["BCNF<br/>Every determinant is a key"]
  style 1NF fill:#636e72,stroke:#dfe6e9,color:#fff
  style 2NF fill:#6c5ce7,stroke:#dfe6e9,color:#fff
  style 3NF fill:#00b894,stroke:#dfe6e9,color:#fff
  style BCNF fill:#d63031,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph TD",
  },
  {
    id: 23,
    category: "Normalisation",
    question: "What is a functional dependency X → Y?",
    options: [
      "Y determines X uniquely",
      "For any two tuples with the same X values, they must have the same Y values",
      "X and Y are both primary keys",
      "X and Y are independent attributes",
    ],
    correct: 1,
    explanation:
      "X → Y means: for any two tuples t₁ and t₂, if t₁[X] = t₂[X], then t₁[Y] = t₂[Y]. X is the determinant (left-hand side), Y is the dependent (right-hand side). If X is a candidate key, then X → all attributes.",
    diagram: `graph LR
  R["Relation R"]
  R --> t1["t₁: X=10, Y=20, Z=30"]
  R --> t2["t₂: X=10, Y=20, Z=40"]
  R --> t3["t₃: X=20, Y=50, Z=60"]
  t1 -.->|same X| t2
  t1 -.->|same Y| t2
  style R fill:#636e72,stroke:#dfe6e9,color:#fff
  style t1 fill:#6c5ce7,stroke:#dfe6e9,color:#fff
  style t2 fill:#6c5ce7,stroke:#dfe6e9,color:#fff
  style t3 fill:#00b894,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph LR",
  },

  // ── Three-Level Architecture ────────────────────────────────────
  {
    id: 24,
    category: "Database Architecture",
    question:
      'In the three-level database architecture, which level describes "how data is physically stored" including indexes, compression, and encryption?',
    options: [
      "External (View) level",
      "Conceptual (Logical) level",
      "Internal (Physical) level",
      "Application level",
    ],
    correct: 2,
    explanation:
      "The Internal (Physical) level describes how data is physically stored — storage allocation, access paths (indexes), compression, and encryption. The Conceptual level describes what data is stored and relationships. The External level describes user-specific views.",
    diagram: `graph TD
  External["External Level<br/>(user views)"]
  Conceptual["Conceptual Level<br/>(logical structure)"]
  Internal["Internal Level<br/>(physical storage)"]
  External -.->|maps to| Conceptual
  Conceptual -.->|maps to| Internal
  style External fill:#636e72,stroke:#dfe6e9,color:#fff
  style Conceptual fill:#6c5ce7,stroke:#dfe6e9,color:#fff
  style Internal fill:#00b894,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph TD",
  },
  {
    id: 25,
    category: "Database Architecture",
    question: "What is metadata?",
    options: [
      "Data that has been backed up",
      "Data about data that adds context (type, name, size, restrictions)",
      "Data stored in the external view",
      "Encrypted data for security",
    ],
    correct: 1,
    explanation:
      "Metadata is data about data — it adds context such as data type, name, size, and restrictions. It is stored centrally in the catalog/data dictionary and is used by the DBMS to manage and interpret the actual data.",
    diagram: `graph LR
  Catalog["System Catalog<br/>(metadata)"] -->|describes| Data["Actual Data"]
  Catalog -->|stores| Types["Data types, sizes, restrictions"]
  style Catalog fill:#6c5ce7,stroke:#dfe6e9,color:#fff
  style Data fill:#636e72,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph LR",
  },

  // ── Transactions & ACID ─────────────────────────────────────────
  {
    id: 26,
    category: "Transactions",
    question: 'What does the "I" in ACID stand for?',
    options: ["Integrity", "Isolation", "Instantaneity", "Immutability"],
    correct: 1,
    explanation:
      "Isolation: a transaction appears to execute in isolation from other transactions. Even when transactions execute concurrently, the result should be equivalent to some serial execution. This is achieved through locking protocols like 2PL.",
    diagram: `graph LR
  T1["T1: R(A), W(A)"] -->|isolated| T2["T2: R(B), W(B)"]
  T1 -->|equivalent to| Serial["Serial: T1 then T2"]
  T2 -->|equivalent to| Serial
  style T1 fill:#6c5ce7,stroke:#dfe6e9,color:#fff
  style T2 fill:#00b894,stroke:#dfe6e9,color:#fff
  style Serial fill:#2d3436,stroke:#dfe6e9,color:#dfe6e9`,
    diagramType: "graph LR",
  },
  {
    id: 27,
    category: "Transactions",
    question: 'What is a "schedule" in the context of database transactions?',
    options: [
      "A backup plan for data recovery",
      "A sequence of operations from one or more transactions, executed in some order",
      "A predefined set of permissions for users",
      "A plan for normalising a database schema",
    ],
    correct: 1,
    explanation:
      "A schedule is a sequence of operations (reads and writes) from one or more transactions, executed in some order. Schedules can be serial (one transaction completely before another) or concurrent (operations interleaved). Serializability testing determines if a concurrent schedule is equivalent to a serial one.",
    diagram: `graph LR
  Serial["Serial Schedule<br/>T1 complete, then T2"] -->|vs| Concurrent["Concurrent Schedule<br/>T1 and T2 interleaved"]
  style Serial fill:#636e72,stroke:#dfe6e9,color:#fff
  style Concurrent fill:#6c5ce7,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph LR",
  },

  // ── ER to Relational Mapping ────────────────────────────────────
  {
    id: 28,
    category: "ER Mapping",
    question:
      "When mapping a 1:1 relationship from ER to relational schema, where should the foreign key be placed?",
    options: [
      "Preferably in the table with total participation",
      "Always in the first table alphabetically",
      "In a separate junction table",
      "In both tables",
    ],
    correct: 0,
    explanation:
      'For a 1:1 relationship, the FK is placed in the table with total participation (the "must have" side) to minimize nulls. A UNIQUE constraint is added on the FK to enforce the 1:1 cardinality. If both sides have total participation, either approach works.',
    diagram: `erDiagram
  DEPARTMENT ||--o| LECTURER : "heads"
  DEPARTMENT {
    string departmentName PK
    string officeLocation
    string headEmail FK UNIQUE
  }
  LECTURER {
    string email PK
    string name
  }
  style DEPARTMENT fill:#636e72,stroke:#dfe6e9,color:#fff
  style LECTURER fill:#6c5ce7,stroke:#dfe6e9,color:#fff`,
    diagramType: "erDiagram",
  },
  {
    id: 29,
    category: "ER Mapping",
    question: "How is a multi-valued attribute mapped in ER-to-relational conversion?",
    options: [
      "As a comma-separated string in the parent table",
      "Create a new table with FK + attribute, composite PK = {FK, attribute}",
      "As a JSON field in the parent table",
      "Duplicate the parent table",
    ],
    correct: 1,
    explanation:
      "A multi-valued attribute (e.g., a movie with multiple genres) is mapped to a new table containing the parent table's FK plus the multi-valued attribute. The composite primary key is {FK, attribute}, ensuring each value is unique per entity instance.",
    diagram: `erDiagram
  MOVIE ||--o{ GENRE : has
  MOVIE {
    string movieId PK
    string title
  }
  GENRE {
    string movieId PK, FK
    string genre PK
  }
  style MOVIE fill:#636e72,stroke:#dfe6e9,color:#fff
  style GENRE fill:#6c5ce7,stroke:#dfe6e9,color:#fff`,
    diagramType: "erDiagram",
  },

  // ── Functional Dependencies ─────────────────────────────────────
  {
    id: 30,
    category: "Functional Dependencies",
    question: "Given FDs: {A→B, B→C, A→C}, which is a transitive dependency?",
    options: [
      "A → B",
      "B → C (through A → B)",
      "A → C (direct)",
      "There are no transitive dependencies",
    ],
    correct: 1,
    explanation:
      "B → C is a transitive dependency through A → B → C. A transitive dependency exists when X → Y and Y → Z, meaning X → Z transitively. This is exactly what 3NF eliminates — no non-key attribute should be transitively dependent on the primary key.",
    diagram: `graph LR
  A["A"] -->|direct| B["B"]
  B -->|transitive| C["C"]
  A -.->|transitive| C
  style A fill:#6c5ce7,stroke:#dfe6e9,color:#fff
  style B fill:#e17055,stroke:#dfe6e9,color:#fff
  style C fill:#00b894,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph LR",
  },

  // ── Additional Security Questions ───────────────────────────────
  {
    id: 31,
    category: "Database Security",
    question: "Which of the following is NOT a type of integrity constraint?",
    options: [
      "Key constraint",
      "Entity integrity constraint",
      "Referential integrity constraint",
      "Transaction integrity constraint",
    ],
    correct: 3,
    explanation:
      'The three types of integrity constraints are: Key (no duplicate entries in key attributes), Entity Integrity (no NULL in primary key), and Referential Integrity (FK must reference existing tuple or be NULL). "Transaction integrity" is not a recognized constraint type.',
    diagram: `graph TD
  Integrity["Integrity Constraints"]
  Integrity --> Key["Key<br/>(no duplicates)"]
  Integrity --> Entity["Entity Integrity<br/>(no NULL in PK)"]
  Integrity --> Ref["Referential Integrity<br/>(FK → existing tuple)"]
  style Integrity fill:#2d3436,stroke:#dfe6e9,color:#dfe6e9
  style Key fill:#6c5ce7,stroke:#dfe6e9,color:#fff
  style Entity fill:#00b894,stroke:#dfe6e9,color:#fff
  style Ref fill:#e17055,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph TD",
  },
  {
    id: 32,
    category: "Database Security",
    question:
      "What concurrency problem occurs when one transaction reads data written by another that then rolls back?",
    options: ["Lost update", "Dirty read", "Incorrect summary", "Phantom read"],
    correct: 1,
    explanation:
      "A dirty read occurs when a transaction reads data that was written by another transaction which has not yet committed and subsequently rolls back. The reading transaction has now operated on data that never actually existed in the database.",
    diagram: `sequenceDiagram
  participant T1 as Transaction 1
  participant DB as Database
  participant T2 as Transaction 2
  T1->>DB: Write(X = 100)
  T2->>DB: Read(X) ← Dirty Read!
  DB-->>T2: X = 100
  T1->>DB: ROLLBACK
  Note over T2: T2 now has invalid data`,
    diagramType: "sequenceDiagram",
  },

  // ── Additional SQL Questions ────────────────────────────────────
  {
    id: 33,
    category: "SQL",
    question: "Which SQL command category includes CREATE, ALTER, and DROP?",
    options: [
      "Data Manipulation Language (DML)",
      "Data Definition Language (DDL)",
      "Data Query Language (DQL)",
      "Data Control Language (DCL)",
    ],
    correct: 1,
    explanation:
      "DDL (Data Definition Language) includes CREATE, ALTER, and DROP — commands that define and modify the database structure/schema. DML modifies data (INSERT/UPDATE/DELETE), DQL retrieves data (SELECT), and DCL controls access (GRANT/REVOKE).",
    diagram: `graph LR
  SQL["SQL"] --> DDL["DDL<br/>CREATE/ALTER/DROP"]
  SQL --> DML["DML<br/>INSERT/UPDATE/DELETE"]
  SQL --> DQL["DQL<br/>SELECT"]
  SQL --> DCL["DCL<br/>GRANT/REVOKE"]
  style DDL fill:#6c5ce7,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph LR",
  },

  // ── Additional Concurrency Questions ────────────────────────────
  {
    id: 34,
    category: "Concurrency Control",
    question: 'In Two-Phase Locking (2PL), what happens during the "shrinking phase"?',
    options: [
      "Only acquiring locks — cannot release any",
      "Only releasing locks — cannot acquire any",
      "Both acquiring and releasing locks freely",
      "No locks are held",
    ],
    correct: 1,
    explanation:
      "In 2PL, the growing phase allows only lock acquisitions (no releases). The shrinking phase allows only lock releases (no new acquisitions). Once a transaction enters the shrinking phase, it cannot acquire any new locks.",
    diagram: `graph LR
  Growing["Growing Phase<br/>Acquire only"] -->|first release| Shrinking["Shrinking Phase<br/>Release only"]
  Shrinking --> Commit["COMMIT"]
  style Growing fill:#6c5ce7,stroke:#dfe6e9,color:#fff
  style Shrinking fill:#e17055,stroke:#dfe6e9,color:#fff
  style Commit fill:#00b894,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph LR",
  },
  {
    id: 35,
    category: "Concurrency Control",
    question:
      "What concurrency problem occurs when one transaction calculates an aggregate while another updates the attributes being aggregated?",
    options: ["Lost update", "Dirty read", "Incorrect summary", "Non-repeatable read"],
    correct: 2,
    explanation:
      "An incorrect summary occurs when one transaction is computing an aggregate (SUM, COUNT, AVG) while another transaction is updating the underlying data. The aggregate result may be inconsistent because it is computed over an inconsistent snapshot of the data.",
    diagram: `graph LR
  T1["T1: SUM(salary)"] -->|reads| Rows["All salary rows"]
  T2["T2: UPDATE salary"] -->|modifies| Rows
  Rows -->|result| Bad["Incorrect summary<br/>inconsistent result"]
  style T1 fill:#6c5ce7,stroke:#dfe6e9,color:#fff
  style T2 fill:#e17055,stroke:#dfe6e9,color:#fff
  style Bad fill:#d63031,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph LR",
  },

  // ── Additional ER Questions ─────────────────────────────────────
  {
    id: 36,
    category: "ER Modelling",
    question: "What is a weak entity in ER modelling?",
    options: [
      "An entity with no attributes",
      "An entity that cannot be uniquely identified without reference to another (parent) entity",
      "An entity with only derived attributes",
      "An entity that has no relationships",
    ],
    correct: 1,
    explanation:
      "A weak entity cannot be uniquely identified by its own attributes alone — it depends on a parent (identifying) entity. It has a partial key (discriminator) and is represented with a double rectangle in ER diagrams. Its existence dependency is shown with a double line to the identifying relationship.",
    diagram: `erDiagram
  ORDER ||--|{ ORDER_ITEM : contains
  ORDER {
    int orderNo PK
    date orderDate
  }
  ORDER_ITEM {
    int orderNo PK, FK
    int lineNo PK
    string product
  }
  style ORDER fill:#636e72,stroke:#dfe6e9,color:#fff
  style ORDER_ITEM fill:#6c5ce7,stroke:#dfe6e9,color:#fff`,
    diagramType: "erDiagram",
  },
  {
    id: 37,
    category: "ER Modelling",
    question: "What is a recursive relationship in ER modelling?",
    options: [
      "A relationship between two weak entities",
      "An entity type that participates more than once in a relationship with itself",
      "A relationship that loops infinitely",
      "A relationship with no attributes",
    ],
    correct: 1,
    explanation:
      "A recursive relationship occurs when the same entity type participates more than once in a relationship. Example: Employee supervises Employee — the Employee entity type appears on both sides of the supervises relationship.",
    diagram: `erDiagram
  EMPLOYEE ||--o{ EMPLOYEE : "supervises"
  EMPLOYEE {
    string empId PK
    string name
    string supervisorId FK
  }
  style EMPLOYEE fill:#6c5ce7,stroke:#dfe6e9,color:#fff`,
    diagramType: "erDiagram",
  },

  // ── Additional Normalisation Questions ──────────────────────────
  {
    id: 38,
    category: "Normalisation",
    question:
      "What anomaly occurs when you cannot insert data without having other data (e.g., cannot add a new department without at least one employee)?",
    options: ["Deletion anomaly", "Modification anomaly", "Insertion anomaly", "Update anomaly"],
    correct: 2,
    explanation:
      "An insertion anomaly occurs when you cannot insert data about one entity because data about another entity is missing. This happens due to redundancy and poor schema design. Normalisation (moving to at least 2NF/3NF) eliminates these anomalies by separating entities into their own relations.",
    diagram: `graph LR
  BadSchema["Denormalised Schema"] -->|Cannot insert| Dept["New department<br/>(no employees yet)"]
  BadSchema -->|Can delete| DeptInfo["Deleting last employee<br/>loses department info"]
  BadSchema -->|Must update| DeptName["Changing dept name<br/>requires multiple updates"]
  style Dept fill:#d63031,stroke:#dfe6e9,color:#fff
  style DeptInfo fill:#e17055,stroke:#dfe6e9,color:#fff
  style DeptName fill:#e17055,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph LR",
  },

  // ── Additional GDPR Questions ───────────────────────────────────
  {
    id: 39,
    category: "GDPR",
    question: 'Under GDPR, what is "data minimisation"?',
    options: [
      "Deleting all data after one year",
      "Collecting only data that is adequate, relevant, and limited to what is necessary",
      "Encrypting all personal data",
      "Sharing data with minimal recipients",
    ],
    correct: 1,
    explanation:
      "Data minimisation (GDPR Principle 3) requires that personal data be adequate, relevant, and limited to what is necessary in relation to the purposes for which they are processed. You should not collect more data than you actually need.",
    diagram: `graph TD
  Principle3["Data Minimisation"]
  Principle3 -->|Collect| Necessary["Only what is necessary"]
  Principle3 -->|Avoid| Excess["Excessive/irrelevant data"]
  style Principle3 fill:#6c5ce7,stroke:#dfe6e9,color:#fff
  style Necessary fill:#00b894,stroke:#dfe6e9,color:#fff
  style Excess fill:#d63031,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph TD",
  },

  // ── Additional Architecture Questions ───────────────────────────
  {
    id: 40,
    category: "Database Architecture",
    question: "What is the difference between a system catalogue and a data dictionary?",
    options: [
      "They are the same thing",
      "System catalogue is syntactic (accessed by DBMS); data dictionary is semantic (accessed by users/DBA)",
      "Data dictionary is only for physical storage details",
      "System catalogue is accessed by users; data dictionary by the DBMS",
    ],
    correct: 1,
    explanation:
      "The system catalogue stores syntactic definitions (accessed by the DBMS at runtime). The data dictionary provides semantic support (accessed by users and DBAs) and is an augmented version of the catalogue. They can be integrated (data dictionary as part of DBMS) or independent (free-standing).",
    diagram: `graph LR
  Catalogue["System Catalogue<br/>(syntactic, DBMS access)"]
  Dictionary["Data Dictionary<br/>(semantic, user access)"]
  Catalogue -->|augmented by| Dictionary
  style Catalogue fill:#636e72,stroke:#dfe6e9,color:#fff
  style Dictionary fill:#6c5ce7,stroke:#dfe6e9,color:#fff`,
    diagramType: "graph LR",
  },
];

// Categories for filtering
export const categories = [...new Set(quizQuestions.map((q) => q.category))];
