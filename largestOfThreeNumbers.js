const firstNumber = 3;
const secondNumber = 5;
const thirdNumber = 5;
const largestNumber = (firstNumber >= secondNumber) ? ((firstNumber >= thirdNumber) ? firstNumber : thirdNumber ) : ((secondNumber >= thirdNumber ) ? secondNumber : thirdNumber )
console.log("largest vaule in ",firstNumber ,secondNumber ,thirdNumber,"is",largestNumber);
