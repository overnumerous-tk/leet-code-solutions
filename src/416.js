/*
416. Partition Equal Subset Sum
https://leetcode.com/problems/partition-equal-subset-sum/description/

Given a non-empty array containing only positive integers, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.

Note:
Each of the array element will not exceed 100.
The array size will not exceed 200.
Example 1:

Input: [1, 5, 11, 5]

Output: true

Explanation: The array can be partitioned as [1, 5, 5] and [11].
Example 2:

Input: [1, 2, 3, 5]

Output: false

Explanation: The array cannot be partitioned into equal sum subsets.
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  var sum = 0;
  for (var n = 0; n < nums.length; n++) {
    sum += nums[n];
  }
  if (nums.length <= 1 || sum % 2 !== 0) {
    return false;
  }
  sum /= 2;
  var dp = [true];
  var i, j;
  for (i = 0; i < nums.length; i++) {
    for (j = sum; j >= nums[i]; j--) {
      dp[j] = dp[j] || dp[j - nums[i]];
    }
  }
  return dp[sum] || false;
};


console.log(canPartition([2, 30, 4, 2, 6, 16]));