<script>
// QuestionForm.svelte should provide a form that has (1) an input field of type text for entering the title of
// a quesion, (2) an textarea for typing in the text of the question, and (3) a input of type submit for 
// submitting the form. Submitting the form should add the entered question to the shared state provided 
// by questionState.svelte.js.

    import { useQuestionState } from "$lib/states/questionState.svelte";
    let questionState = useQuestionState();
    let { course } = $props();
    console.log("course id", course) // course id 3

    const handleSubmit = (e) => {
        questionState.add(e, course); // pass event and course
    }

</script>
  


<!--<h1>Question Forum on Breathing Exercises Updated</h1>-->

<h2 class = "text-xl mt-8 mb-4">Enter your question</h2>
<form onsubmit={handleSubmit} class="border-2 border-gray-300 p-4 rounded-lg shadow-md">
    <div>
        <label for="title">Title</label>
        <input id="title" name="title" type="text" placeholder="Enter a question title" class="w-full border border-gray-400 p-2 rounded-md" />
    </div>
    <br>
    <div>
        <label for="text">Question</label>
        <textarea id="text" name="text" type="text" class="w-full border border-gray-400 p-2 rounded-md">
        </textarea>
    </div>
    <br>
    <input type="submit" value="Post question to forum" class="bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold shadow-md 
    hover:bg-blue-600 transition duration-300 cursor-pointer"/>
</form>
