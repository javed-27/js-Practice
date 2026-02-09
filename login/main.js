import { manager } from "./login.js";
const main = () => {
  Deno.serve(manager);
};

main();
