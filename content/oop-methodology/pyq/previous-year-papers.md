---
title: "Previous Year Papers — OOP Methodology"
date: "2026-11-20"
tags: ["pyq", "CS305"]
summary: "5 papers (Dec 2023 – Dec 2025) with full questions, plus a pattern analysis of recurring OOPM topics."
---

## Exam pattern (consistent across all papers)

- **Total questions:** 8, attempt any 5
- **Marks:** 70, Time: 3 hours
- **Format:** bilingual (English + Hindi); if there is any doubt, the English version is final
- **Marks per question:** all questions carry equal marks, so 14 each. Each question is split into (a) and (b) of 7 marks (the Dec 2024 paper prints "7" against every part)
- Q1 is about the OOP fundamentals in every paper: a comparison of OOP with procedural programming and/or the merits and demerits of OOP
- Dec 2023 Q5 and Q8, and June 2024 Q8, are split into four parts (a)–(d) (differences or short notes). The scans do not show how many parts to attempt, so check the original paper if you need the exact rule
- Every paper has at least one **"write a program"** question (Student class, Rectangle class, exception on a negative number, function overloading, pure virtual function) — practice writing short C++ programs by hand, not just reading them
- Many questions ask for **"with example"** or **"with suitable example"** — always add a small code snippet or real-world example

## Topic frequency

| Area | Topic | Appears in |
|---|---|---|
| Paradigms | OOP vs procedural programming (comparison) | Dec 2025, June 2025, Dec 2024, June 2024, Dec 2023 |
| Paradigms | Features, merits, demerits of OOP | Dec 2025, June 2025, Dec 2024, June 2024, Dec 2023 |
| Modeling | Object model | Dec 2025, June 2024, Dec 2023 |
| Modeling | Class / object diagrams and case studies (Library, Hospital, ATM) | Dec 2025, June 2025, Dec 2024, June 2024, Dec 2023 |
| Classes | Encapsulation and data abstraction | Dec 2025, June 2025, Dec 2024, June 2024, Dec 2023 |
| Classes | Access modifiers / specifiers | Dec 2025, June 2025, Dec 2024, Dec 2023 |
| Classes | Static members / static methods | Dec 2025, June 2025, June 2024 |
| Classes | Classes and objects, class-based programs (Student, Rectangle) | Dec 2025, Dec 2024 |
| Classes | Constructors and destructors | June 2024, Dec 2023 |
| Relationships | Association, aggregation, composition | Dec 2025, June 2025, Dec 2024, June 2024, Dec 2023 |
| Inheritance | Inheritance — purpose and types | Dec 2025, June 2025, Dec 2024, June 2024 (vs aggregation) |
| Inheritance | Multiple inheritance ambiguity | June 2025 |
| Polymorphism | Polymorphism — concept, types, significance | Dec 2025, June 2025, Dec 2024, June 2024 |
| Polymorphism | Overloading vs overriding, compile-time vs run-time | Dec 2025, June 2025, Dec 2024, June 2024, Dec 2023 |
| Polymorphism | Virtual / pure virtual functions | June 2025, June 2024, Dec 2023 |
| Abstraction | Interfaces and abstract classes | Dec 2025, June 2025, Dec 2024, June 2024 (short note), Dec 2023 |
| Abstraction | Message passing | June 2025, Dec 2024, June 2024 |
| Robustness | Exception handling | Dec 2025, June 2025, June 2024, Dec 2023 (Dec 2024: only inside the Library System question) |
| Robustness | Multithreading | Dec 2025, June 2025, Dec 2024, June 2024, Dec 2023 |
| Robustness | Data collections | Dec 2025, Dec 2024, June 2024 |
| C++ features | File I/O, buffering, I/O processing | June 2025, June 2024 |
| C++ features | Templates, friend functions | June 2024 |
| Other | Control statements/loops/arrays (Dec 2025), string handling (Dec 2023), generalization vs specialization (Dec 2023) | one paper each |

**Takeaway:** OOP vs procedural, merits/demerits, encapsulation, association/aggregation, polymorphism, interfaces vs abstract classes and multithreading have appeared in all five papers so far, so start there. The three latest papers lean towards conceptual questions; templates, friend functions, constructors/destructors and pure virtual functions only show up in Dec 2023 and June 2024. Five papers is a small sample, so keep them as second priority and don't skip them completely. Case-study questions (Library Management, Hospital, ATM) are common, so practice one object/class diagram for each. Some questions repeat almost word for word: "What is Association? Explain the various forms of Association" is in both Dec 2023 Q6(b) and June 2024 Q3(b), and "interfaces vs abstract classes" is nearly identical in Dec 2024 Q7(b) and June 2025 Q7(a).

---

## December 2025

**Q1.**

(a) Compare procedural programming with object oriented programming.

(b) Explain features, merits and demerits of Object Oriented paradigm.

**Q2.**

(a) Explain object model and basic elements of OOPS.

(b) Discuss control statements, loops and arrays used in OOPS languages.

**Q3.**

(a) Define encapsulation and data abstraction.

(b) Write a C program to demonstrate the concept of Encapsulation by creating a class Student with data members (roll number, name, and marks) and appropriate member functions. *(The paper says "C program", but a class needs C++.)*

**Q4.**

(a) Explain classes and objects.

(b) Discuss access modifiers, static members and object life cycle.

**Q5.**

(a) Explain inheritance and its types.

(b) Differentiate between association and aggregation.

**Q6.**

(a) Explain interfaces and abstract classes.

(b) Discuss their role in software design.

**Q7.**

(a) Explain polymorphism with method overloading and overriding.

(b) Differentiate between compile-time and run-time polymorphism.

**Q8.**

(a) Explain exception handling and multithreading.

(b) Discuss data collections with a suitable case study (ATM/Library).

---

## June 2025

**Q1.**

(a) Write the comparison between object oriented programming and procedural programming.

(b) Explain the primary disadvantages of OO in system performance?

**Q2.**

(a) What are access specifiers (public, private, protected), and how do they support encapsulation?

(b) What is a static method, and how does it differ from an instance method?

**Q3.**

(a) What is aggregation in OOP? How does aggregation differ from a simple association?

(b) What is the purpose of inheritance in OOP? How does inheritance reduce code duplication in software development?

**Q4.**

(a) Explain the term polymorphism with its types by taking suitable example.

(b) Compare overloading with overriding. Why is overloading a compile-time polymorphism while overriding is a runtime polymorphism?

**Q5.**

(a) Describe thread life cycle in detail.

(b) What is exception? Write a program to input any number and if number is negative then it will throw an exception.

**Q6.**

(a) What is buffering in the context of I/O processing, and how does it affect performance?

(b) How does encapsulation support the concept of message passing in OOP?

**Q7.**

(a) Write the difference between interface and abstract class.

(b) How does the use of virtual functions in C++ or abstract methods in Java facilitate runtime polymorphism?

**Q8.**

(a) Explain library management system using object oriented diagram.

(b) How does Multiple Inheritance lead to ambiguity? Explain with suitable example.

---

## December 2024

**Q1.**

(a) Compare Object-Oriented Programming (OOP) with Procedural Programming, highlighting at least three differences. Discuss the features of the Object-Oriented Paradigm, mentioning its merits and demerits.

(b) Given a class rectangle with attributes length and width, write methods to calculate the area and perimeter of the rectangle. Also, demonstrate the use of these methods in a sample program.

**Q2.**

(a) Explain the concept of encapsulation and data abstraction in Object-Oriented Programming. How do these concepts enhance software development?

(b) Explain the role of access modifiers in class design. Compare public, private and protected access levels with examples.

**Q3.**

(a) Explain the purpose of inheritance in Object-Oriented Programming. Discuss the different types of inheritance with suitable examples.

(b) Differentiate between association, aggregation and composition in the context of OOP. Provide real-world examples for each type of relationship.

**Q4.**

(a) What is polymorphism in Object-Oriented Programming? Discuss its significance and how it contributes to code reusability and flexibility.

(b) Compare and contrast static polymorphism with runtime polymorphism. Provide illustrative examples for both types.

**Q5.**

(a) Explain the architecture and functionalities of a Library Management System. Discuss how strings, exception handling, and collections can be utilized in its implementation.

(b) Describe the concept of multi-threading. What are the advantages of using multi-threading in applications?

**Q6.**

(a) Discuss the merits and demerits of Object-Oriented Methodology. Provide real-world scenarios where OOP is beneficial and where it may not be ideal.

(b) Discuss the concepts of message passing in OOP. How does message passing facilitate communication between objects?

**Q7.**

(a) What are classes in OOP? Discuss how to identify classes. Create a class student with attributes like name, roll_number, and marks. Write methods to calculate the average marks and display student information. Demonstrate its use in a sample program.

(b) Explain the concept of interfaces in OOP. How do interfaces differ from abstract classes? Discuss the use of both in software development.

**Q8.**

(a) Explain how interfaces in Object-Oriented Programming can facilitate polymorphism. Provide code examples to illustrate the use of interfaces in C++.

(b) Discuss various data collections available in C++. How do these collections differ in terms of performance and use cases?

---

## June 2024

**Q1.**

(a) What are the merits and demerits of object oriented programming approach? Explain the concept of encapsulation with proper example.

(b) Differentiate between conventional programming approach and object oriented programming approach.

**Q2.**

(a) Discuss the role of object model regarding object oriented technology and why and when it is beneficial to design object model for any task?

(b) Compare aggregation and inheritance. Write down the properties of aggregation.

**Q3.**

(a) Discuss the elements of class diagram with the help of an example.

(b) What is Association? Explain the various forms of Association.

**Q4.**

(a) Differentiate between the following: (i) Polymorphism and Abstraction · (ii) Function overloading and Function overriding.

(b) Explain exception handling in C++. Write a program in C++ to demonstrate this Exception handling mechanism.

**Q5.**

(a) What is static data member? How they are used in static functions? Explain with suitable illustrations.

(b) Explain the steps involved in reading and writing a file in C++ program.

**Q6.**

(a) Explain class and function template using suitable example in C++ programming.

(b) What is a friend function? Explain the need for using a friend function.

**Q7.**

(a) What are pure virtual functions in C++? Explain with the help of a program.

(b) Give a detailed note on multithreading and data collections.

**Q8.** Write short notes: Abstract Classes · Constructors · Message Passing · I/O Processing.

---

## December 2023

**Q1.**

(a) What do you understand by Object Oriented Programming? What are the advantages of programming using object oriented? Explain and define various OOP concepts in brief.

(b) How procedure oriented programming approach is different with object oriented programming approach?

**Q2.**

(a) Draw and explain object diagram for hospital management system.

(b) Explain object model with example of ATM of a bank.

**Q3.**

(a) How can we implement aggregation in OOP? Explain with an example.

(b) Discuss and compare run time polymorphism and compile time polymorphism.

**Q4.**

(a) What is constructor and destructor function? Explain with an example.

(b) Using the concept of function overloading write a program in C++ to find the maximum of three integer numbers.

**Q5.** Differentiate between: (a) Virtual and Pure virtual function · (b) Generalization and Specialization · (c) Encapsulation and Inheritance · (d) Function overloading and Function overriding.

**Q6.**

(a) What do you mean by exception? How exception is handled in C++? Explain with the help of an example?

(b) What is Association? Explain the various forms of Association.

**Q7.**

(a) What is Multithreading? Discuss its importance and application in OOP.

(b) What is an abstract class in OOP and how do we implement it? Explain with an example.

**Q8.** Write short notes: Access modifiers · Abstraction · Interfaces · String Handling in OOP.
