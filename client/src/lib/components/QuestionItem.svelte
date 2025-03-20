<script>
    // QuestionItem.svelte should contain the functionality for (1) receiving information about the question as 
    // a property, (2) showing the title of a the question, (2) deleting the question by pressing a button with 
    // the text "Delete", (3) upvoting the question by pressing an button with the text "Upvote", and (4) 
    // showing the number of upvotes that the question has received. The number of upvotes should be shown 
    // in the form "Upvotes: {count}", where {count} corresponds to the number of upvotes.

    import { useQuestionState } from "$lib/states/questionState.svelte";
    // let questionState = useQuestionState();
    // let { todo = {name: "fallbackname", done: false}, removeTodo } = $props();
    // let { question = {title: "fallbacktitle", id: 0, text: "fallbacktext"}} = $props();
    // console.log("question in QuestionItem", question);
  
    let { question } = $props();
    console.log("QuestionItem course_id, question", question)

    // console.log("received question info in item", question);
    let questionState = useQuestionState();

    

</script>
<div class="flex items-start space-x-4 card border-[2px] p-4 rounded-md">
    <div>
    <h3 class="text-l">{question.title}</h3>
    </div>

    <div>
    <p class="text-sm mb-2">Upvotes: {question.upvotes}</p>

    <!--<p>{question.text}</p>-->
    <!--<p>Course id: {question.course_id}</p>-->

    <!--pass course id and question id-->

    <button class="text-sm bg-sky-100 text-grey px-3 py-2 rounded-md
    hover:bg-sky-200 transition duration-100 cursor-pointer" onclick= {() => questionState.remove(question.course_id, question.id)}>Delete</button>  <!--question.id 
    provides the prop we can use in questionState.svelte.js. Notice how we use question.id here and below only question
    to cater towards different functions used in questionState.svelte.js-->
    <button class="text-sm bg-sky-100 text-grey px-3 py-2 rounded-md
    hover:bg-sky-200 transition duration-100 cursor-pointer" onclick= {() => questionState.upvote(question.course_id, question.id)}>Upvote </button>
    </div>  
</div>

<!--p for={question.id}>
    {question.name}
</p>
  
<button onclick={() => questionState.add(question.id)}>Add</button>-->