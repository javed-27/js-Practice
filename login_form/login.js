import { DatabaseSync } from "node:sqlite";

const verifyLogin = (userName, password) => {
  const db = new DatabaseSync("database/database.db");
  const query = `select * from details
                where user_name = ? and password = ?;`;
  const statement = db.prepare(query);
  return statement.all(userName, password).length > 0;
};

const login = async (request) => {
  const body = await request.text();
  const params = new URLSearchParams(body);
  const userName = params.get("user-name");
  const password = params.get("password");

  if (verifyLogin(userName, password)) {
    return new Response(JSON.stringify("access granted"));
  }
  return new Response(JSON.stringify("Invalid user_name or password"));
};

const createAccount = (userName, name, email, password) => {
  const db = new DatabaseSync("database/database.db");
  const query = `INSERT INTO details(user_name,name,email,password)
                VAlUES(?,?,?,?)`;
  const statement = db.prepare(query);
  return statement.run(userName, name, email, password);
};

const signUp = async (request) => {
  const body = await request.text();
  const params = new URLSearchParams(body);
  const userName = params.get("user-name");
  const name = params.get("name");
  const email = params.get("email");
  const password = params.get("password");
  createAccount(userName, name, email, password);
  return new Response(JSON.stringify("account created"));
};

const homePage = () => {
  const body = Deno.readTextFileSync("form.html");
  return new Response(body, {
    headers: { "content-type": "text/html" },
  });
};

const loginPage = () => {
  const body = Deno.readTextFileSync("login.html");
  return new Response(body, {
    headers: { "content-type": "text/html" },
  });
};

export const loginManager = (request) => {
  const url = new URL(request.url);
  const path = url.pathname;
  console.log(path);

  const method = {
    "/": homePage,
    "/login": login,
    "/login.html": loginPage,
    "/signup": signUp,
    "/index": homePage,
  };
  return method[path](request);
};
