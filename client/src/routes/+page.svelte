<script>
   // import Message from "$lib/components/Message.svelte";
    // let count = $state(0);
    import TodoForm from "$lib/components/TodoForm.svelte";
    import Todo from "$lib/components/Todo.svelte";
    import { fade } from "svelte/transition";
    import { getContext } from "svelte";
    const toast = getContext("toast");

    let todos = $state([
    { name: "First todo", done: false },
    { name: "Second todo", done: true },
    { name: "Third todo", done: false },
  ]);

  const remove = (todo) => {
    if (Math.random() < 0.9) {
      toast.create({
        title: "Error",
        description: "Failed to remove todo",
        type: "error",
      });
			return;
    }

    todos = todos.filter((t) => t !== todo);
  };

</script>

<!--<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<Message />
  
  <h1>Hello world!</h1>
  <p>Count: {count}</p>
  <button onclick={() => count++}>increment</button>-->

 
<TodoForm />
<ul class="space-y-4">
  {#each todos as todo (todo)}
    <li transition:fade>
      <Todo {todo} removeTodo={() => remove(todo)} />
    </li>
  {/each}
</ul>


 
