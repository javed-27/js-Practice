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

function heading(text) {
  console.log(`\n ${"-".repeat(20) + text + "-".repeat(20)} \n`);
}

function insertionSort(data) {
  heading(" insertion sort ");
  const sortedArray = data.slice();
  for (let i = 0; i < sortedArray.length; i++) {
    let j = i;
    while (sortedArray[j - 1] > sortedArray[j]) {
      numberOfIterations++;
      const temp = sortedArray[j];
      sortedArray[j] = sortedArray[j - 1];
      sortedArray[j - 1] = temp;
      j--;
    }
  }
  return sortedArray;
}

function benchMark(noOfElements) {
  const data = randomData(noOfElements);
  numberOfIterations = 0;
  console.log(`data :: ${data} \nsorted data :: ${insertionSort(data)}`);
  console.log(`benchmark ${noOfElements} | ${numberOfIterations}`);
}

benchMark(9)
