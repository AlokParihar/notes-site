---
title: "Important Questions — Digital Systems"
date: "2026-11-22"
tags: ["qb", "important", "CS304"]
summary: "Topics and questions that repeat across the last 4 distinct papers (Dec 2023 – Dec 2025), ranked by how often they appeared and grouped by unit."
---

## How to read this page

- Built only from the papers on the Previous Year Papers page. No question here is invented or predicted.
- **Papers** = in how many papers a question on that topic was asked. A short-note option counts, even though you may skip it in the exam.
- **Dec 2023 and June 2024 are counted as one paper.** In the PYQ file their Q2 to Q7 are word for word identical (only Q1 and Q8 differ). That is more likely one paper that was entered twice than two real papers, so this page counts the pair once. The counts are out of 4 for that reason. If both were genuinely set, the real counts for those topics are one higher.
- Four papers is a small sample. This shows what has been asked often, not what will come.
- Units follow the Syllabus page. For the mid-sem, ask your faculty which units it covers and use only those sections.
- Question numbers (like Dec 2025 Q4(a)) match the Previous Year Papers page, so you can check any line there.
- Some questions refer to a figure ("Fig. 1" and so on). The figure is not on the site, so check the original paper for those.

## Study order

| Papers | Topic | Unit |
|---|---|---|
| 4 of 4 | Number system conversions | 1 |
| 4 of 4 | Adders and subtractors | 2 |
| 4 of 4 | Multiplexers, decoders, combinational design | 2 |
| 4 of 4 | Flip-flops | 3 |
| 4 of 4 | Memories — DRAM, FLASH, ROM, PLA, address mapping | 3 |
| 4 of 4 | A/D and D/A converters | 4 |
| 3 of 4 | Simplification — K-map, SOP/POS | 1 |
| 3 of 4 | Universal gates, NAND/NOR realization | 1 |
| 3 of 4 | Look-ahead carry | 2 |
| 3 of 4 | Counters | 3 |
| 3 of 4 | IC 555, multivibrators, Schmitt trigger | 4 |
| 3 of 4 | Logic families (TTL, PMOS, NMOS, CMOS) | 4 |
| 3 of 4 | PCM and quantization error | 5 |
| 3 of 4 | Shannon's channel capacity theorem | 5 |
| 2 of 4 | Time division multiplexing | 5 |
| 2 of 4 | BPSK and BFSK modulation | 5 |
| 1 of 4 | Nyquist sampling theorem, voltage-to-frequency conversion | — |

## Questions that came back word for word

Dec 2023 and June 2024 share these (see the note at the top):

- "Design a Half adder circuit with truth table and logic diagrams." — Dec 2023 Q2(a), June 2024 Q2(a)
- "Explain the working of the master slave JK flip-flop." — Dec 2023 Q3(a), June 2024 Q3(a)
- "Design a 3-bit binary UP/DOWN counter with a direction control M. Use T flip-flop." — Dec 2023 Q3(b), June 2024 Q3(b)
- "Draw and explain the PMOS, NMOS and CMOS logic." — Dec 2023 Q4(a), June 2024 Q4(a)
- "Derive the frequency of oscillation of an astable multivibrator using IC 555 timer." — Dec 2023 Q7(a), June 2024 Q7(a)

## Unit 1 — Boolean Algebra and Simplification

**Number system conversions (4 of 4)**

- "Convert the following:" (753)₈ to decimal, (4A3)₁₆ to binary, Gray code, Excess-3 and more — Dec 2025 Q1(a)
- "Convert the number (AD)₁₆ into decimal and binary and octal numbers." — June 2025 Q1(a)
- "Discuss the difference of Binary numbers and BCD code." — June 2025 Q1(b)
- "Convert the following decimal numbers to the indicated bases:" — Dec 2024 Q1(a)
- "Add (83)₁₀ and (34)₁₀ in BCD." — Dec 2023 Q1(a)

**Simplification — K-map, SOP/POS (3 of 4)**

- "Simplify the following function using 3-variable K-map:" — Dec 2025 Q1(b)
- "What do you mean by canonical form? Express the Boolean function F = A + B'C in (i) SOP and (ii) POS." — June 2025 Q2(b)
- "Reduce the expression Y=Σm(1,4,8,12,13,15)+d(3,14) using K-maps and implement the real minimal expression using basic logic gates." — Dec 2023 Q6(a), June 2024 Q6(a)

**Universal gates, NAND/NOR (3 of 4)**

- "Implement the Boolean function using only NAND gates:" — Dec 2025 Q2(a)
- "What do you mean by Universal Gates? How to realize AND, OR and NOT functions using universal gates only?" — June 2025 Q2(a)
- "Explain how the basic gates can be realized using NOR gates." — Dec 2023 Q1(b)

## Unit 2 — Combinational Logic

**Adders and subtractors (4 of 4)**

- "Explain the working of a Full Adder with truth table and logic diagram. Why is it required in arithmetic circuits?" — Dec 2025 Q2(b)
- "What is the half subtractor circuit? Design a half subtractor circuit and write all the necessary steps of designing." — June 2025 Q3(b)
- "Draw the truth table of a 2-bit by 2-bit binary multiplier. Implement the same using half adder and required additional logic gates." — Dec 2024 Q6(a)
- "Design a Half adder circuit with truth table and logic diagrams." — Dec 2023 Q2(a), June 2024 Q2(a)

**Look-ahead carry (3 of 4)**

- "Look-ahead carry generator" as a short-note option — Dec 2025 Q8
- "Draw and discuss the circuit of look-ahead carry generator." — June 2025 Q3(a)
- "What are the different types of parallel adders? Explain carry save and carry look-ahead adders." — Dec 2023 Q6(b), June 2024 Q6(b)

**Multiplexers, decoders, combinational design (4 of 4)**

- "Implement the Boolean function F(A,B,C)=Σm(1,3,6,7) using a 4:1 multiplexer." — Dec 2025 Q3(a)
- "Design a decimal-to-BCD encoder and explain its working." — Dec 2025 Q3(b)
- "Explain how decoders and multiplexers can be used to implement combinational circuits." — June 2025 Q4(a)
- "What is a digital multiplexer? Implement a Boolean function F(A,B,C) = Σ(1,3,5,6) with a multiplexer." — June 2025 Q4(b)
- "Realize the Boolean function F(A,B,C)=Σ(1,3,4,5,6,7) using only minimum number of 2-to-4 line decoders" — Dec 2024 Q3(a)
- "A digital circuit which converts a BCD to seven segment is to be designed." — Dec 2024 Q2(b)
- "A combinational circuit is defined by the following Boolean functions. Design circuit with a decoder and external gates:" — Dec 2023 Q2(b), June 2024 Q2(b)

## Unit 3 — Sequential Logic and Semiconductor Memories

**Flip-flops (4 of 4)**

- "Explain the working of a Master–Slave J-K flip-flop with timing diagram." — Dec 2025 Q4(a)
- "S-R Flip-Flop" as a short-note option — Dec 2025 Q8
- "With the help of circuit diagram explain the working of JK flip-flop. Write its characteristics tables and equations." — June 2025 Q5(b)
- "Racing condition" as a short-note option — June 2025 Q8
- "The D flip-flops of Fig. 5 are positive edge triggered." — Dec 2024 Q5(a)
- "Explain the working of the master slave JK flip-flop." — Dec 2023 Q3(a), June 2024 Q3(a)

**Counters (3 of 4)**

- "Explain asynchronous counters and synchronous counters. Compare them with respect to speed and hardware complexity." — Dec 2025 Q4(b)
- "Design a MOD-4 synchronous UP counter using JK flip-flop." — Dec 2024 Q6(b)
- "Design a 3-bit binary UP/DOWN counter with a direction control M. Use T flip-flop." — Dec 2023 Q3(b), June 2024 Q3(b)

**Memories — DRAM, FLASH, ROM, PLA, address mapping (4 of 4)**

- "Implement the Boolean functions using PLA:" — Dec 2025 Q5(a)
- "Give a classification of storage devices. Discuss the modern trends in semiconductor memories such as DRAM, FLASH RAM etc." — June 2025 Q5(a)
- "ROM and PLA" as a short-note option — June 2025 Q8
- "There are four chips each of 1024 bytes connected to a 16-bit address bus" (address mapping) — Dec 2024 Q2(a)
- "Explain: DRAM and FLASH RAM." — Dec 2023 Q7(b), June 2024 Q7(b)

## Unit 4 — Converters, Multivibrators, Logic Families

**A/D and D/A converters (4 of 4)**

- "Explain the working of a Sample and Hold circuit with neat diagram. Why is it required in ADC systems?" — Dec 2025 Q5(b)
- "Discuss the need of A/D and D/A convertors. Draw successive approximation analog to digital converter and explain its working in details." — June 2025 Q7(b)
- "Explain the operation of a dual slope type ADC with a neat and labelled diagram." — Dec 2024 Q3(b)
- "Explain the operation of a 4-bit R-2R ladder DAC using a neat diagram." — Dec 2024 Q5(b)
- "Describe the operation of dual slope A/D converter with necessary diagrams." — Dec 2023 Q8(b)
- "An 8-bit D/A converter has a resolution of 10mV/bit." — Dec 2023 Q8(a)

**IC 555, multivibrators, Schmitt trigger (3 of 4)**

- "Explain the internal block diagram and working of IC 555 Timer. Discuss any two applications of IC 555." — Dec 2025 Q6(a)
- "Schmitt trigger" as a short-note option — June 2025 Q8
- "Explain the operation of a bistable multivibrator built around IC 555." — June 2024 Q1(a)
- "Explain the operation of a Schmitt trigger using IC 555 with a neat and labelled diagram." — June 2024 Q1(b)
- "Explain how a Schmitt Trigger circuit works with a neat diagram." — Dec 2023 Q4(b), June 2024 Q4(b)
- "Derive the frequency of oscillation of an astable multivibrator using IC 555 timer." — Dec 2023 Q7(a), June 2024 Q7(a)

**Logic families (3 of 4)**

- "Explain the need for interfacing between TTL and MOS logic. Discuss TTL-to-CMOS interfacing techniques." — Dec 2025 Q6(b)
- "Compare TTL, PMOS, CMOS and NMOS logic families." — June 2025 Q6(a)
- "Draw and explain the PMOS, NMOS and CMOS logic." — Dec 2023 Q4(a), June 2024 Q4(a)

**Voltage-to-frequency conversion**

- "Write a note on voltage to frequency and frequency to voltage conversion." — June 2025 Q6(b)

## Unit 5 — Digital Communication

**PCM and quantization error (3 of 4)**

- "Explain quantization process and quantization error in PCM. How can quantization noise be reduced?" — Dec 2025 Q7(b)
- "Draw block diagram of Pulse Code Modulation (PCM) and explain it in detail. What do you mean by quantization error and how to minimize it?" — June 2025 Q7(a)
- "What is pulse code modulation? Explain about the quantization and quantization error." — Dec 2024 Q8(a)

**Shannon's channel capacity theorem (3 of 4)**

- "Shannon's Channel Capacity Theorem" as a short-note option — Dec 2025 Q8
- "Shannon's theorem for channel capacity" as a short-note option — June 2025 Q8
- "What is mutual information and how it is related to channel capacity?" — Dec 2023 Q5(a), June 2024 Q5(a)

**Time division multiplexing (2 of 4)**

- "Explain Time Division Multiplexing (TDM) with block diagram. Differentiate between synchronous and asynchronous TDM." — Dec 2025 Q7(a)
- "What do you understand by time division multiplexing?" — Dec 2024 Q7(b)

**BPSK and BFSK modulation (2 of 4)**

- "Explain BPSK modulation scheme." — Dec 2024 Q7(a)
- "Explain BFSK modulation schemes." — Dec 2023 Q5(b), June 2024 Q5(b)

**Nyquist sampling theorem (1 of 4)**

- "Explain Nyquist sampling theorem." — Dec 2024 Q8(b)

## Asked only once in these papers

Voltage-to-frequency conversion (June 2025 Q6(b)), Nyquist sampling theorem (Dec 2024 Q8(b)), 9's and 10's complement (Dec 2024 Q1(a)). Lower priority, but not safe to skip completely.
