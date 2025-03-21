<script>

import { useCourseState } from "$lib/states/courseState.svelte.js";
let courseState = useCourseState();
  
  /*const getCourses = async (c) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/courses`);
    courses = await response.json();
  }

  $effect(() => {
    getCourses();
  });*/

  $effect(() => {
        courseState.read();
    });
</script>

<h1 class="text-5xl mb-8">Courses</h1>

<ul class="mb-8">
    {#each courseState.courses as course}
    <li>
    <a href='/courses/{course.id}'>{course?.name}</a>
    </li>
    {/each}
</ul>

