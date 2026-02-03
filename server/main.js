import { serve } from "./server.js";

const main = async () => {
  const listener = Deno.listen({ port: 8000 });
  console.log("Listening on http://localhost:8000");
  for await (const conn of listener) {
    serve(conn);
  }
};

main();
