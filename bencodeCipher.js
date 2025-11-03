function encodeList(array) {
  let encodedData = "";
  for (let index = 0; index < array.length; index++) {
    encodedData += encode(array[index]);
  }
  return encodedData;
}

function encode(data) {
  if (typeof (data) === "number") {
    return "i" + data + "e";
  }
  if (typeof (data) === "string") {
    return data.length + ":" + data;
  }
  return "l" + encodeList(data) + "e";
}

function decodeList(data) {
  const decodedArray = [];
  let index = 1;
  while (index < data.length - 1) {
    let decodedData = '';

    if (data[index] === 'l') {
      decodedData = decodeList(data.slice(index, data.length));
    }

    const current = data.slice(index, data.length - 1);
    decodedData = decode(current);
    decodedArray.push(decodedData);
    index += (decodedData + "").length + 2;

    if (typeof (decodedData) === 'string' && decodedData.length >= 10)
      index++;

    if (data[index] === 'e') {
      return decodedArray;
    }

  }
  return decodedArray;
}

function decode(data) {
  if (data[0] === 'i') {
    return parseInt(data.slice(1, data.indexOf('e')));
  }

  if (data[0] === 'l') {
    return decodeList(data);
  }

  const size = parseInt(data);
  const start = (size + "").length + 1;
  return data.slice(start, start + size);
}

function areObjects(element1, element2) {
  return (typeof element1) === "object" && (typeof element2) === "object";
}

function isUndefined(element1, element2) {
  return element1 === undefined || element2 === undefined;
}

function isEqual(array1, array2) {
  let areBothEqual = array1.length === array2.length;
  const end = array1.length;
  let index = 0;

  while (areBothEqual && index < end) {

    if (array1[index] !== array2[index]) {
      areBothEqual = false;
    }

    if (areObjects(array1[index], array2[index])) {
      areBothEqual = isEqual(array1[index], array2[index]);
    }
    index++;
  }
  return areBothEqual;
}

function areDeepEqual(array1, array2) {
  if (isUndefined(array1, array2)) {
    return false;
  }
  const array1Length = array1.length;
  const array2Length = array2.length;
  return array1Length === array2Length ?
    isEqual(array1, array2) : false;
}


function messageToPrint(description, data, expect, actual) {
  const isPass = areDeepEqual(actual, expect);
  const status = isPass ? "✅" : "❌";
  const message = "  " + description;
  const inputFragment = isPass ? "" : "\tinput:|" + data;
  const expectFragment = isPass ? "" : "\n\texpect :  | " + expect;
  const actualFragment = isPass ? "" : "\n\tactual :  | " + actual + "\n\t";
  return status + message + inputFragment + expectFragment + actualFragment;
}

function testEncode(description, data, expect) {
  const actual = encode(data);
  const message = messageToPrint(description, data, expect, actual);
  console.log(message);
}

function testDecode(description, data, expect) {
  const actual = decode(data);
  const message = messageToPrint(description, data, expect, actual);
  console.log(message);
}

function heading(text) {
  console.log(`\n ${"-".repeat(20) + text + "-".repeat(20)} \n`);
}

function testAll() {
  testEncodeNumber();
  testEncodeString();
  testEncodeList();
  testDecodeNumber();
  testDecodeString();
  testDecodeList();
}

function testDecodeList() {
  heading("decoding list");
  testDecode("array of number", "li123ei23ei27ei9ee", [123, 23, 27, 9]);
  testDecode("array of string", "l5:hello11:hello worldi", ["hello", "hello world"]);
  testDecode("array of string and  numbers", "l5:helloi123ei23ei27ei9e11:hello worldi", ["hello", 123, 23, 27, 9, "hello world"]);
  testDecode("nested array", "l3:one3:twol5:threeee", ["one", "two", ["three"]]);
  testDecode("nested array", "l0:i0ele", ["", 0, []]);
}

function testDecodeNumber() {
  heading(" decoding a number ");
  testDecode("checking positive integer", "i123e", 123);
  testDecode("checking negative integer", "i-9e", -9);
}

function testDecodeString() {
  heading("decode string");
  testDecode("checking non empty string", "5:hello", "hello");
  testDecode("checking a empty string", "0:", "");
  testDecode("checking a empty string", "10:javedahmed", "javedahmed");
}

function testEncodeNumber() {
  heading(" encoding a number ");
  testEncode("checking positive integer", 123, "i123e");
  testEncode("checking negative integer", -123, "i-123e");
  testEncode("checking number 0", 0, "i0e");
}

function testEncodeString() {
  heading(" encoding a string ");
  testEncode("checking hello", "hello", "6:hello");
  testEncode("checking empty string", "", "0:");
  testEncode("checking special charecter string", "special!@#$chars", "16:special!@#$chars");
}

function testEncodeList() {
  heading(" encoding a list ");
  testEncode("checking list", [0, "", "test"], "li0e0:4:teste");
  testEncode("checking nested list", ["apple", 123, ["banana", -5]], "l5:applei123el6:bananai-5eee");
  testEncode("checking nested empty list", ["", 0, []], "l0:i0elee");
}

testAll();
