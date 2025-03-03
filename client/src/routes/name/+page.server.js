// +page.server.js
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
    }
  };
  