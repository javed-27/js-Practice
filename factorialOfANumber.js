const input = 5;
let currentTerm = 2;
let factorial = 1;
while (currentTerm <= input) {
    factorial = factorial * currentTerm;
    currentTerm = currentTerm + 1;
}
console.log("factorial of",input,"is",factorial) 
