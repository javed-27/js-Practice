let number = 978;
const numberToPrint = number;
let reverseOfNumber = 0;
while ( number != 0) {
    const lastDigit = number % 10;
    reverseOfNumber = (reverseOfNumber * 10) +  lastDigit;
    number = number - lastDigit;
    number = number / 10;
}
console.log("reverse of the number",numberToPrint,"is",reverseOfNumber);
