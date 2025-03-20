<script>
  const PUBLIC_API_URL = 'http://localhost:8000'

  import QuestionList from "$lib/components/QuestionList.svelte";
  import QuestionForm from "$lib/components/QuestionForm.svelte";
  import { useQuestionState } from "$lib/states/questionState.svelte.js";
  let questionState = useQuestionState();

  // let { courses } = $props();

  let { data } = $props();
  console.log("data", data) // { courses: "1" }
  console.log("data", data.id) // data 1

  let course = $state({});
  let questions = $state({});


  const getCourse = async (id) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/courses/${id}`);
    course = await response.json();
    console.log("courseTmp", course)
  }

  const getQuestions = async (id) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/courses/${id}/questions`);
    questions = await response.json();
    console.log("questions after fetching", questions)

  }



  $effect(() => {
    getCourse(data.id),
    getQuestions(data.id)
  });
        
  </script>

<svelte:head>
  <title>{course?.name}</title>
</svelte:head>
  
<h1 class="text-5xl mb-8">{course?.name} {data.courses}</h1>
  
  <!-- Backup Code in case QuestionList should not be used
  <ul>
    {#each questions as question}
      <li>{question.title}{question.course_id}</li>
    {/each}
</ul>-->

  <QuestionList course_id={data.id}/> 
  <QuestionForm course={data.id}/>



     

      