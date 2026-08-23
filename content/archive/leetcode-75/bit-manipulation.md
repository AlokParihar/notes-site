---
title: "Bit Manipulation"
date: "2026-08-01"
tags: ["bit-manipulation", "dsa", "leetcode"]
summary: "4 bit manipulation questions — XOR tricks, bit counting, reversal."
---

## 1. Single Number (LeetCode 136)

```cpp
int singleNumber(vector<int>& nums) {
    int result = 0;
    for (int num : nums) result ^= num;
    return result;
}
```

XOR cancels out numbers that appear twice, leaving only the number that appears once.

## 2. Reverse Bits (LeetCode 190)

```cpp
uint32_t reverseBits(uint32_t n) {
    uint32_t result = 0;
    for (int i = 0; i < 32; i++) {
        result = (result << 1) | (n & 1);
        n >>= 1;
    }
    return result;
}
```

Process each bit, shifting the result left and appending the current bit of `n`.

## 3. Number of 1 Bits (LeetCode 191)

```cpp
int hammingWeight(uint32_t n) {
    int count = 0;
    while (n != 0) {
        count += n & 1;
        n >>= 1;
    }
    return count;
}
```

Count set bits by repeatedly masking the least significant bit and shifting right.

## 4. Missing Number (LeetCode 268)

```cpp
int missingNumber(vector<int>& nums) {
    int n = nums.size();
    int totalXOR = 0, arrayXOR = 0;
    for (int i = 0; i <= n; i++) totalXOR ^= i;
    for (int num : nums) arrayXOR ^= num;
    return totalXOR ^ arrayXOR;
}
```
