<script>
   // import Message from "$lib/components/Message.svelte";
    let count = $state(0);

</script>

<!--<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<Message />-->
  
  <h1>Hello world!</h1>
  <p>Count: {count}</p>
  <button onclick={() => count++}>increment</button>


  

  <form class="mx-auto w-full max-w-md space-y-4">
    <h2 class="h2">Create a todo</h2>
  
    <label for="name" class="label">
      <span class="label-text">Name</span>
      <input class="input" type="text" id="name" name="name" />
    </label>
  
    <label class="flex items-center space-x-2">
      <input class="checkbox" type="checkbox" id="completed" name="completed" />
      <p>Completed</p>
    </label>
  
    <button type="submit" class="w-full btn preset-filled-primary-500">Create</button>
  </form>