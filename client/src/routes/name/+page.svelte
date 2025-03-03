<script>
    import { PUBLIC_API_URL } from "$env/static/public";
    let { form } = $props();
    //console.log("data", data)
    console.log("formdata", form)
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
  