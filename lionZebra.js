const lion = 'L';
const zebra = 'Z';
const testCase1 = "Z Z Z";
const testCase2 = "L  Z";
const testCase3 =   "Z    L";
const testCaseToUse = testCase2;
let shortestPath = -1;
let lionFoundZebra;
let  zebraFoundLion;
for(let index1   =0; index1< testCaseToUse.length ; index1++) {
    for (let index2 =0 ; index2 < testCaseToUse.length+1; index2++) {
        lionFoundZebra = testCaseToUse[index1] === lion && testCaseToUse[index2] === zebra;
        zebraFoundLion =  testCaseToUse[index1] === zebra && testCaseToUse[index2] === lion;
        if( lionFoundZebra|| zebraFoundLion ) {
            let largestIndexValue = (index2>=index1)? index2 : index1;
            let smallestIndexValue = (index2<=index1)? index2 : index1
            let path = (largestIndexValue - smallestIndexValue) -1;
            if(path < shortestPath || shortestPath === -1) {
                shortestPath = path;
            }
        }
    }
    
}
console.log("Input: ", testCaseToUse, "Output: ", shortestPath);
