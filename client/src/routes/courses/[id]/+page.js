/*import { courses } from "../courses.js";

export function load({ params }) {
  return {
    ...params,
    foundCourse: courses.find(course => course.id == params.course)
  };
}

/*

  // +page.js


export async function load({ params }) {
  // Fetch the course data based on the course ID from the URL
  const course = await readCourseById(params.id);  // Assuming readCourseById accepts the id and fetches data from your API
  console.log("load function", course)
  return { course };  // Pass the course data to the component
}

// +page.js
import { readCourseById } from "../../../lib/apis/courses-api.js";

export async function load({ params }) {
  // Fetch the course by ID from your API
  const course = await readCourseById(params.course);

  // Return both the parameter and course data
  return {
    course,
    courseId: params.course
  };
}

// +page.js
export async function load({ params }) {
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`https://localhost:8000/api/courses/${params}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch course: ${response.status} ${response.statusText}`);
      }
  
      const foundCourse = await response.json();
  
      return {
        ...params,
        foundCourse
      };
    } catch (error) {
      console.error("Error fetching course:", error);
      return {
        ...params,
        foundCourse: null,
        error: error.message
      };
    }
  }*/

    export function load({ params }) {
        return params;
      }   

    

    
  
