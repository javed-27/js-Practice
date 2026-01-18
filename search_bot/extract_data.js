export const extractData = async (args) => {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${args}`;
  const response = await fetch(url);
  const body = await response.json();
  const info = body.extract;
  return info;
};
console.log(await extractData(...Deno.args));
