// questionState.svelte.js provides the functionality for adding, listing, deleting, 
// and upvoting of questions in a way where the questions can be shared across components.

import { browser } from '$app/environment';
import * as questionsAPI from '../apis/questions-api.js';


const QUESTIONS_KEY = "questions";
let initialQuestions = [];

/*(browser && localStorage.hasOwnProperty(QUESTIONS_KEY)) {
  initialQuestions = JSON.parse(localStorage.getItem(QUESTIONS_KEY));
}*/

let questionState = $state(initialQuestions);

if (browser && localStorage.hasOwnProperty(QUESTIONS_KEY)) {
  initialQuestions = JSON.parse(localStorage.getItem(QUESTIONS_KEY));
};


const saveQuestions = () => { // creates object from sets todos as strings to localstorage
  localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questionState));
};

const useQuestionState = () => {
    return {
        get questions() {
          return questionState;
        },
    add: async (e, course) => {
        console.log("questionState.add course id:", typeof(course)) // questionState.add course id 3
        const question = Object.fromEntries(new FormData(e.target));
        //question.id = crypto.randomUUID();
        //question.upvotes = 0;
        //question.course_id = course;
        console.log("question", question) // course_id: "3" id: "617801b1-4b24-42cb-a39c-415dfb578955 text: "        cxy"title: "cxyc" upvotes: 0

        // retrieves new question and pushes it to localstore, triggering Svelte's reactive state
        // which updates the list in the frontend so you see the updated list automatically
        const new_question = await questionsAPI.addQuestions(question, course)
        console.log("new question from API",new_question ) // !!! API returns wrong course id
        // const new_question = response.question;
        questionState.push(new_question);
        e.preventDefault();
        //console.log("pushed question", question) // course_id: "3" id: "c2222bb5-1fce-4e4c-9c7c-35fd5b2fe5a5" text: "fesfe" title: "5325"
        e.target.reset();
        console.log("questionState after adding question:", questionState)
        saveQuestions();
      },

    read: async (id) => {
        questionState = await questionsAPI.readQuestions(id);
        console.log("Successful questionState", questionState) // successfully retrieves array of questions
      },

    remove: async (cId, qId) => {
      // retrieves removed question and filters local storage to trigger reactivity of svelte
      // which updates the list in the browser
      const removedQuestion = await questionsAPI.deleteQuestion(cId, qId);
      questionState = questionState.filter((questions) => questions.id !== removedQuestion.id);

      saveQuestions();
    },

    upvote: async (cId, qId) => {
      const updatedQuestion = await questionsAPI.upvoteQuestion(cId, qId);
      console.log("questionstate:", updatedQuestion); // check: object retrieved correctly upvote: 25
      console.log("Successful upvote SharedState", questionState); // successfully retrieves array of questions. upvote 24:
      // Snapshot: Object { id: 3, title: "new question to test list", text: "        new question to test list", upvotes: 9 }
      // questionState.push(updatedQuestion) adds question to end of array, doesn't update it
      questionState = questionState.map((questions) => 
        questions.id === updatedQuestion.id ? updatedQuestion : questions
      );
      console.log("Successful upvote SharedState after update", questionState); 
      // successfully retrieves array of questions. upvote 25, replaced the old with the new question
      saveQuestions();
    }
  }
};
export{ useQuestionState };