let numberOfIterations = 0;

function genarateRandomBetween(lowerValue, upperValue) {
  return lowerValue + Math.floor(Math.random() * (upperValue - lowerValue));
}

function randomData(noOfElements) {
  const data = [];
  for (let index = 0; index < noOfElements; index++) {
    data.push(genarateRandomBetween(10, 100));
  }
  return data;
}

function heading(text) {
  console.log(`\n ${"-".repeat(20) + text + "-".repeat(20)} \n`);
}

function delay() {
  for (let index = 0; index < 2000000000; index++) {
  }
}

function visualize(data, current) {
  console.clear();
  console.log("-------- insertion sort --------");

  for (let index = 0; index < data.length; index++) {
    if (index === current) {
      console.log(
        `${data[index]} ${"🟥".repeat(Math.round(data[index] / 10) + 1)} `,
      );
    } else {
      console.log(
        `${data[index]} ${"🟪".repeat(Math.round(data[index] / 10) + 1)}`,
      );
    }
  }
  delay();
}

function insertionSort(data) {
  heading(" insertion sort ");
  const sortedArray = data.slice();
  visualize(sortedArray);
  for (let i = 0; i < sortedArray.length; i++) {
    let j = i;
    visualize(sortedArray, i);
    while (sortedArray[j - 1] > sortedArray[j]) {
      numberOfIterations++;
      const temp = sortedArray[j];
      sortedArray[j] = sortedArray[j - 1];
      sortedArray[j - 1] = temp;
      j--;
      visualize(sortedArray, j);
    }
  }
  visualize(sortedArray);
  return sortedArray;
}

function benchMark(noOfElements) {
  const data = randomData(noOfElements);
  numberOfIterations = 0;
  console.log(`data :: ${data} \nsorted data :: ${insertionSort(data)}`);
  console.log(`benchmark ${noOfElements} | ${numberOfIterations}`);
}

benchMark(9);
