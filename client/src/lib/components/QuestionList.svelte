<script>
    // QuestionList.svelte should contain the functionality for listing the questions from 
    // questionState.svelte.js with the help of QuesitonItem.svelte.

    import { useQuestionState } from "$lib/states/questionState.svelte";
    let questionState = useQuestionState();
    
    import QuestionItem from "./QuestionItem.svelte";
    // let questions = [];
    let { course_id } = $props();

    $effect(() => {
        questionState.read(course_id);
    });
    
    console.log("questionState.questions", questionState.questions)
    const filteredQuestions = questionState.questions?.filter((questions) => questions.course_id === course_id);
    console.log("filteredQuestions", filteredQuestions)

</script>

<h2 class ="text-xl mb-4">Questions</h2>
<!--<button onclick={ () => questionState.read(course_id) }>Show questions</button>-->

{#if questionState.questions}
<ul>
    {#each questionState.questions as question (question.id)}
     <li><QuestionItem question={question} /></li>
    {/each}
</ul>
{:else}
    <p>...loading</p>
{/if}
