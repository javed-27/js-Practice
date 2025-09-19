const maxRange = 20;
for (let numberToCheck = 1; numberToCheck <= maxRange; numberToCheck++) {
    const evenOddCheck = (numberToCheck % 2 === 0)
    const suffixToBePrint = evenOddCheck ? "is even number" : "is odd number"
    console.log(numberToCheck, suffixToBePrint);
}
