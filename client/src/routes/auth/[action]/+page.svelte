<script>
    import { PUBLIC_API_URL } from "$env/static/public";
    let { data, form } = $props();
    let message = $state("");
  
    /*const handleForm = async (e) => {
      const user = Object.fromEntries(new FormData(e.target));
  
      const response = await fetch(`${PUBLIC_API_URL}/api/auth/${data.action}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      const jsonData = await response.json();
      message = jsonData.message;
  
      e.preventDefault();
    };*/
</script>
  
  <h2 class="text-xl pb-4">
    {data.action === "login" ? "Login" : "Register"} form
  </h2>
  
  {#if message}
    <p class="text-xl">Message from server: {message}</p>
  {/if}

  {#if data.registered}
  <p class="text-xl">
    You have successfully registered. Please login to continue.
  </p>
  {/if}

  <p>{form?.email ?? "No email provided"}</p>
  
  <form class="space-y-4" method="POST" action="?/{data.action}">
    <label class="label" for="email">
      <span class="label-text">Email</span>
      <input
        class="input"
        id="email"
        name="email"
        type="email"
        placeholder="Email"
      />
    </label>
    <label class="label" for="password">
      <span class="label-text">Password</span>
      <input class="input" id="password" name="password" type="password" />
    </label>
    <button class="w-full btn preset-filled-primary-500" type="submit">
      {data.action === "login" ? "Login" : "Register"}
    </button>
  </form>