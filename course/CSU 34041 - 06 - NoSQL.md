# Introduction to NoSQL

**CSU34041** — Yvette Graham — ygraham@tcd.ie

---

## Data Structures

A data structure is a particular way of organising data in memory so that it can be used effectively by software / computer programs.

---

## The Relational Model: 1970

Since their first appearance, relational databases have been a default choice in many different contexts, especially in enterprise applications:

- **Persistence**
- **Concurrency**
- **Integration**
- **Almost standard model**

---

## Why Do We Need Anything Beyond Relational Databases?

For application developers, the biggest frustration has been what's commonly called the **impedance mismatch**: the difference between the relational model and the in-memory data structure.

- No non-simplistic data structures, such as nested records or lists
- If you want to use a richer in-memory data structure, you have to translate it to a relational representation to store it on disk

---

## The Internet: 1971 vs 2014

<!-- Visual comparison of internet scale between 1971 and 2014 -->

---

## Trend 1: Data Size

- **2017 vs 2023**: [Visual Capitalist](http://www.visualcapitalist.com/happens-internet-minute-2017/)
- **2025**: [Domo](http://www.domo.com)

Data is growing at an exponential rate.

---

## Trend 2: Connectedness

The internet has evolved from simple text documents to a richly interconnected web:

| | | |
|---|---|---|
| Hypertext | Feeds | Blogs |
| Text | UGC | Wikis |
| Documents | Tagging | Folksonomies |
| | Information connectivity | Ontologies / RDFa |

---

## Trend 3: Semi-Structure

- **Individualisation of content** — In the salary lists of the 1970s, all elements had exactly one job. In the salary lists of the 2000s, we need 5 job columns! Or 8? Or 15?
- **All-encompassing "entire world views"** — Store more data about each entity
- **Trend accelerated by decentralisation of content generation** — the hallmark of the age of participation ("Web 2.0")

---

## Trend 4: Architecture

Evolution of system architecture:

| Era | Architecture |
|---|---|
| **1980** | Mainframe — single application, single database |
| **1990** | Database as integration hub |
| **2000** | Decoupled services |
| **Today** | Multicore / Parallelisation / Distributed / Cloud / Schema-less |

---

## Virtualisation

Make lots of copies of an OS. Share the hardware.

- Each virtual machine runs its own operating system and functions separately from the other VMs, even when they are all running on the same host
- Runs across different OSes: Windows 7, RedHat Linux, Windows Server, Ubuntu, Windows Vista, CentOS

---

## Now Imagine Lots

<!-- Visual: many virtual machines across many physical hosts -->

---

## Cloud Computing

Takes virtualisation to the extreme.

- Companies like Google, Amazon and Microsoft have **over 500,000 physical servers**
- Anyone with a credit card can start hundreds of servers in a matter of minutes
- Especially used for data storage and computing power, without direct active management by the user

---

## Why NoSQL — The 3 Vs

| | | |
|---|---|---|
| **V**elocity | **V**ariety | **V**olume |

- Explosion of (unstructured) data
- **Big data** is data that exceeds the processing capacity of conventional database systems
- The data is too big, moves too fast, or doesn't fit the structures of your database architectures
- To gain value from this data, you need an alternative way to process it

---

## Unlock Your Big Data

Big data became viable as cost-effective approaches have emerged to tame the **volume**, **velocity** and **variability** of massive data.

- Within this data lie valuable patterns and information, previously hidden because of the amount of work required to extract them
- We are storing huge amounts of data — need a processing system to handle and analyse the data in an efficient manner
- We need to handle the huge **Volume** and **Variety** of data with **Velocity** — the 3 Vs

---

## Traditional Data Approaches

- **Filter → Store → Distribute**
- Encyclopedias, Newspapers, Libraries, Banking

**Why?**

- Storage caps
- Bandwidth caps

---

## Storing Everything Is a Challenge

### SQL Databases

- Depend on a pre-filter
- Assume single disk farm
- Hard to partition
- Based on **1970s storage assumptions**

---

## Impedance Mismatch

This makes software development difficult — the difference between the relational model and the in-memory data structures.

```
          Code + XML Config
                │
                ▼
    ┌─────────────────────┐
    │  Object Relational  │
    │      Mapping (ORM)  │
    └─────────────────────┘
                │
                ▼
    ┌─────────────────────┐
    │  Relational DB      │
    │  (DB Schema)        │
    └─────────────────────┘
```

---

## Limitations of Relational Databases

- **Impedance mismatch** — complex objects are not suited to being represented in a relational way
- **Application and integration** — the database works as an integration database, but the structure tends to be more complex
- **Scale up vs. scale out** (parallel)

---

## What Did Scaling Out Result In?

- **No CAPEX** — capital expenditure (funds used to acquire physical property, buildings, or equipment)
- **No Data Centre**
- **Availability of Scale**
- **Utility Pricing** (pay per use)

Filter → Store → Distribute  →  Store → Filter → Distribute

---

## NoSQL Scales Better

```
Price
  │
  │  Relational (scale up = more expensive)
  │  NoSQL       (scale out = cheaper)
  │
  └─────────────────── Scale ──────────────────→
```

---

## When?

<!-- Visual: timeline / decision chart -->

---

## What?

<!-- Visual: decision chart -->

---

## NoSQL — No Definition

- **Non-relational**
- **No SQL** as query language — they don't use SQL, although some may have a query language that resembles SQL
- **Schema-less** — structure can change
- Usually (not always) **open-source** projects
- They are **distributed** — usually driven by the requirements of running on clusters (with the exception of graph DBs)
- **RDBMS use ACID transactions; NoSQL don't**

---

## What Is NoSQL?

- **Goal of a Database**
  - Data durability
  - Consistent performance
  - Graceful degradation under load
  - Big data workloads require distributed computing
- **Transactions**
- **Joins**

---

## Distributed Computing

Much more power. Cheaper. More resilience.

**But there is a drawback...**

In a distributed system we have a network of autonomous computers that communicate with each other in order to achieve a goal. The computers in a distributed system are independent and do not physically share memory or processor.

```
         Master
      ┌────┼────┐
      ▼    ▼    ▼
  Compute1  Compute1  Compute1
     │         │         │
   Disk 1    Disk 1    Disk 1
     │         │         │
  Compute1  Compute1  Compute1
```

---

## Distributed Models

- **Replication** — copies the same data over multiple nodes
- **Sharding** — puts different data on different nodes
- Replication and sharding can be used in combination or alone

---

## Sharding

Different data on different nodes (horizontal scalability).

- Each server acts as a single source for the subset of data it is responsible for
- Ideal setting: one user talks with one server
- Data accessed together are stored together
- Example: access based on physical location, place data to the nearest server
- Many NoSQL databases offer **auto-sharding**
- Scales read and write on the different nodes of the same cluster
- **No resilience if used alone**: node failure → data unavailability

---

## Replication

The same data is replicated and copied over multiple nodes.

### Master-Slave

- One node is the primary responsible for processing updates to data; the others are secondaries used for read operations
- Scaling by adding slaves
- Processing incoming data limited by master
- Read resilience
- **Inconsistency problem** (read)

### Peer-to-Peer

- All replicas have equal weight and can accept writing
- Scaling by adding nodes
- Node failure without losing write capability
- **Inconsistency problem** (write)

---

## CAP Theorem

Only **2 of 3** can be guaranteed:

| | |
|---|---|
| **Consistency** | All nodes see the same data at the same time |
| **Availability** | A guarantee that every request receives a response about whether it succeeded or failed |
| **Partition Tolerance** | The system continues to operate despite arbitrary partitioning due to network failures |

---

## CAP Theorem — When a Network Partition Failure Happens

It must be decided whether to:

1. **Cancel the operation** — subsequently decrease availability but ensure consistency
2. **Proceed with the operation** — thus provide availability but risk inconsistency

---

## Eventual Consistency

Eventual consistency is a consistency model used in distributed computing to achieve high availability that informally guarantees that, if no new updates are made to a given data item, eventually all accesses to that item will return the last updated value.

**Reconciliation** is a problem — choosing an appropriate final state when concurrent updates have occurred, called *reconciliation*.

---

## SQL vs. NoSQL

### ACID (SQL)

| | |
|---|---|
| **A**tomic | Everything in a transaction succeeds or the entire transaction is rolled back |
| **C**onsistent | A transaction cannot leave the database in an inconsistent state |
| **I**solated | Transactions cannot interfere with each other |
| **D**urable | Completed transactions persist, even when servers restart, etc. |

### BASE (NoSQL)

| | |
|---|---|
| **B**asic Availability | An application works basically all the time |
| **S**oft-state | It does not have to be consistent all the time |
| **E**ventual consistency | It will be in a known state eventually |

Each node is always available to serve requests. As a trade-off, data modifications are propagated in the background to other nodes. The system may be inconsistent, but the data is still largely accurate.

---

## Data Model

A data model is a representation of how we perceive and manipulate our data.

- The data model describes how we interact with the data
- Represents the data elements under analysis
- How these elements interact with each other

The **storage model** describes how the database stores and manipulates the data internally.

---

## Four Common Types of NoSQL

| | |
|---|---|
| 1. | **Key-Value Stores** |
| 2. | **Document Stores** |
| 3. | **Column Stores** |
| 4. | **Graph Stores** |

> **Note:** Lots of hybrids exist.

---

## Key-Value Stores

```
10235  →  (value)
11456  →  (value)
12345  →  (value)
12348  →  (value)
```

- Maps keys to values
- Values treated as a **blob**
- They can be complex compound objects (list, maps, or other structures)
- **Single index**
- Consistency applicable for operations on a single key
- **Very fast and scalable**
- Inefficient to do aggregate queries ("all the carts worth $100 or more") or to represent relationships between data
- **Great for:** shopping carts, user profiles and preferences, storing session information

---

## Document Databases

```json
{
  "id": 10203,
  "name": "Sara",
  "surname": "Parker",
  "items": [
    { "product_id": 23, "quantity": 2 },
    { "product_id": 45, "quantity": 1 }
  ]
}
```

```json
{
  "id": 10456,
  "fullName": "John Smith",
  "items": [
    { "product_id": 24, "quantity": 4 },
    { "product_id": 45, "quantity": 1 },
    { "product_id": 67, "quantity": 34 }
  ],
  "discount-code": "Yes"
}
```

---

## Document Databases — Details

- A document is like a hash, with one ID and many values
- Store JavaScript documents
- **JSON** = JavaScript Object Notation
  - An associative array
  - Key–value pairs
  - Values can be documents or arrays
  - Arrays can contain documents
- Data is **implicitly denormalised** — closer to a single table than lots of tables with relations connecting them
- Document databases allow indexing of documents on the basis of not only its primary identifier but also its **properties**

---

## Documents Are Easier

### Relational

```
first_name: 'Paul'
surname:    'Miller'
city:       'London'
location:   [45.123, 47.232]
cars:
  ┌─ model: 'Bentley',   year: 1973, value: 100000
  └─ model: 'Rolls Royce', year: 1965, value: 330000
```

### Document DB

```json
{
  "first_name": "Paul",
  "surname": "Miller",
  "city": "London",
  "location": [45.123, 47.232],
  "cars": [
    { "model": "Bentley",   "year": 1973, "value": 100000 },
    { "model": "Rolls Royce", "year": 1965, "value": 330000 }
  ]
}
```

---

## Document DB Features

| Feature | Example |
|---|---|
| **Rich Queries** | Find Paul's cars; Find everybody who owns a car built between 1970 and 1980 |
| **Geospatial** | Find all of the car owners in London |
| **Text Search** | Find all the cars described as having leather seats |
| **Aggregation** | What's the average value of Paul's car collection? |
| **Map Reduce** | For each make and model of car, how many exist? |
| **MongoDB** | See document example above |

---

## Column Stores

Store data as **columns** rather than rows.

- Columns organised in **column families**
- Each column belongs to a single column family
- Column acts as a unit for access
- Particular column family will be accessed together
- Efficient to do column-ordered operations
- Not so great at row-based queries
- Adding columns is quite inexpensive and is done on a row-by-row basis
- Each row can have a different set of columns, or none at all — allowing tables to remain **sparse** without incurring a storage cost for null values

---

## Relational / Row-Order Databases

| ID | Name | Salary | Start Date |
|---|---|---|---|
| 1 | Joe D | $24,000 | 1/Jun/1970 |
| 2 | Peter J | $28,000 | 1/Feb/1972 |
| 3 | Joe D | $23,000 | 1/Jan/1973 |

---

## Column Databases

```
ID:          1, 2, 3
Name:        Joe D, Peter J, Joe D
Salary:      $24,000, $28,000, $23,000
Start Date:  1/Jun/1970, 1/Feb/1972, 1/Jan/1973

Inverted indexes:
  Joe D: 01;03
  Joe D: 01
  Peter J: 02
  Joe D: 03
  24000: 01
  28000: 02
  23000: 03
  1/Jun/1970: 01
  1/Feb/1972: 02
  1/Jan/1973: 03
```

---

## Pros and Cons

### Relational: Good For
- Queries that return **small subsets of rows**
- Queries that use a **large subset of row data**
- *e.g.* Find all employee data for employees with salary > $12,000

### Column: Good For
- Queries that require **just a column of data**
- Queries that require a **small subset of row data**
- *e.g.* Give me the total salary outlay for all staff

---

## Graph Stores

```
name: "Mary"      friend of →     name: "Julie"
age: 28                                age: 29

Mary ──loves──→ name: "John"          colleague of → Mark
           age: 32                    age: 34
           twitter: "@john54"

John ──drives──→ brand: "Volvo"       work for → company: "IBM"
                    model: "V70"
```

---

## Graph Stores — Details

- Data model composed of **nodes** connected by **edges**
- Nodes represent entities
- Edges represent the relationships between entities
- Nodes and edges can have properties
- Querying a graph database means **traversing the graph** by following the relationships

**Pros:**
- Representing objects of the real world that are highly interconnected
- Traversing the relationships in these data models is **cheap**

---

## Graph Stores vs Relational Databases

Relational databases are **not ideally suited** to representing relationships:

- Relationships implemented through **foreign keys**
- **Expensive joins** required to navigate relationships
- **Poor performance** for highly connected data models

---

## NoSQL vs. Relational Databases

### Pros
- Flexible schema
- Simple API
- Scalable
- Distributed and replicated storage
- Cheap

### Cons
- Not ACID compliant
- No standards
- Eventual consistency
- Some products are at early stage: poor documentation / support

---

**CSU34041** — Introduction to NoSQL — Yvette Graham — ygraham@tcd.ie