<script>
  //export const prerender = true;
  import "../app.css";
  let { children, data } = $props();
  import Header from "$lib/components/layout/Header.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import { ToastProvider } from "@skeletonlabs/skeleton-svelte";

</script>
<!--{#if data.user}
  <p>Hello {data.user}!</p>
{/if}-->

<ToastProvider>
  <div class="flex flex-col h-full">
    <Header/>
      
      <main class="container mx-auto max-w-2xl grow">
        {@render children()}
      </main>
    <Footer />  
  </div>
</ToastProvider>