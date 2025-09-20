const lion = 'L';
const zebra = 'Z';
const testCase1 = "Z Z Z";
const testCase2 = "LL   Z    L   L             Z L        ";
const testCase3 =   "";
const testCaseToUse = testCase3;
let shortestPath = -1;
let lionFoundZebra;
let  zebraFoundLion;
for(let currentAnimal = 0; currentAnimal< testCaseToUse.length ; currentAnimal++) {
    for (let animalHunt = currentAnimal ; animalHunt < testCaseToUse.length; animalHunt++) {
        lionFoundZebra = testCaseToUse[currentAnimal] === lion && testCaseToUse[animalHunt] === zebra;
        zebraFoundLion =  testCaseToUse[currentAnimal] === zebra && testCaseToUse[animalHunt] === lion;
        if( lionFoundZebra|| zebraFoundLion ) {
            let largestIndexValue = (animalHunt>=currentAnimal)? animalHunt : currentAnimal;
            let smallestIndexValue = (animalHunt<=currentAnimal)? animalHunt : currentAnimal
            let path = (largestIndexValue - smallestIndexValue) -1;
            if(path < shortestPath || shortestPath === -1) {
                shortestPath = path;
            }
        }
    } 
}

console.log("Input: ", testCaseToUse, "Output: ", shortestPath);
