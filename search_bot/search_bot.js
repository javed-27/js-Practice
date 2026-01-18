import { search } from "@inquirer/prompts";
import { extractData } from "./extract_data.js";
import { blue, green, red } from "jsr:@std/fmt/colors";
const topic = await search({
  message: "choose topic",
  source: async (input) => {
    console.clear();
    if (input.length < 2) {
      return [];
    }
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=opensearch&search=${input}&limit=5&format=json&origin=*`,
    );
    const body = await response.json();
    const options = body[1];
    return options.map((option) => ({
      name: option,
      value: option,
    }));
  },
});
console.clear();
console.log(`${blue("topic -->")} ${red(topic)}\n`);
console.log(green(await extractData(topic)));
