export const actions = {
    login: async ({ request }) => {
      const data = await request.formData();
      console.log("Received a login request with the following data.");
      console.log(data);
  
      return { message: "Thanks!" };
    },
    register: async ({ request }) => {
      const data = await request.formData();
      console.log("Received a register request with the following data.");
      console.log(data);
  
      return { message: "Thanks!" };
    },
  };