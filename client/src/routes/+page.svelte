<script>
   // import Message from "$lib/components/Message.svelte";
    let count = $state(0);

</script>

<!--<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<Message />
  
  <h1>Hello world!</h1>
  <p>Count: {count}</p>
  <button onclick={() => count++}>increment</button>-->


  <form class="max-w-sm mx-auto mt-6">
    <h2 class="text-2xl mb-4">Create a todo</h2>
    <div class="mb-4">
      <label for="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        class="w-full"
        placeholder="Enter name"
      />
    </div>
  
    <div class="mb-4 items-center">
      <input type="checkbox" id="completed" name="completed" />
      <label for="completed" class="ml-2">Completed</label>
    </div>
  
    <input
      type="submit"
      class="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
      value="Create"
    />
  </form>

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