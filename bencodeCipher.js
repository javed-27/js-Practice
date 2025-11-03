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
  for (let index = 0; index < data.length; index++) {

    if (data[index] === 'i') {
      const current = data.slice(index, data.length);
      decodedArray.push(decode(current));
    }
  }
  return decodedArray;
}

function decode(data) {
  if (data[0] === 'i') {
    return parseInt(data.slice(1, data.indexOf('e')));
  }

  if (data[0] === 'l') {
    return decodeList(data.slice(1, data.length - 1));
  }

  const size = parseInt(data);
  const startSlice = (size + "").length + 1;
  return data.slice(startSlice, startSlice + size);
}

function isEqual(array1, array2) {
  const end = array1.length;
  for (let index = 0; index < end; index++) {
    if (array1[index] !== array2[index]) {
      return false;
    }
  }
  return true;
}

function areEqual(array1, array2) {
  const array1Length = array1.length;
  const array2Length = array2.length;
  return array1Length === array2Length ? isEqual(array1, array2) : false;
}


function messageToPrint(description, data, expect, actual) {
  const isPass = areEqual(actual, expect);
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
  testDecode("array of number", "li123ei23ei27ei9ee", [123, 23, 27, 9]);
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
  testEncode("checking hello", "hello", "5:hello");
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
