<script>
    // Questions.svelte should be the component that contains both the QuestionForm.svelte and a 
    // QuestionList.svelte, proving an entry point to the application with a form and a list of existing questions.

    import QuestionForm from "./QuestionForm.svelte";
    // import QuestionItem from "./QuestionItem.svelte";
    import QuestionList from "./QuestionList.svelte";

    
    
</script>

<QuestionForm />
<QuestionList />