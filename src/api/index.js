const GET = 'GET';
const domain = 'https://api.github.com';

const handleErrors = async (r) => {
  if (!r.ok) {
    const err = await r.json();
    if (err.message) {
      throw Error(err.message);
    }
    throw Error(`${r.statusText} (Code ${r.status})`);
  }
  return r;
};

const returnJson = async (r) => {
  return await r.json();
};

export const fetcher = async ({ url, method = GET, body }) => {
  return fetch(`${domain}${url}`, { method, body })
    .then(handleErrors)
    .then(returnJson)
    .catch((error) => {
      return { error };
    });
};
