import { green, red } from "jsr:@std/fmt/colors";

export const display = (entries, quizData) => {
  const report = quizData.map(({ question, correct_answer }, i) => {
    const status = entries[i] ? green : red;
    return `${question}\n${status(correct_answer)}`;
  });

  console.log(report.join("\n\n"));
  const message = entries.map((status) => status ? "🌟" : "☠️").join("");
  const total_score = entries.reduce((sum, option) => sum + option);
  console.log(`\n${message} ${(total_score / quizData.length) * 100}%`);
  return report.join("\n\n");
};
