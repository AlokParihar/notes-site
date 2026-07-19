---
title: "Swap two numbers without a temp variable"
date: "2026-07-16"
tags: ["pointers", "arithmetic"]
summary: "Classic assignment — swap using arithmetic, then again using pointers."
status: "done"
---

## Problem

Swap two integers without using a third variable.

## Approach 1 — arithmetic

```c
a = a + b;
b = a - b;
a = a - b;
```

Works, but overflows if `a + b` exceeds `int` range.

## Approach 2 — XOR

```c
a = a ^ b;
b = a ^ b;
a = a ^ b;
```

No overflow risk. Only works cleanly on integer types.

## Full program

```c
#include <stdio.h>

void swap(int *a, int *b) {
    if (a == b) return;  // guard: same address
    *a = *a ^ *b;
    *b = *a ^ *b;
    *a = *a ^ *b;
}

int main() {
    int x = 4, y = 9;
    swap(&x, &y);
    printf("x = %d, y = %d\n", x, y);
    return 0;
}
```

**Output:** `x = 9, y = 4`
