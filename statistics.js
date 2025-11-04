let numberOfIterations = 0;

function genarateRandomBetween(lowerValue, upperValue) {
  return lowerValue + Math.floor(Math.random() * (upperValue - lowerValue));
}

function heading(text) {
  console.log(`\n ${"-".repeat(20) + text + "-".repeat(20)} \n`);
}

function randomData(noOfElements) {
  const data = [];
  for (let index = 0; index < noOfElements; index++) {
    data.push(genarateRandomBetween(1, 100));
  }

  return data
}

function meanOf(data) {
  const sortedData = sort(data)
  let sum = 0;
  for (let index = 0; index < sortedData.length; index++) {
    sum += sortedData[index];
  }

  return Math.floor(sum / sortedData.length);
}

function medianOf(data) {
  heading("median");
  const sortedData = sort(data);
  const middle = Math.floor(sortedData.length / 2);
  const median = (sortedData.length % 2 === 0) ?
    (sortedData[middle] + sortedData[middle - 1]) / 2 : sortedData[middle];
  return median;
}

function strandardDeviationOf(data) {
  heading(" standard deviation ");
  const sortedData = sort(data);
  let sumOfSquares = 0;
  const mean = meanOf(sortedData);
  for (let index = 0; index < sortedData.length; index++) {
    sumOfSquares += Math.pow(sortedData[index] - mean, 2);
  }
  const strandardDeviation = Math.sqrt(sumOfSquares) / sortedData.length;
  return strandardDeviation;
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
  heading("sorting of data")
  const data = randomData(noOfElements);
  numberOfIterations = 0;
  const sortedData = sort(data)
  console.log(`data :: ${data} \nsorted data :: ${sortedData}`);
  console.log(`benchmark ${noOfElements} | ${numberOfIterations}`);
  statistics(data);
}

function statistics(data) {
  heading("mean of data");
  console.log(`Mean of data :: ${meanOf(data)}`);
  console.log(`median of data :: ${medianOf(data)}`);
  console.log(`standard deviation of data :: ${strandardDeviationOf(data)}`);
}

benchMark(10);
