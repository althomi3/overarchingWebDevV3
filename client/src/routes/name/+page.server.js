// +page.server.js

import { PUBLIC_INTERNAL_API_URL } from "$env/static/public"; // need to use internal server address
import { redirect } from "@sveltejs/kit";
console.log("PUBLIC_INTERNAL_API_URL", PUBLIC_INTERNAL_API_URL)
const COOKIE_KEY = "cookie";

  // const PUBLIC_INTERNAL_API_URL = "http://server:8000"

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
    name: async ({ request }) => {
      const data = await request.formData();
      const name = data.get("name");
      const updated = name + " :)";
      data.set("name", updated);

      // Append the smiley to the name
      // const updatedName = name + " :)";
      console.log(data)
  
      // Return the updated name as part of the response to the frontend
      return { name: updated };
    },

    // fetches request data, gets username from data
    // makes a request to the user API on server-side
    // returns the data received from API
    username: async ({ request, cookies }) => {
            const data = await request.formData();
            console.log("data from form is received by action usrename", data)
            const response = await apiRequest(
              "/api/user",
              Object.fromEntries(data),
            );
      
            if (response.ok) {
              console.log("response from BE okay")
              const responseCookies = response.headers.getSetCookie();
              console.log("responseCookies", responseCookies)
              const cookie = responseCookies.find((cookie) =>
                cookie.startsWith(COOKIE_KEY),
              );
              console.log("cookie", cookie)
              const cookieValue = cookie.split("=")[1].split(";")[0];
              console.log("cookieValue", cookieValue)

              cookies.set(COOKIE_KEY, cookieValue, { path: "/name", secure: false });  
              //throw redirect(302, "/"); // redirects user to landing page after login
              return ({data: "Cookie set"});
              

            }
          }
  };

  /*{
        


      { // takes cookies as param
        const data = await request.formData(); // get data from request
        console.log("data in username action", data)
        // const name = data.get("username");
        
    
        // Otherwise, make API request and return data
        const response = await apiRequest( // get response from user API on server
          "/api/user",
          Object.fromEntries(data),
        );      
  
        if (response.ok) {
          const responseData = await response.json(); // get response data from user API
          console.log("responseData:", responseData);
          const responseCookies = response.headers.getSetCookie(); // get cookie header
          console.log("responseCookies", responseCookies)
          const cookie = responseCookies.find((cookie) => // find cookies in header
            cookie.startsWith(COOKIE_KEY),
          );
            const cookieValue = cookie.split("=")[1].split(";")[0];
            console.log("cookieValue", cookieValue)
            cookies.set(COOKIE_KEY, cookieValue, { path: "/", secure: false });  // set cookie on client server
            //throw redirect(302, "/");
            console.log("cookie", cookie)
            console.log("responseData", responseData)
            return ({ data: cookieValue}); // return responsedata
  
          } // redirects user to landing page after login
          
      },*/
  