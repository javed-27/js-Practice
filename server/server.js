import { handleRequest } from "./handler.js";

const readRequest = async (conn) => {
  const decoder = new TextDecoder();
  const buffer = new Uint8Array(1024);
  const n = await conn.read(buffer);
  return decoder.decode(buffer.subarray(0, n));
};

const parseRequest = (request) => {
  const [requestLine] = request.split("\r\n");
  return requestLine.split(" ");
};

const createHeaders = (ob) =>
  Object.entries(ob).map(([name, value]) => `${name}:${value}`).join("\r\n");

const formatResponse = ({ responseLine, headers, body }) =>
  [responseLine, createHeaders(headers), "", body].join("\r\n");

const writeResponse = async (conn, response) => {
  const encoder = new TextEncoder();
  await conn.write(encoder.encode(response));
};

export const serve = async (conn) => {
  const request = await readRequest(conn);
  const [method, path, protocol] = parseRequest(request);
  console.log({ method, path, protocol });
  const response = await handleRequest(path, protocol);
  const finalResponse = formatResponse(response);
  await writeResponse(conn, finalResponse);
  await conn.close();
};
