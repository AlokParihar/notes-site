---
title: "Strings"
date: "2026-08-01"
tags: ["strings", "dsa", "leetcode"]
summary: "10 string questions — Valid Parentheses, Anagrams, Palindromes, and more."
---

## 1. Valid Parentheses (LeetCode 20)

```cpp
bool isValid(string s) {
    stack<char> st;
    unordered_map<char, char> map = {{')', '('}, {'}', '{'}, {']', '['}};
    for (char c : s) {
        if (map.count(c)) {
            if (st.empty() || st.top() != map[c]) return false;
            st.pop();
        } else {
            st.push(c);
        }
    }
    return st.empty();
}
```

## 2. Valid Palindrome (LeetCode 125)

```cpp
bool isPalindrome(string s) {
    int left = 0, right = s.size() - 1;
    while (left < right) {
        while (left < right && !isalnum(s[left])) ++left;
        while (left < right && !isalnum(s[right])) --right;
        if (tolower(s[left]) != tolower(s[right])) return false;
        ++left; --right;
    }
    return true;
}
```

## 3. Valid Anagram (LeetCode 242)

```cpp
bool isAnagram(string s, string t) {
    if (s.size() != t.size()) return false;
    vector<int> count(26, 0);
    for (char c : s) count[c - 'a']++;
    for (char c : t) {
        if (--count[c - 'a'] < 0) return false;
    }
    return true;
}
```

## 4. Group Anagrams (LeetCode 49)

```cpp
vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string, vector<string>> map;
    for (string s : strs) {
        string sorted = s;
        sort(sorted.begin(), sorted.end());
        map[sorted].push_back(s);
    }
    vector<vector<string>> result;
    for (auto& pair : map) result.push_back(pair.second);
    return result;
}
```

## 5. Longest Palindromic Substring (LeetCode 5)

```cpp
string longestPalindrome(string s) {
    int n = s.size(), start = 0, maxLength = 1;
    vector<vector<bool>> dp(n, vector<bool>(n, false));
    for (int i = 0; i < n; ++i) dp[i][i] = true;
    for (int i = n - 1; i >= 0; --i) {
        for (int j = i + 1; j < n; ++j) {
            if (s[i] == s[j] && (j - i == 1 || dp[i + 1][j - 1])) {
                dp[i][j] = true;
                if (j - i + 1 > maxLength) {
                    start = i;
                    maxLength = j - i + 1;
                }
            }
        }
    }
    return s.substr(start, maxLength);
}
```

## 6. Minimum Window Substring (LeetCode 76)

```cpp
string minWindow(string s, string t) {
    unordered_map<char, int> freq;
    for (char c : t) freq[c]++;
    int left = 0, minLen = INT_MAX, count = 0, start = 0;
    for (int right = 0; right < s.size(); ++right) {
        if (--freq[s[right]] >= 0) ++count;
        while (count == t.size()) {
            if (minLen > right - left + 1) {
                minLen = right - left + 1;
                start = left;
            }
            if (++freq[s[left++]] > 0) --count;
        }
    }
    return minLen == INT_MAX ? "" : s.substr(start, minLen);
}
```

## 7. Find the Index of the First Occurrence (LeetCode 28)

```cpp
int strStr(string haystack, string needle) {
    int m = haystack.size(), n = needle.size();
    for (int i = 0; i <= m - n; ++i) {
        if (haystack.substr(i, n) == needle) return i;
    }
    return -1;
}
```

## 8. String Compression (LeetCode 443)

```cpp
int compress(vector<char>& chars) {
    int index = 0, n = chars.size();
    for (int i = 0; i < n;) {
        char c = chars[i];
        int count = 0;
        while (i < n && chars[i] == c) { ++i; ++count; }
        chars[index++] = c;
        if (count > 1) {
            for (char digit : to_string(count)) chars[index++] = digit;
        }
    }
    return index;
}
```

## 9. Longest Common Prefix (LeetCode 14)

```cpp
string longestCommonPrefix(vector<string>& strs) {
    if (strs.empty()) return "";
    string prefix = strs[0];
    for (int i = 1; i < strs.size(); ++i) {
        while (strs[i].find(prefix) != 0) {
            prefix = prefix.substr(0, prefix.size() - 1);
            if (prefix.empty()) return "";
        }
    }
    return prefix;
}
```

## 10. Repeated Substring Pattern (LeetCode 459)

```cpp
bool repeatedSubstringPattern(string s) {
    string doubled = s + s;
    return doubled.substr(1, doubled.size() - 2).find(s) != string::npos;
}
```
