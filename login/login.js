import { DatabaseSync } from "node:sqlite";

const isUser = ({ user_id, password }) => {
  const db = new DatabaseSync("database/database.db");
  const query = `select * from details
                where user_id = ? and password = ?;`;
  const statement = db.prepare(query);
  return statement.all(user_id, password).length > 0;
};

const login = async (request) => {
  console.log(request);
  const data = await request.json();
  const haveAcess = isUser(data);
  if (haveAcess) {
    return new Response(JSON.stringify("access granted"));
  }
  return new Response(JSON.stringify("Invalid user_name or password"));
};

const createAccount = ({ user_id, password }) => {
  const db = new DatabaseSync("database/database.db");
  const query = `INSERT INTO details(user_id,password)
                VAlUES(?,?)`;
  const statement = db.prepare(query);
  return statement.run(user_id, password);
};

const signUp = async (request) => {
  console.log(request);
  const data = await request.json();
  const haveAcess = isUser(data);
  if (!haveAcess) {
    createAccount(data);
    return new Response(JSON.stringify("account created"));
  }
  return new Response(JSON.stringify("your are already a user"));
};

export const manager = (request) => {
  const url = new URL(request.url);
  const path = url.pathname;
  console.log(url);

  const method = {
    "/": login,
    "/login": login,
    "/signup": signUp,
  };
  return method[path](request);
};
