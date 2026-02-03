const getBody = (path) => Deno.readTextFileSync(path);

const createResponseLine = (protocol, statusCode, msg) =>
  `${protocol} ${statusCode} ${msg}`;

const getHeaders = (length, type) => {
  return {
    "Content-Type": type,
    "Content-Length": length,
    "Date": new Date(),
  };
};

const getInternsData = () =>
  JSON.stringify(["haji", "haider", "gopi", "khasim", "som"]);

const getFailureBody = () => `<H1>PAGE NOT FOUND</H1>`;

export const handleRequest = async (path, protocol) => {
  switch (path) {
    case "/simple.html": {
      const body = await getBody("./simple.html");
      const headers = getHeaders(body.length, "text/html");
      const responseLine = createResponseLine(protocol, 200, "OK");
      return { responseLine, headers, body };
    }
    case "/": {
      const body = await getBody("./greeting.html");
      const headers = getHeaders(body.length, "text/html");
      const responseLine = createResponseLine(protocol, 200, "OK");
      return { responseLine, headers, body };
    }
    case "/interns_data.html": {
      const body = getInternsData();
      const headers = getHeaders(body.length, "application/json");
      const responseLine = createResponseLine(protocol, 200, "OK");
      return { responseLine, headers, body };
    }
    default: {
      const body = getFailureBody();
      const headers = getHeaders(body.length, "text/html");
      const responseLine = createResponseLine(protocol, 404, "error");
      return { responseLine, headers, body };
    }
  }
};
