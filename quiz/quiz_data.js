import { shuffle } from "jsr:@std/random";

const url =
  `https://opentdb.com/api.php?amount=10&category=22&type=multiple&difficulty=easy`;
const urlData = await fetch(url).then((raw) => raw.body);
const decoder = new TextDecoder();
const arr = [];

for await (const chunk of urlData) {
  arr.push(decoder.decode(chunk));
}

const data = JSON.parse(arr[0]).results;
export const quizData = data
  .map(({ question, correct_answer, incorrect_answers }) => {
    const options = shuffle([correct_answer, ...incorrect_answers]);
    return ({ question, options, correct_answer });
  });
