let NUMBER_OF_TIMES = 0;

const frequencyTable_array = (distinct, target) => {
  const ocurred = distinct.find((currentValue) => {
    NUMBER_OF_TIMES++;
    return currentValue[0] === target;
  });

  if (ocurred === undefined) {
    distinct.push([target, 1]);
  } else {
    ocurred[1]++;
  }
  return distinct;
};

const frequencyTable_object = (data) => {
  return data.reduce((distinct, target) => {
    const currentFreq = distinct[target] || 0;
    distinct[target] = currentFreq + 1;
    return distinct;
  }, {});
};

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

const data = randomData(10000000);
const table_array = data.reduce(frequencyTable_array, []);
console.log(table_array);
const table_object = frequencyTable_object(data);
console.log(table_object);
console.log(NUMBER_OF_TIMES);
