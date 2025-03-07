<script>
    import { PUBLIC_API_URL } from "$env/static/public";
    let { form, data } = $props();
    //console.log("data", data)
    console.log("formdata in +page.svelte", form)
    // console.log("data data in +page.svelte", data)

</script>
  
  <!-- Add an action attribute to the form that corresponds to the form action, and
   add the functionality for showing the response from the form action. -->

  {#if form?.name}
  <p class="text-xl">{form.name}</p>
  {/if}

  <form class="space-y-4" method="POST" action="?/name"> <!--submits name action-->
    <label class="label" for="name">
      <span class="label-text">Name</span>
      <input class="input" id="name" name="name" type="text" placeholder="Name" />
    </label>
    <button class="w-full btn preset-filled-primary-500" type="submit">
      Append
    </button>
  </form>

  <!--Assignment Username & API-->
  {#if form?.data}
  <p>{form.data}</p>
  {/if}
 

  <form class="space-y-4" method="POST" action="?/username">
    <label class="label" for="username">
      <span class="label-text">Username</span>
      <input
        class="input"
        id="username"
        name="username"
        type="text"
        placeholder="Username"
      />
    </label>
    <button class="w-full btn preset-filled-primary-500" type="submit">
      Submit
    </button>
  </form>
  