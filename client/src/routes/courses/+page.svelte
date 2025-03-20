
<script>
    import CourseForm from '$lib/components/CourseForm.svelte';
    import CourseList from '$lib/components/CourseList.svelte';
    // import { PUBLIC_API_URL } from "localhost:8000";
    //const PUBLIC_API_URL = "http://localhost:8000";
  
    /*let { data } = $props();
    let courses = $state({});
  
    const getCourses = async (c) => {
      const response = await fetch(`${PUBLIC_API_URL}/api/courses`);
      courses = await response.json();
    }
  
    $effect(() => {
      getCourses();
    });*/
  </script>

<svelte:head>
  <title>Courses</title>
</svelte:head>

<CourseList />
<CourseForm />
