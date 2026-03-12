export default defineEventHandler(async (event) => {
  console.log("proxy sever is running...");

  // const path = event.context.params?.path || "";
  // const query = getQuery(event);
  // const target = `https://leiaqa-deb6a.firebaseapp.com/__/auth/${path}?${new URLSearchParams(
  //   query as any
  // )}`;

  // // ?apiKey=${apiKey}&appName=${appName}&authType=${authType}&redirectUrl=${redirectUrl}&v=${v}&providerId=${providerId}&scopes=${scopes}

  // const response = await fetch(target, {
  //   method: getMethod(event),
  //   headers: getHeaders(event),
  //   body: ["GET", "HEAD"].includes(getMethod(event))
  //     ? undefined
  //     : await readRawBody(event),
  // });
  // console.log("response", response);

  // //   // Forward response headers
  // for (const [key, value] of response.headers.entries()) {
  //   setResponseHeader(event, key, value);
  // }

  // console.log("headers", event?.headers);

  // //   // Forward body as stream

  // return { res: response };
  // return sendStream(event, response.body as any);
});
