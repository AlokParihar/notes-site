---
title: "Stacks and Queues"
date: "2026-08-01"
tags: ["stacks", "queues", "dsa", "leetcode"]
summary: "Implementations and problems — Min Stack, Daily Temperatures, RPN, and more."
---

## 1. Implement Queue Using Stacks (LeetCode 232)

```cpp
class MyQueue {
    stack<int> s1, s2;
public:
    void push(int x) { s1.push(x); }
    int pop() {
        peek();
        int top = s2.top();
        s2.pop();
        return top;
    }
    int peek() {
        if (s2.empty()) {
            while (!s1.empty()) { s2.push(s1.top()); s1.pop(); }
        }
        return s2.top();
    }
    bool empty() { return s1.empty() && s2.empty(); }
};
```

## 2. Implement Stack Using Queues (LeetCode 225)

```cpp
class MyStack {
    queue<int> q1, q2;
public:
    void push(int x) {
        q2.push(x);
        while (!q1.empty()) { q2.push(q1.front()); q1.pop(); }
        swap(q1, q2);
    }
    int pop() { int top = q1.front(); q1.pop(); return top; }
    int top() { return q1.front(); }
    bool empty() { return q1.empty(); }
};
```

## 3. Min Stack (LeetCode 155)

```cpp
class MinStack {
    stack<int> s, minS;
public:
    void push(int val) {
        s.push(val);
        if (minS.empty() || val <= minS.top()) minS.push(val);
    }
    void pop() {
        if (s.top() == minS.top()) minS.pop();
        s.pop();
    }
    int top() { return s.top(); }
    int getMin() { return minS.top(); }
};
```

## 4. Daily Temperatures (LeetCode 739)

```cpp
vector<int> dailyTemperatures(vector<int>& temperatures) {
    stack<int> s;
    vector<int> res(temperatures.size(), 0);
    for (int i = 0; i < temperatures.size(); ++i) {
        while (!s.empty() && temperatures[i] > temperatures[s.top()]) {
            int index = s.top();
            s.pop();
            res[index] = i - index;
        }
        s.push(i);
    }
    return res;
}
```

## 5. Evaluate Reverse Polish Notation (LeetCode 150)

```cpp
int evalRPN(vector<string>& tokens) {
    stack<int> s;
    for (string& token : tokens) {
        if (token == "+" || token == "-" || token == "*" || token == "/") {
            int b = s.top(); s.pop();
            int a = s.top(); s.pop();
            if (token == "+") s.push(a + b);
            else if (token == "-") s.push(a - b);
            else if (token == "*") s.push(a * b);
            else s.push(a / b);
        } else {
            s.push(stoi(token));
        }
    }
    return s.top();
}
```

## 6. Next Greater Element I (LeetCode 496)

```cpp
vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
    unordered_map<int, int> map;
    stack<int> s;
    for (int num : nums2) {
        while (!s.empty() && s.top() < num) {
            map[s.top()] = num;
            s.pop();
        }
        s.push(num);
    }
    vector<int> res;
    for (int num : nums1) res.push_back(map.count(num) ? map[num] : -1);
    return res;
}
```
