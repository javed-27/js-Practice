let decimalValue = 8;
const valueToPrint = decimalValue;
let currentDigitPlace = 1;
let binaryValue = 0;
while (decimalValue != 0) {
    let lastDigit = (decimalValue % 2);
    binaryValue += currentDigitPlace * lastDigit;
    currentDigitPlace *= 10;
    decimalValue = (decimalValue % 2 === 0) ? decimalValue : --decimalValue;
    decimalValue = decimalValue / 2;
}
console.log("binary value of",valueToPrint,"is",binaryValue);

