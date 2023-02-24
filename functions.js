const ExpressError = require('./expresserror');
const fs = require('fs');

function checkNums(nums) {
	if (nums === undefined) {
		throw new ExpressError('nums are required', 400);
	}
	nums = nums.split(',');
	if (nums[0] === '') {
		throw new ExpressError('nums are required', 400);
	} 

    return allNums(nums);
}

function allNums(nums) {
	const mappedNums = nums.map(function(num) {
		return Number(num);
	})
	const badNums = mappedNums.some(function(value, index, array) {
		return isNaN(value);
	});

	if (badNums) {
		throw new ExpressError('the query string passed contains value(s) that are not numbers', 400);
	} else {
		return mappedNums;
	}
}

function getMean(nums) {
	let sum = 0;
	for (let x = 0; x < nums.length; x++) {
		sum += nums[x];
	}
	return sum/nums.length;
}

function getMedian(nums) {
	nums = nums.sort(orderNumbers);

	let median;
	if (nums.length % 2 !== 0) {
		median = nums[Math.floor(nums.length/2)];
	} else {
		median = (nums[(nums.length/2) -1] + nums[nums.length/2]) / 2;
	}
	return median;
}

function getMode(nums) {
	const map = new Map();
	let highestCount = 0;
	let highestNum = [];
	for (let x = 0; x < nums.length; x++) {
		if (map.get(nums[x]) === undefined) {
			map.set(nums[x], 1);
		} else {
			map.set(nums[x], map.get(nums[x]) + 1);
		}

		if (map.get(nums[x]) === highestCount) {
			highestNum.push(nums[x]);
		} else if (map.get(nums[x]) > highestCount) {
			highestNum.length = 0;
			highestNum.push(nums[x]);
			highestCount = map.get(nums[x]);
		}
	}
	return highestNum;
}

function writeToFile(json) {
	fs.writeFile('results.json', JSON.stringify(json, null, 4), "utf8", function(err) {
		if (err) {
			console.error(err);
			process.exit(1);
		  }
		  console.log('Successfully wrote to results.json!');
	});
}

function orderNumbers(a, b) {
	return a - b;
}

module.exports = {
	checkNums,
    getMean,
    getMedian,
    getMode,
	writeToFile
}