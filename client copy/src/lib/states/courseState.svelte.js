// courseState.svelte.js provides the functionality for adding, listing, deleting, 
// and upvoting of questions in a way where the questions can be shared across components.

import { browser } from '$app/environment';
import * as coursesAPI from '../apis/courses-api.js';


const COURSES_KEY = "courses";
let initialCourses = [];

let courseState = $state(initialCourses);

if (browser && localStorage.hasOwnProperty(COURSES_KEY)) {
    initialCourses = JSON.parse(localStorage.getItem(COURSES_KEY));
};


const saveCourses = () => { // creates object from sets todos as strings to localstorage
  localStorage.setItem(COURSES_KEY, JSON.stringify(courseState));
};

const useCourseState = () => {
    return {
        get courses() {
          return courseState;
        },
    add: async (e) => {
        console.log("adding triggered")
        const course = Object.fromEntries(new FormData(e.target));
        console.log("course", course) // id: "90f2d146-c472-4119-93a0-95d34ce31bd3" text: "test" title: "test"
        //course.id = crypto.randomUUID();
        const new_course = await coursesAPI.addCourses(course)
        // const new_question = response.question;
        courseState.push(new_course);
        e.preventDefault();
        console.log("pushed course", course) // id: "c2222bb5-1fce-4e4c-9c7c-35fd5b2fe5a5" text: "fesfe" title: "5325"
        e.target.reset();
        saveCourses();
      },

    read: async () => {
        courseState = await coursesAPI.readCourses();
        console.log("Successful courseState", courseState) // successfully retrieves array of questions
      },

      readById: async (cId) => {
          const foundCourse = await coursesAPI.readCourseById(cId);
          console.log("foundCourse in shared state", foundCourse) // Object { id: 1, name: "Web Software Development" }
          return foundCourse;
      },

    remove: async (cId) => {
      // retrieves removed question and filters local storage to trigger reactivity of svelte
      // which updates the list in the browser
      const removedCourse = await coursesAPI.deleteCoursen(cId);
      courseState = courseState.filter((courses) => courses.id !== removedCourse.id);

      saveCourses();
    },
  }
};
export{ useCourseState };