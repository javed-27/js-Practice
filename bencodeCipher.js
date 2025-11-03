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

function decode(data) {
  return parseInt(data.slice(1, data.length -1));
}

function messageToPrint(description, data, expect, actual) {
  const isPass = expect === actual;
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
}

function testDecodeNumber() {
  heading(" decoding a number ");
  testDecode("checking positive integer", "i123e", 123);
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
}

testAll();
