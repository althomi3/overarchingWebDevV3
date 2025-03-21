<script>
    // QuestionForm.svelte should provide a form that has (1) an input field of type text for entering the title of
    // a quesion, (2) an textarea for typing in the text of the question, and (3) a input of type submit for 
    // submitting the form. Submitting the form should add the entered question to the shared state provided 
    // by questionState.svelte.js.
    
        import { useCourseState } from "$lib/states/courseState.svelte.js";
        let courseState = useCourseState();
        // let questionState = useQuestionState();
    
    
    </script>
          
    <h2 class="mb-2 text-lg">Add course</h2>
    <form onsubmit={courseState.add} class="border-2 border-gray-300 p-4 rounded-lg shadow-md">
        <div>
            <label for="name" class="mb-2 text-md">Name</label>
            <input id="name" name="name" type="text" placeholder="Enter a course name" class="w-full border border-gray-400 p-2 rounded-md">
    
        </div>
        <br>
        <input type="submit" value="Add course" class="bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold shadow-md 
        hover:bg-blue-600 transition duration-300 cursor-pointer"/>
    </form>
    