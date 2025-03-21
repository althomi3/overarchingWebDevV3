// creates a shared userstate that is exposed and usable across the app
let user = $state({}); // sets shared state

const useUserState = () => { // defines user state object
  return {
    get user() {
      return user;
    },
    set user(u) {
      user = u;
    },
  };
};

export { useUserState };