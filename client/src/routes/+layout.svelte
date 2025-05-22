<script>
  //export const prerender = true;
  import "../app.css";
  import { useUserState } from "$lib/states/userState.svelte.js"; // imports user state
  let { children, data } = $props();
  import Header from "$lib/components/layout/Header.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import { ToastProvider } from "@skeletonlabs/skeleton-svelte";

  const userState = useUserState(); // initializes user state
  if (data.user) {
    userState.user = data.user; // adds data on user object. the data comes from the hook.server.js which fetches data
    // from cookies. here, we stored the user name in a cookie which is now stored in the shared user state object
  }

</script>
<!--{#if data.user}
  <p>Hello {data.user}!</p>
{/if}-->
{#if data.user}
  <p>Hello {data.user}!</p>
{/if}

<ToastProvider>
  <div class="flex flex-col h-full">
    <Header/>
      
      <main class="container mx-auto max-w-2xl grow">
        {@render children()}
      </main>
    <Footer />  
  </div>
  
  <footer>
  <Footer />
      
  </footer>
</ToastProvider>
 