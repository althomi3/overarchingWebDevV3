import { redirect } from "@sveltejs/kit";
import { PUBLIC_INTERNAL_API_URL } from "$env/static/public"; // need to use internal server address
console.log("PUBLIC_INTERNAL_API_URL", PUBLIC_INTERNAL_API_URL)

  // const PUBLIC_INTERNAL_API_URL = "http://server:8000"
  const COOKIE_KEY = "token";
  
  const apiRequest = async (url, data) => {
    return await fetch(`${PUBLIC_INTERNAL_API_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  export const actions = {
    login: async ({ request, cookies }) => {
      const data = await request.formData();
      const response = await apiRequest(
        "/api/auth/login",
        Object.fromEntries(data),
      );

      if (response.ok) {
        const responseCookies = response.headers.getSetCookie();
        const cookie = responseCookies.find((cookie) =>
          cookie.startsWith(COOKIE_KEY),
        );
        const cookieValue = cookie.split("=")[1].split(";")[0];
        cookies.set(COOKIE_KEY, cookieValue, { path: "/", secure: false });  
        throw redirect(302, "/"); // redirects user to landing page after login
      }
      return await response.json();
    },

    register: async ({ request }) => {
      const data = await request.formData();
      const response = await apiRequest(
        "/api/auth/register",
        Object.fromEntries(data),
      );

      if (response.ok) {
        throw redirect(302, "/auth/login"); // "/auth/login?registered=true"
      }

      return await response.json();
    },
  };




/*// form actions without API authentication
export const actions = {
    login: async ({ request }) => {
      const data = await request.formData();
      console.log("Received a login request with the following data.");
      console.log(data);
  
      return { message: "Thanks!" };
    },
    register: async ({ request }) => {
      const data = await request.formData();
      const email = data.get("email");
      data.set("email", email + ":)")
      console.log("Received a register request with the following data.");
      console.log(data);
      
      return { email: data.get("email")} ; 
      // return { message: "Thanks!" };
    },
  };*/

  // form actions with API authentication