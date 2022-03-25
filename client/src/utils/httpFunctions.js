export const jsonAcceptHeaders = {
  Accept: "application/json;",
};

const jsonPostHeaders = {
  "Content-Type": "application/json; charset=utf-8",
};

const jsonPostFormHeaders = {
  "Content-Type": "application/x-www-form-urlencoded;charset=utf-8;",
};

const textPlainFormHeaders = {
  "Content-Type": "text/plain",
};

const addHeaders = (opts, headers) => {
  if (headers !== undefined)
    opts["headers"] = { ...opts["headers"], ...headers };
  return opts;
};

export function doPost(url, body, headers) {
  let opts = addHeaders(
    {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify(body),
    },
    { ...headers, ...jsonPostHeaders }
  );
  return fetch(url, opts);
}
export function doFormPost(url, params, headers) {
  const searchParams = Object.keys(params)
    .map((key) => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    })
    .join("&");

  let opts = addHeaders(
    {
      method: "POST",
      credentials: "same-origin",
      body: decodeURIComponent(searchParams),
    },
    { ...headers, ...jsonPostFormHeaders }
  );
  return fetch(url, opts);
}

export function doPostFile(url, body, headers) {
  let opts = addHeaders(
    {
      method: "POST",
      credentials: "same-origin",
      body: body,
    },
    { ...headers }
  );
  return fetch(url, opts);
}

export function doPut(url, body, headers, isPayloadTextPlain) {
  let extraHeaders = isPayloadTextPlain
    ? { ...textPlainFormHeaders }
    : { ...jsonPostFormHeaders };
  let opts = addHeaders(
    {
      method: "PUT",
      credentials: "same-origin",
      body: isPayloadTextPlain ? body : JSON.stringify(body),
    },
    { ...headers, ...extraHeaders }
  );
  return fetch(url, opts);
}

export function doDelete(url, body, headers) {
  let opts = addHeaders(
    {
      method: "DELETE",
      credentials: "same-origin",
      body: JSON.stringify(body),
    },
    { ...headers, ...jsonPostHeaders }
  );
  return fetch(url, opts);
}

export function doGet(url, headers) {
  let opts = addHeaders(
    {
      method: "GET",
      credentials: "same-origin",
    },
    headers
  );
  return fetch(url, opts);
}
