// +page.server.js

import { PUBLIC_INTERNAL_API_URL } from "$env/static/public"; // need to use internal server address
import { redirect } from "@sveltejs/kit";
  console.log("PUBLIC_INTERNAL_API_URL", PUBLIC_INTERNAL_API_URL)

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

    username: async ({ request }) => {
      const data = await request.formData();
      console.log("data in username action", data)
      const name = data.get("username");
      
      if (name === "target") {
        throw redirect(302, "/target");
      }
  
      // Otherwise, make API request and return data
      const response = await apiRequest(
        "/api/user",
        Object.fromEntries(data),
      );      
      
      const responseData = await response.json();
      console.log("responseData:", responseData);
      return ({ data: responseData.data});
    },
  };
  