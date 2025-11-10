const removeDuplicates = (distinct, currentValue) => {
  if (!distinct.includes(currentValue)) {
    distinct.push(currentValue);
  }
  return distinct;
};

const unique = (ele, index, array) => occurence(array, ele) === 1;

const sumOfArray = (sum, currentValue) => sum + currentValue;

const reduceArray = (data, reducer, initialValue) =>
  data.flat().reduce(reducer, initialValue);

const occurence = (data, target) => {
  return data.reduce((counter, currentValue) => {
    return (currentValue === target) ? ++counter : counter;
  }, 0);
};

const convertToList = (array) => array.flat();

const isPresent = (data, criteria) =>
  data.flat()
    .some((currentValue) => currentValue === criteria);

const frequency = (distinct, currentValue) => {
  const ocurred = distinct.find((x) => x[0] === currentValue);
  if (ocurred) {
    ocurred[1] += 1;
  } else {
    distinct.push([currentValue, 1]);
  }
  return distinct;
};

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
console.log(`-> 11 :: ${isPresent([["la", "la"],["mi"],["so", "la"]], 'so')}`);
console.log(`-> 12 :: ${reduceArray([[4, 6],[2, 3, 1],[5]], sumOfArray, 0)}`);
console.log(`-> 13 :: ${["small", "large", "medium", "small"].filter(unique)}`);
console.log(`-> 14 :: ${[["blue", "yellow"],["yellow", "green"],["blue"]].flat().filter(unique)}`);
console.log(`-> 15 :: ${occurence(["deer", "deer", "rabbit", "deer"],'deer')}`);
console.log(`-> 65 :: ${[1, 2, 3, 1, 3, 1, 2, 4, 5, 6].reduce(frequency, [])}`);
console.log(`-> 16 :: ${[[1, 2],[3],[2, 4, 1]].flat().reduce(removeDuplicates,[])}`);
console.log(`-> 17 :: ${[["step", "tap"],["turn", "step"]].flat().some(currentValue => currentValue === 'turn')}`);
console.log(`-> 18 :: ${[[1, 2, 1],[3],[2]].flat().reduce(sumOfArray,0)}`);
console.log(`-> 19 :: ${[[3, 2],[1],[4]].flat().reduce(sumOfArray,0)}`);
console.log(`-> 20 :: ${[[3, 2],[1],[4]].flat().reduce(sumOfArray,0)}`);
console.log(`-> 21 :: ${[[2, 3],[1],[3, 2]].flat().reduce(sumOfArray,0)}`);
console.log(`-> 22 :: ${[["Inception", "Dunkirk"],["Interstellar"],["Inception"]].flat().filter(unique,[])}`);
console.log(`-> 23 :: ${[["A", "B", "A", "C", "B"]].flat().reduce(removeDuplicates,[])}`);
console.log(`-> 24 :: ${occurence([["vanilla", "chocolate"],["strawberry"],["chocolate"]].flat(),'chocolate')}`);
console.log(`-> 25 :: ${[["rose", "lily"],["lily", "tulip"]].flat().filter(unique,[])}`);
console.log(`-> 26 :: ${[["rose", "lily"],["lily", "tulip"]].flat().filter(unique,[])}`);
