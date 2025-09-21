const numberOfTerms = 3;
let firstTerm = 0;
let secondTerm = 1;
let currentTerm = firstTerm + secondTerm ;
console.log(firstTerm , secondTerm, currentTerm);
firstTerm = secondTerm ;
secondTerm = currentTerm;
currentTerm = firstTerm + secondTerm ;
console.log(currentTerm);
