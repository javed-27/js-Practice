const numberOfTerms = 6;
let firstTerm = 0;
let secondTerm = 1;
let currentTerm = firstTerm + secondTerm;
console.log(firstTerm, secondTerm, currentTerm);
for (let range = 0; range < (numberOfTerms / 2); range++) {
    firstTerm = secondTerm;
    secondTerm = currentTerm;
    currentTerm = firstTerm + secondTerm;
    console.log(currentTerm);
}
