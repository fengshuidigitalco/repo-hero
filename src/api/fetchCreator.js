const GET = 'GET';
const domain = 'https://api.github.com';

const handleErrors = async (r) => {
  if (!r.ok) {
    const { status } = r;
    const err = await r.json();
    const { message } = err;
    return { error: { status, message } };
  }
  return await r.json();
};

export const fetchCreator = async ({ url, method = GET, body }) => {
  return fetch(`${domain}${url}`, { method, body }).then(handleErrors);
};
