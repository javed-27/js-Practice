import { checkbox } from "@inquirer/prompts";
import { quizData } from "./quiz_data.js";
import { display } from "./display_status.js";

const entries = [];
for (const { question, options, correct_answer } of quizData.slice(5)) {
  console.clear();
  console.log(correct_answer);
  const answer = await checkbox({
    message: question,
    choices: [
      { name: options[0], value: options[0] },
      { name: options[1], value: options[1] },
      { name: options[2], value: options[2] },
      { name: options[3], value: options[3] },
    ],
    validate: (choice) => {
      if (choice.length === 1) {
        return true;
      }
      return "select one option";
    },
  });
  const score = answer[0] === correct_answer ? 1 : 0;
  entries.push(score);
}

console.clear();
const total_score = entries.reduce((sum, option) => sum + option);
console.log(` score is ${total_score}/${quizData.length}`);

display(entries, quizData);
