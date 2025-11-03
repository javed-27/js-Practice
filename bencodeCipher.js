function encodeList(array) {
  let encodedData= "";
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
    return data.length+":"+data;
  }
    return "l" + encodeList(data) + "e";
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
function heading() {

}

function testAll() {
  testEncodeNumber();
  testEncodeString();
  testEncodeList();
}

function testEncodeNumber() {
  testEncode("checking positive number", 123, "i123e");
  testEncode("checking negative number", -123, "i-123e");
  testEncode("checking number 0", 0, "i0e");
}

function testEncodeString() {
  testEncode("checking hello", "hello", "5:hello");
  testEncode("checking empty string", "", "0:");
  testEncode("checking special charecter string", "special!@#$chars", "16:special!@#$chars");
}

function testEncodeList() {
  testEncode("checking list", [0, "", "test"], "li0e0:4:teste");
  testEncode("checking nested list", ["apple", 123, ["banana", -5]], "l5:applei123el6:bananai-5eee");
}

testAll();
