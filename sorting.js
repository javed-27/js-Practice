let numberOfIterations = 0;

function genarateRandomBetween(lowerValue, upperValue) {
  return lowerValue + Math.floor(Math.random() * (upperValue - lowerValue));
}

function randomData(noOfElements) {
  const data = [];
  for (let index = 0; index < noOfElements; index++) {

    data.push(genarateRandomBetween(1, 100));
  }
  return data
}

function sort(data) {
  const sortedArray = data.slice();
  for (let i = 0; i < sortedArray.length; i++) {
    for (let j = i + 1; j < sortedArray.length; j++) {
      numberOfIterations++;
      if (sortedArray[i] > sortedArray[j]) {
        const temp = sortedArray[i];
        sortedArray[i] = sortedArray[j];
        sortedArray[j] = temp;
      }
    }
  }
  return sortedArray;
}

function benchMark(noOfElements) {
  const data = randomData(noOfElements);
  numberOfIterations = 0;
  console.log(`\n----------- sorting data ---------\n`);
  
  const sortedArray = sort(data)
  console.log(`data :: ${data} \nsorted data :: ${sortedArray}`);
  console.log(`benchmark ${noOfElements} | ${numberOfIterations}`);
}

benchMark(9)
