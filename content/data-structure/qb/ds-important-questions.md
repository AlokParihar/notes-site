---
title: "Important Questions — Data Structure"
date: "2026-11-21"
tags: ["qb", "important", "CS303"]
summary: "Topics and questions that repeat across the last 4 papers (June 2024 – Dec 2025), ranked by how often they appeared and grouped by unit."
---

## How to read this page

- Built only from the 4 papers on the Previous Year Papers page. No question here is invented or predicted.
- **Papers** = in how many of the 4 papers a question on that topic was asked. A short-note option counts, even though you may skip it in the exam.
- Four papers is a small sample. This shows what has been asked often, not what will come.
- Units follow the Syllabus page. For the mid-sem, ask your faculty which units it covers and use only those sections.
- Question numbers (like Dec 2025 Q4(a)) match the Previous Year Papers page, so you can check any line there.

## Study order

| Papers | Topic | Unit |
|---|---|---|
| 4 of 4 | Linked lists (singly, circular) | 1 |
| 4 of 4 | Stack — operations, implementation | 2 |
| 4 of 4 | Queue — circular, deque, priority, simulation | 2 |
| 4 of 4 | Trees in some form (BST, AVL, red-black, B-tree) | 3 |
| 4 of 4 | Minimum spanning tree (Kruskal's, Prim's) | 4 |
| 4 of 4 | Sorting (quick, heap, shell, merge) | 5 |
| 4 of 4 | Hashing | 5 |
| 3 of 4 | Classification of data structures | 1 |
| 3 of 4 | Abstract data types (ADT) | 1 |
| 3 of 4 | Infix to postfix conversion | 2 |
| 3 of 4 | BST — traversal, construction, insert/delete | 3 |
| 3 of 4 | AVL trees — rotations, construction | 3 |
| 3 of 4 | B-tree / B+ tree (all as short-note options) | 3 |
| 3 of 4 | Searching (binary, sequential) | 5 |
| 2 of 4 | Red-black trees | 3 |
| 2 of 4 | Graph traversal (DFS, BFS) | 4 |
| 2 of 4 | Graph representation | 4 |
| 2 of 4 | Dijkstra's algorithm | 4 |
| 2 of 4 | Postfix evaluation | 2 |
| 2 of 4 | Indexing | 5 |
| 1 of 4 | Recursion, asymptotic notation | — |

## Questions that came back word for word

- "Write a 'C' program to convert the infix expression to postfix expression." — June 2024 Q2(b), June 2025 Q3(b)
- "Differentiate between the stack and queue." — June 2024 Q2(a), June 2025 Q4(a)

## Unit 1 — C Review, Intro to DS and Linked Lists

**Classification of data structures (3 of 4)**

- "Explain the classification of data structures in detail." — Dec 2025 Q1(a)
- "Discuss various classification of data structures with an example." — June 2025 Q2(b)
- "Define data structures. Classify different types of data structures." — Dec 2024 Q1(b)

**Abstract data types (3 of 4)**

- "Define Abstract Data Types (ADT). Explain the different operations performed on data structures and describe the criteria for cost estimation." — Dec 2025 Q1(b)
- "Describe the difference between an abstract data type specification and implementation." — June 2025 Q1(a)
- "Compare and contrast the characteristics of arrays and linked lists as abstract data types." — Dec 2024 Q2(a)

**Linked lists (4 of 4)**

- "Describe the memory representation of a Singly Linked List. Write an algorithm to insert a node at a specific position in a linked list." — Dec 2025 Q2(a)
- "Give the implementation of circular linked list. Also give its application." — June 2025 Q2(a)
- "Write an algorithm for traversing nodes in a single linked list? Explain with an example." — Dec 2024 Q1(a)
- "Write an algorithm for insert and delete operations in circular linked list." — June 2024 Q3(a)
- "Circular Linked Lists" as a short-note option — Dec 2025 Q8

**Arrays**

- "How is a two dimensional array represented in memory? Calculate amount memory required to store this array and the accessing function for it." — June 2025 Q1(b)
- "Describe the concept of a dynamic array and how it differs from a static array in terms of memory management and flexibility." — Dec 2024 Q2(b)

## Unit 2 — Stacks and Queues

**Stack (4 of 4)**

- "Define Stack as an ADT. Explain the array and linked list implementation of stacks." — Dec 2025 Q2(b)
- "What is Stack? Why it is known of LIFO? Write algorithm of PUSH, POP and CHANGE operation on stack." — June 2025 Q3(a)
- "Write an algorithm for Push and Pop operations on Stack using linked list." — Dec 2024 Q4(a)
- "Write an algorithm which reverses the order of elements on stack using one additional stack and some additional variables." — Dec 2024 Q3(a)
- "Differentiate between the stack and queue." — June 2024 Q2(a), June 2025 Q4(a)

**Infix to postfix (3 of 4)**

- "Explain the algorithm to convert an Infix expression to a Postfix notation using a stack." — Dec 2025 Q3(a)
- "Write a 'C' program to convert the infix expression to postfix expression." — June 2025 Q3(b)
- "How can you convert an infix expression to postfix expression. Give one example." — June 2024 Q4(a)

**Postfix evaluation (2 of 4)**

- "Postfix evaluation" as a short-note option — June 2025 Q8, June 2024 Q8

**Queue (4 of 4)**

- "Explain the concept of Queue simulation with a real-world example." — Dec 2025 Q3(b)
- "What are circular queue and priority queue? Write an algorithm in insert and delete an element from a circular queue." — June 2025 Q4(b)
- "Explain the addition and deletion operations performed on a circular queue with necessary algorithms." — Dec 2024 Q3(b)
- "What is a DeQueue? Explain its operation with example." — Dec 2024 Q4(b)
- "Queue using linked list" as a short-note option — June 2024 Q8

**Recursion (1 of 4)**

- "What is Recursion? Explain in detail with example." — June 2024 Q1(b)

## Unit 3 — Trees

**BST — traversal, construction, insert and delete (3 of 4)**

June 2025 had no BST question. It asked about AVL and red-black trees instead (see below).

- "Define a Binary Search Tree (BST). Explain the algorithms for In-order, Pre-order, and Post-order traversal with an example." — Dec 2025 Q4(a)
- "Create a binary search tree for the following numbers: 45, 26, 10, 60, 70, 30, 40. Start from an empty binary search tree. Delete keys 10, 60 and 45 one after the other and show the trees at each stage." — Dec 2024 Q5(b)
- "How a binary search tree is traversed? Explain with a suitable example." — June 2024 Q3(b)
- "Write functions to implement recursive versions of preorder, inorder and postorder traversals of a binary tree." — June 2024 Q4(b)
- "Write a 'C' program, how to insert and delete elements in the Binary search tree?" — June 2024 Q5(a)
- "Construct an expression tree for the expression (a+b*c) + ((d*e+f)*g). Apply inorder, preorder and postorder traversals on tree." — Dec 2024 Q5(a)

**Tree terminology**

- "Define the following tree terminologies: Height, Depth, Degree of a node, and Forest." — Dec 2025 Q5(a)

**AVL trees (3 of 4)**

- "What are AVL Trees? Explain the four types of rotations (LL, RR, LR, RL) used to balance an AVL tree." — Dec 2025 Q4(b)
- "Construct an AVL search tree by inserting the following elements in order of their occurrence: 64, 1, 44, 26, 13, 110, 98, 85." — June 2025 Q5(b)
- "Describe the algorithms used to perform single and double rotation on AVL tree." — Dec 2024 Q6(a)

**Red-black trees and B-trees**

- "Explain Red black trees also discuss the properties of red black tree." — June 2025 Q5(a)
- Short-note options: Red Black Tree — Dec 2024 Q8(b); B+ Trees — Dec 2025 Q8, June 2024 Q8; B-tree — June 2025 Q8

## Unit 4 — Graphs

**Minimum spanning tree (4 of 4)**

- "What is a Minimum Spanning Tree (MST)? Explain Kruskal's or Prim's algorithm to find the MST of a weighted graph." — Dec 2025 Q6(b)
- "Define minimum spanning tree. Write down Prim's algorithm to find minimum spanning tree." — Dec 2024 Q7(a)
- "Discuss Kruskal's algorithm with the following graph." — June 2024 Q5(b) (the graph is in the original paper)
- "Prim's algorithm" as a short-note option — June 2025 Q8

**Graph traversal (2 of 4)**

- "Describe the Depth First Search (DFS) and Breadth First Search (BFS) algorithms for graph traversal with examples." — Dec 2025 Q6(a)
- "Differentiate between Depth first search and Breadth First search algorithm." — Dec 2024 Q6(b)

**Graph representation (2 of 4)**

- "Explain the Adjacency Matrix and Adjacency List representations of a graph." — Dec 2025 Q5(b)
- "Write a C function to create the adjacency list representation of a graph, given its adjacency matrix representation." — June 2025 Q6(b)

**Dijkstra's algorithm (2 of 4)**

- "Explain Dijkstra algorithm with the help of example." — June 2025 Q6(a)
- "Dijkstra's shortest path algorithm" as a short-note option — Dec 2025 Q8

## Unit 5 — Sorting and Searching

**Sorting (4 of 4)**

- "Explain the Quick Sort algorithm with suitable example." — Dec 2025 Q7(a)
- "Sort the following elements using quick sort: 55, 72, 12, 45, 88, 38, 27, 33, 91, 80." — Dec 2024 Q7(b)
- "Write a Heap sort algorithm. Use Heap sort algorithm to sort the following element: 12, 3, 9, 14, 10, 18, 8, 23." — June 2025 Q7(a)
- "Explain shell sort algorithm and simulate it for the following data: 35, 33, 42, 10, 14, 19, 27, 44." — June 2024 Q6(a)
- "Explain Multiway Merge sort with an example." — June 2024 Q7(a)
- "What do you mean by sorting? Describe the need for sorting." — June 2024 Q7(b)
- Short-note options: Heap Sort — Dec 2024 Q8(b); Shell sort — June 2025 Q8

**Searching (3 of 4)**

- "Explain Binary Search with an example." — Dec 2025 Q7(b)
- "Apply Binary search to search 36 in following list: 21, 12, 36, 32, 38, 23, 56, 83, 92, 5, 10, 15." — Dec 2024 Q8(a)
- "Explain sequential search and simulate it for the following data: 4, 21, 36, 14, 62, 91, 8, 22, 81, 77, 10." — June 2024 Q6(b)

**Hashing and indexing (hashing 4 of 4)**

- "What are hash function? Write down various popular hash function with example." — June 2025 Q7(b)
- Short-note options: Linear Probing and Chaining — Dec 2025 Q8; Hashing and Indexing — Dec 2024 Q8(b); Hashing — June 2024 Q8; Indexing — June 2025 Q8

## Practise tracing by hand

Many questions give you data and ask for the steps. The numbers change, so practise the method: AVL insertion with rotations, BST delete, quick sort, heap sort, shell sort, binary search, Kruskal's and Prim's on a small graph.

## Asked only once in these 4 papers

Asymptotic notation (June 2024 Q1(a)), recursion (June 2024 Q1(b)), 2D array memory calculation (June 2025 Q1(b)), dynamic arrays (Dec 2024 Q2(b)), multiway merge sort (June 2024 Q7(a)).
