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

  function wait() {
    for (let index = 0; index < 2000000000; index++) {
    }
  }

  function visualize(data, current = 0) {
    console.clear();
    for (let index = 0; index < data.length; index++) {
      if (index === current) console.log('🟧'.repeat(Math.round(data[index] / 10) + 1));
      else
        console.log('🟪'.repeat(Math.round(data[index] / 10) + 1));
    }
    wait();
  }

  function sort(data) {
    const sortedArray = data.slice();
    visualize(sortedArray);
    for (let i = 0; i < sortedArray.length; i++) {
      for (let j = i + 1; j < sortedArray.length; j++) {
        numberOfIterations++;
        visualize(sortedArray, j);
        if (sortedArray[i] > sortedArray[j]) {
          const temp = sortedArray[i];
          sortedArray[i] = sortedArray[j];
          visualize(sortedArray, j);
          sortedArray[j] = temp;
          visualize(sortedArray, i);
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
