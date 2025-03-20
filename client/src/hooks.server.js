// hooks is run on each request
// extracts cookie with name auth
// if found, cookie is set to the locals object of the request
// out: cookie available with the variable "user" in the locals object of the request
const COOKIE_KEY = "cookie";

export const handle = async ({ event, resolve }) => {
  const authCookie = event.cookies.get(COOKIE_KEY);
  if (authCookie) {
    event.locals.user = authCookie;
  }

  return await resolve(event);
};