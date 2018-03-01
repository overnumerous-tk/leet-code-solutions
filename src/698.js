/*
698. Partition to K Equal Sum Subsets
https://leetcode.com/problems/partition-to-k-equal-sum-subsets/description/


Given an array of integers nums and a positive integer k, find whether it's possible to divide this array into k non-empty subsets whose sums are all equal.

Example 1:
Input: nums = [4, 3, 2, 3, 5, 2, 1], k = 4
Output: True
Explanation: It's possible to divide it into 4 subsets (5), (1, 4), (2,3), (2,3) with equal sums.
Note:

1 <= k <= len(nums) <= 16.
0 < nums[i] < 10000.
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */

var retrieveSolution = function (matrix, i, j, nums) {
  var result = [];
  var v = j;
  for (var n = i; n >= 0; n--) {
    if (!(matrix[n][v] === matrix[n - 1][v])) {
      result.push(nums[n]);
      v -= nums[n];
    }
  }
  return result;
};

var findPartition = function (nums, sum) {
  var matrix = [];

  var i, j;
  for (i = -1; i < nums.length; i++) {
    var row = [];
    if (i === -1) {
      for (j = -1; j <= sum; j++) {
        row[j] = 0;
      }
    } else {
      row[-1] = 0;
    }
    matrix[i] = row;
  }

  for (j = 0; j <= sum; j++) {
    for (i = 0; i < nums.length; i++) {
      var candidate1 = matrix[i - 1][j];
      var candidate2 = j >= nums[i] ? (matrix[i - 1][j - nums[i]] + nums[i]) : 0;
      matrix[i][j] = Math.max(candidate1, candidate2);
      if (matrix[i][j] === sum) {
        return retrieveSolution(matrix, i, j, nums);
      }
    }
  }

  return null;
};

var subtractArrays = function (array1, array2) {
  for (var i = array1.length - 1; i >= 0; i--) {
    for (var j = array2.length - 1; j >= 0; j--) {
      if (array1[i] === array2[j]) {
        array1.splice(i, 1);
        array2.splice(j, 1);
        if (array2.length == 0) {
          return;
        }
      }
    }
  }
};

var canPartitionKSubsets = function (nums, k) {
  nums.sort(function (a, b) {return parseInt(a) < parseInt(b)});
  var sum = 0;
  for (var n = 0; n < nums.length; n++) {
    sum += nums[n];
  }
  if (sum > 0 && (nums.length < k || sum % k !== 0)) {
    return false;
  }
  sum /= k;

  for (var i = 0; i < k; i++) {
    var p = findPartition(nums, sum);
    if (!p) {
      return false;
    }
    subtractArrays(nums, p);
  }
  return true;
};

console.log(canPartitionKSubsets([114,96,18,190,207,111,73,471,99,20,1037,700,295,101,39,649], 4));