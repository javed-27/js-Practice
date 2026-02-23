import { loginManager } from "./login.js";
const main = () => {
  Deno.serve({ port: 8080 }, loginManager);
};

main();
