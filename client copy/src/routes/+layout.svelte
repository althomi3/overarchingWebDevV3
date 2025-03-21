<script>
  import Footer from "$lib/components/layout/Footer.svelte";
  import Header from "$lib/components/layout/Header.svelte";
  import "../app.css";
  let { children } = $props();
</script>
  
  <!--<header>
    <nav>
      <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
      </ul>
  </nav>
  </header>-->

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
 