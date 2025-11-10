  let numberOfIterations = 0;

  function genarateRandomBetween(lowerValue, upperValue) {
    return lowerValue + Math.floor(Math.random() * (upperValue - lowerValue));
  }

  function randomData(noOfElements) {
    const data = [];
    for (let index = 0; index < noOfElements; index++) {

      data.push(genarateRandomBetween(10, 100));
    }
    return data
  }

  function delay() {
    for (let index = 0; index < 1000000000; index++) {
    }
  }

  function visualize(data, current = 0, fixed=0, symbol = '🟪') {
    console.clear();
    console.log("-------- bubble sort --------");
    
    for (let index = 0; index < data.length; index++) {
      if (index === current || index === fixed) 
        console.log(`${data[index]} ${symbol.repeat(Math.round(data[index] / 10) + 1)} `);
      else
        console.log(`${data[index]} ${'🟪'.repeat(Math.round(data[index] / 10) + 1)}`);
    }
    delay();
  }

  function sort(data) {
    const sortedArray = data.slice();
    visualize(sortedArray);
    for (let i = 0; i < sortedArray.length; i++) {
      for (let j = i + 1; j < sortedArray.length; j++) {
        numberOfIterations++;
        visualize(sortedArray, j,i,'🟥');
        if (sortedArray[i] > sortedArray[j]) {
          const temp = sortedArray[i];
          sortedArray[i] = sortedArray[j];
          sortedArray[j] = temp;
          visualize(sortedArray, j,i,'🟥');
        }
      }
      visualize(sortedArray)
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
