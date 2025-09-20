const lion = 'L';
const zebra = 'Z';
const testCase1 = "Z Z Z";
const testCase2 = "L Z";
const testCaseToUse = testCase2;
let shortestPath = -1;
let lionFound = 0;
let zebraFound = 0;
for(let index = 0; index < testCaseToUse.length ; index++) {
    if (testCaseToUse[index] === lion ) {
        lionFound = index;
        console.log("lion found",index);
        
    }
    if (testCaseToUse[index] === zebra ) {
        zebraFound = index;
        console.log("zebra found",index);
        
    }
    shortestPath = (zebraFound -lionFound)-1;
}
console.log("Input: ", testCaseToUse, "Output: ", shortestPath);
