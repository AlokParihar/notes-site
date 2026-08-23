---
title: "Trees"
date: "2026-08-01"
tags: ["trees", "dsa", "leetcode"]
summary: "8 binary tree questions — traversals, depth, symmetry, balance."
---

## 1. Maximum Depth of Binary Tree (LeetCode 104)

```cpp
int maxDepth(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(maxDepth(root->left), maxDepth(root->right));
}
```

## 2. Same Tree (LeetCode 100)

```cpp
bool isSameTree(TreeNode* p, TreeNode* q) {
    if (!p && !q) return true;
    if (!p || !q || p->val != q->val) return false;
    return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
}
```

## 3. Symmetric Tree (LeetCode 101)

```cpp
bool isMirror(TreeNode* t1, TreeNode* t2) {
    if (!t1 && !t2) return true;
    if (!t1 || !t2 || t1->val != t2->val) return false;
    return isMirror(t1->left, t2->right) && isMirror(t1->right, t2->left);
}
bool isSymmetric(TreeNode* root) {
    return isMirror(root, root);
}
```

## 4. Binary Tree Preorder Traversal (LeetCode 144)

```cpp
vector<int> preorderTraversal(TreeNode* root) {
    vector<int> result;
    stack<TreeNode*> st;
    if (root) st.push(root);
    while (!st.empty()) {
        TreeNode* curr = st.top(); st.pop();
        result.push_back(curr->val);
        if (curr->right) st.push(curr->right);
        if (curr->left) st.push(curr->left);
    }
    return result;
}
```

## 5. Binary Tree Inorder Traversal (LeetCode 94)

```cpp
vector<int> inorderTraversal(TreeNode* root) {
    vector<int> result;
    stack<TreeNode*> st;
    TreeNode* curr = root;
    while (curr || !st.empty()) {
        while (curr) { st.push(curr); curr = curr->left; }
        curr = st.top(); st.pop();
        result.push_back(curr->val);
        curr = curr->right;
    }
    return result;
}
```

## 6. Binary Tree Postorder Traversal (LeetCode 145)

```cpp
vector<int> postorderTraversal(TreeNode* root) {
    vector<int> result;
    stack<TreeNode*> st;
    TreeNode* lastVisited = nullptr;
    while (root || !st.empty()) {
        if (root) { st.push(root); root = root->left; }
        else {
            TreeNode* node = st.top();
            if (node->right && node->right != lastVisited) {
                root = node->right;
            } else {
                result.push_back(node->val);
                lastVisited = node;
                st.pop();
            }
        }
    }
    return result;
}
```

## 7. Binary Tree Level Order Traversal (LeetCode 102)

```cpp
vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> result;
    if (!root) return result;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int size = q.size();
        vector<int> level;
        for (int i = 0; i < size; ++i) {
            TreeNode* curr = q.front(); q.pop();
            level.push_back(curr->val);
            if (curr->left) q.push(curr->left);
            if (curr->right) q.push(curr->right);
        }
        result.push_back(level);
    }
    return result;
}
```

## 8. Balanced Binary Tree (LeetCode 110)

```cpp
int height(TreeNode* root) {
    if (!root) return 0;
    int leftHeight = height(root->left);
    int rightHeight = height(root->right);
    if (leftHeight == -1 || rightHeight == -1 || abs(leftHeight - rightHeight) > 1)
        return -1;
    return 1 + max(leftHeight, rightHeight);
}
bool isBalanced(TreeNode* root) {
    return height(root) != -1;
}
```
