const removeDuplicates = (distinct, currentValue) => {
  if (!distinct.includes(currentValue)) {
    distinct.push(currentValue);
  }
  return distinct;
};

const sumOfArray = (sum, currentValue) => {
  return sum + currentValue;
}

const reduceArray = (data, reducer, initialValue) => {
  return data.flat().reduce(reducer, initialValue)
}

const occurence = (data, target) => {
  return data.reduce(((counter, currentValue) => 
    { return (currentValue === target) ? ++counter : counter; }), 0);
}

const convertToList = (array) => {
  return array.flat();
}

const isPresent = (data, criteria) => {
  return data.flat().some((currentValue) => { return currentValue === criteria });
}

console.log(`-> 1 :: ${occurence(["red", "blue", "red", "green", "red", "blue"], 'blue')}`);
console.log(`-> 2 :: ${convertToList([["Orion", "Leo"], ["Taurus"], ["Orion", "Gemini"]])}`);
console.log(`-> 3 :: ${reduceArray(["sparrow", "crow", "sparrow", "eagle", "crow"], removeDuplicates, [])}`);
console.log(`-> 4 :: ${reduceArray([["Asha", "Ravi", "Neel"], ["Ravi"], ["Asha", "Meera"]], removeDuplicates, [])}`);
console.log(`-> 5 :: ${reduceArray([[5, 3], [2], [4, 1]], sumOfArray, 0)}`);
console.log(`-> 6 :: ${isPresent([["mi", "fa", "so"], ["do", "mi"], ["fa"]], 'do')}`);
console.log(`-> 7 :: ${[[22, 23], [25, 24, 22], [29]].flat().every((currentValue) => { return currentValue < 32 })}`);
console.log(`-> 8 :: ${[[2, 3, 2], [4], [1, 1]].flat().reduce((sum, currentValue) => { return sum + currentValue }, 0)}`);
console.log(`-> 9 :: ${occurence(["Dune", "Dune", "Foundation", "Dune"], 'Dune')}`);
console.log(`-> 10 :: ${reduceArray([["rice", "lentils"], ["rice"], ["curd", "lentils"]], removeDuplicates, [])}`);
