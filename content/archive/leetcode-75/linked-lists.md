---
title: "Linked Lists"
date: "2026-08-01"
tags: ["linked-lists", "dsa", "leetcode"]
summary: "8 linked list questions — reversal, cycles, merging, and k-group reversal."
---

## 1. Reverse Linked List (LeetCode 206)

```cpp
ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    while (head) {
        ListNode* nextNode = head->next;
        head->next = prev;
        prev = head;
        head = nextNode;
    }
    return prev;
}
```

## 2. Merge Two Sorted Lists (LeetCode 21)

```cpp
ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
    if (!list1) return list2;
    if (!list2) return list1;
    if (list1->val < list2->val) {
        list1->next = mergeTwoLists(list1->next, list2);
        return list1;
    } else {
        list2->next = mergeTwoLists(list1, list2->next);
        return list2;
    }
}
```

## 3. Remove Nth Node From End of List (LeetCode 19)

```cpp
ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode dummy(0, head);
    ListNode* slow = &dummy, *fast = &dummy;
    for (int i = 0; i <= n; ++i) fast = fast->next;
    while (fast) {
        slow = slow->next;
        fast = fast->next;
    }
    slow->next = slow->next->next;
    return dummy.next;
}
```

## 4. Linked List Cycle (LeetCode 141)

**Floyd's cycle detection — slow/fast pointers.**

```cpp
bool hasCycle(ListNode* head) {
    ListNode* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}
```

## 5. Add Two Numbers (LeetCode 2)

```cpp
ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    ListNode dummy, *current = &dummy;
    int carry = 0;
    while (l1 || l2 || carry) {
        int sum = carry;
        if (l1) sum += l1->val, l1 = l1->next;
        if (l2) sum += l2->val, l2 = l2->next;
        carry = sum / 10;
        current->next = new ListNode(sum % 10);
        current = current->next;
    }
    return dummy.next;
}
```

## 6. Intersection of Two Linked Lists (LeetCode 160)

```cpp
ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
    ListNode* a = headA, *b = headB;
    while (a != b) {
        a = a ? a->next : headB;
        b = b ? b->next : headA;
    }
    return a;
}
```

## 7. Palindrome Linked List (LeetCode 234)

```cpp
bool isPalindrome(ListNode* head) {
    ListNode* slow = head, *fast = head, *prev = nullptr;
    while (fast && fast->next) {
        fast = fast->next->next;
        ListNode* temp = slow->next;
        slow->next = prev;
        prev = slow;
        slow = temp;
    }
    if (fast) slow = slow->next;
    while (slow) {
        if (slow->val != prev->val) return false;
        slow = slow->next;
        prev = prev->next;
    }
    return true;
}
```

## 8. Reverse Nodes in k-Group (LeetCode 25)

```cpp
ListNode* reverseKGroup(ListNode* head, int k) {
    ListNode* temp = head;
    for (int i = 0; i < k; ++i) {
        if (!temp) return head;
        temp = temp->next;
    }
    ListNode* prev = nullptr, *current = head, *next = nullptr;
    for (int i = 0; i < k; ++i) {
        next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }
    head->next = reverseKGroup(next, k);
    return prev;
}
```
