const { getMean, getMedian, getMode } = require("./functions");

describe("getMedian", function() {
  it("returns the median of an even set", function() { 
    expect(getMedian([1, -1, 4, 2])).toEqual(1.5);
  });

  it("returns the median of an odd set", function () { 
    expect(getMedian([1, -1, 4])).toEqual(1);
  });
});

describe("getMean", function () {
  it("returns the mean of an array of numbers", function () { 
    const array = [4,2];
    expect(getMean(array)).toEqual(3);
  });
});

describe("getMode", function () {
  it("returns the mode", function () { 
    expect(getMode([1,1,1,2,2,3])).toEqual([1]);
  });

  it("returns the modes", function () { 
    expect(getMode([1,1,1,2,2,2,3])).toEqual([1,2]);
  });
});