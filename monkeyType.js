import { bgBrightRed, bgGreen, cyan } from "jsr:@std/fmt/colors";
const encoder = new TextEncoder();
const decoder = new TextDecoder();

const printOnScreen = async (enteredData, actualData, position) => {
  console.clear();
  const dataToPrint = enteredData.join("") + cyan(actualData.slice(position));
  const encodedData = encoder.encode(dataToPrint);
  await Deno.stdout.write(encodedData);
};

const reportOf = ({ totalChars, correct }, time) => {
  const timeInMinutes = time / 60000;
  const wpm = (totalChars / 5) / timeInMinutes;
  const accuracy = (correct / totalChars) * 100;
  return {
    wpm: Math.round(wpm),
    accuracy: accuracy.toFixed(2) + "%",
  };
};

const formatReport = ({ wpm, accuracy }, timeTaken) => {
  const time = timeTaken / 1000;
  const result = "\n\n----- Typing Test Result -----\n" +
    ("WPM      : " + wpm + "\n") +
    "Accuracy : " + accuracy + "\n" +
    "Time     : " + time + " seconds\n" +
    "------------------------------";
  console.log(result);
};

const statsOf = (enteredData) => {
  const regex = /42m/g;
  const totalChars = enteredData.length;
  const correct = (enteredData.join("").match(regex) || []).length;
  const errors = enteredData.length - correct;
  return { correct, errors, totalChars };
};

Deno.stdin.setRaw(true);
const url = "https://en.wikipedia.org/api/rest_v1/page/random/summary";
const response = await fetch(url);
const fetched = await response.json();
const data = fetched.extract;
const enteredData = [];
printOnScreen(enteredData, data, 0);
const start = Date.now();

let i = 0;
while (i < data.length) {
  const buffer = new Uint8Array(1);
  await Deno.stdin.read(buffer);

  if (buffer[0] === 127) {
    enteredData.pop();
    i--;
  } else {
    const decodedBuffer = decoder.decode(buffer);
    const color = decodedBuffer === data[i] ? bgGreen : bgBrightRed;
    enteredData.push(color(decodedBuffer));
    i++;
  }
  printOnScreen(enteredData, data, i);
}

const end = Date.now();
const stats = statsOf(enteredData);
const timeTaken = end - start;
const report = reportOf(stats, timeTaken);
formatReport(report, timeTaken);
