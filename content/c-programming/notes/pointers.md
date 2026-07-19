---
title: "Pointers"
date: "2026-07-15"
tags: ["pointers", "memory", "core"]
summary: "A variable that stores an address instead of a value — and why that changes everything."
---

## What a pointer actually is

A pointer is just a variable. The only difference: instead of holding a value like `5` or `'a'`, it holds the **memory address** of another variable.

```c
int x = 10;
int *p = &x;   // p now holds the address of x

printf("%d\n", x);    // 10
printf("%p\n", &x);   // address of x
printf("%p\n", p);    // same address
printf("%d\n", *p);   // 10 — dereferencing p gives you x's value
```

## The two operators that matter

- `&` — "address of". Turns a variable into its address.
- `*` — "value at" (dereference). Turns an address into the value stored there.

They're opposites. `*(&x)` is just `x`.

## Why bother

Without pointers, functions in C can't modify the caller's variables — everything is passed by value, copied. Pointers let a function reach back and change the original.

```c
void increment(int *n) {
    *n = *n + 1;
}

int main() {
    int a = 5;
    increment(&a);
    printf("%d\n", a);  // 6, not 5
    return 0;
}
```

> If you passed `int n` instead of `int *n`, the function would only modify its own copy, and `a` would stay 5.

## Common trap

`int *p;` declares a pointer, but it doesn't point anywhere valid yet. Dereferencing it before assignment is undefined behavior — it might crash, might silently corrupt memory. Always initialize.
