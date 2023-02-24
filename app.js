const express = require("express");
const ExpressError = require("./expresserror");
const { checkNums, getMean, getMedian, getMode, writeToFile } = require('./functions');

const app = express();

app.use(express.json());

app.get('/mean', function(req, res) {
	const nums = checkNums(req.query.nums);

	const mean = getMean(nums);

	const json = {response: { operation: "mean", value: mean }}

	if (req.query.save === "true") {
		writeToFile(json);
	}
	return res.json(json);
});

app.get('/median', function(req, res) {
	const nums = checkNums(req.query.nums);

	const median = getMedian(nums);

	const json = {response: { operation: "median", value: median }};
	if (req.query.save === "true") {
		writeToFile(json);
	}
	return res.json(json);
});

app.get('/mode', function(req, res) {
	const nums = checkNums(req.query.nums);

	const highestNum = getMode(nums);

	const json = {response: { operation: "mode", value: highestNum }};

	if (req.query.save === "true") {
		writeToFile(json);
	}
	return res.json(json);
});

app.get('/all', function(req, res) {
	const nums = checkNums(req.query.nums);

	const json = {response: {operation: "all", mean: getMean(nums), median: getMedian(nums), mode: getMode(nums) }};

	if (req.query.save === "true") {
		writeToFile(json);
	}
	return res.json(json);
});

// 404 handler
app.use(function (req, res, next) {
	const notFoundError = new ExpressError("Not Found", 404);
	return next(notFoundError);
});  

//global error handler
app.use(function(err, req, res, next) {
	let status = err.status;
	let message = err.message;
  
	// set the status and alert the user
	return res.status(status).json({
	    error: {message, status}
	});
});

app.listen(3000, function() {
    console.log("Server started on port 3000!")
})