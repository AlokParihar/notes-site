---
title: "Arrays"
date: "2026-08-01"
tags: ["arrays", "dsa", "leetcode"]
summary: "10 essential array questions — Two Sum, Kadane's, 3Sum, and more."
---

## 1. Two Sum (LeetCode 1)

**Problem:** Find two numbers in the array that add up to a specific target.

```cpp
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map; // value -> index
    for (int i = 0; i < nums.size(); ++i) {
        int complement = target - nums[i];
        if (map.find(complement) != map.end()) {
            return {map[complement], i};
        }
        map[nums[i]] = i;
    }
    return {};
}
```

## 2. Best Time to Buy and Sell Stock (LeetCode 121)

**Problem:** Maximize profit by choosing one day to buy and another to sell.

```cpp
int maxProfit(vector<int>& prices) {
    int minPrice = INT_MAX, maxProfit = 0;
    for (int price : prices) {
        minPrice = min(minPrice, price);
        maxProfit = max(maxProfit, price - minPrice);
    }
    return maxProfit;
}
```

## 3. Merge Sorted Array (LeetCode 88)

**Problem:** Merge two sorted arrays into one sorted array in-place.

```cpp
void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
    int i = m - 1, j = n - 1, k = m + n - 1;
    while (i >= 0 && j >= 0) {
        nums1[k--] = (nums1[i] > nums2[j]) ? nums1[i--] : nums2[j--];
    }
    while (j >= 0) {
        nums1[k--] = nums2[j--];
    }
}
```

## 4. Contains Duplicate (LeetCode 217)

```cpp
bool containsDuplicate(vector<int>& nums) {
    unordered_set<int> set;
    for (int num : nums) {
        if (set.count(num)) return true;
        set.insert(num);
    }
    return false;
}
```

## 5. Product of Array Except Self (LeetCode 238)

```cpp
vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size();
    vector<int> res(n, 1);
    int left = 1, right = 1;
    for (int i = 0; i < n; ++i) {
        res[i] *= left; left *= nums[i];
        res[n - 1 - i] *= right; right *= nums[n - 1 - i];
    }
    return res;
}
```

## 6. Maximum Subarray (LeetCode 53)

**Kadane's Algorithm.**

```cpp
int maxSubArray(vector<int>& nums) {
    int maxSum = nums[0], currentSum = nums[0];
    for (int i = 1; i < nums.size(); ++i) {
        currentSum = max(nums[i], currentSum + nums[i]);
        maxSum = max(maxSum, currentSum);
    }
    return maxSum;
}
```

## 7. 3Sum (LeetCode 15)

**Problem:** Find all unique triplets that sum to zero.

```cpp
vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> res;
    for (int i = 0; i < nums.size() - 2; ++i) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int left = i + 1, right = nums.size() - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                res.push_back({nums[i], nums[left], nums[right]});
                while (left < right && nums[left] == nums[left + 1]) ++left;
                while (left < right && nums[right] == nums[right - 1]) --right;
                ++left; --right;
            } else if (sum < 0) ++left;
            else --right;
        }
    }
    return res;
}
```

## 8. Merge Intervals (LeetCode 56)

```cpp
vector<vector<int>> merge(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> merged;
    for (auto& interval : intervals) {
        if (merged.empty() || merged.back()[1] < interval[0]) {
            merged.push_back(interval);
        } else {
            merged.back()[1] = max(merged.back()[1], interval[1]);
        }
    }
    return merged;
}
```

## 9. Container With Most Water (LeetCode 11)

```cpp
int maxArea(vector<int>& height) {
    int left = 0, right = height.size() - 1, maxWater = 0;
    while (left < right) {
        maxWater = max(maxWater, min(height[left], height[right]) * (right - left));
        if (height[left] < height[right]) ++left;
        else --right;
    }
    return maxWater;
}
```

## 10. Rotate Image (LeetCode 48)

**Problem:** Rotate a matrix 90 degrees clockwise, in-place.

```cpp
void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();
    for (int i = 0; i < n; ++i)
        for (int j = i; j < n; ++j)
            swap(matrix[i][j], matrix[j][i]);
    for (auto& row : matrix)
        reverse(row.begin(), row.end());
}
```
