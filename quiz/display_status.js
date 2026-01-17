import { green, red } from "jsr:@std/fmt/colors";

export const display = (entries, quizData) => {
  const report = quizData.map(({ question, correct_answer }, i) => {
    const status = entries[i] ? green : red;
    return status(`${question}\n${correct_answer}`);
  });

  console.log(report.join("\n\n"));
  return report.join("\n\n");
};
