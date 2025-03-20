// takes cookies from hook in hooks.server.js and exposed them to the Svelte app
// makes variables in locals object available as the property data
export const load = async ({ locals }) => {
    return locals;
  };