import { DatabaseSync } from "node:sqlite";

const main = () => {
  const db = new DatabaseSync("database/database.db");
  db.exec(`
    CREATE TABLE IF NOT EXISTS details (
    user_name TEXT  ,
    name TEXT  ,
    email TEXT  ,
    password TEXT
    );
`);
};

main();
