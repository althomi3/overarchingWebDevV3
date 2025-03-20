const PUBLIC_API_URL = 'http://localhost:8000'
// import { PUBLIC_API_URL } from "$env/static/public";

const addCourses = async (course) => {
  // const data = { title, text };
  console.log("course Post via API", course)
  const response = await fetch(`${PUBLIC_API_URL}/api/courses`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(course),
  });

  if (!response.ok) {
    console.error('Error response:', await response.text()); // Log the plain-text error response
    throw new Error('Failed to add course');
  } 
  /*else {
    console.log("Response okay", await response.text()); // Response okay {"new_question":{"id":2,"title":"dsa","text":"        dsa","upvotes":0}}
  }*/
    

  return await response.json();
};


const readCourses = async () => {
    const response = await fetch(`${PUBLIC_API_URL}/api/courses`);
    if (!response.ok) {
      console.error('Error response:', await response.text()); // Log the plain-text error response
      throw new Error('Failed to read courses');
    } 
    /*else {
      console.log("Response okay", await response.text()); // Response okay {"new_question":{"id":2,"title":"dsa","text":"        dsa","upvotes":0}}
    }*/
    return await response.json();
};

const readCourseById = async (cId) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/courses/${cId}`);
    if (!response.ok) {
      console.error('Error response:', await response.text()); // Log the plain-text error response
      throw new Error('Failed to read course by id');
    } 
    /*else {
      console.log("Response okay", await response.text()); // Response okay {"new_question":{"id":2,"title":"dsa","text":"        dsa","upvotes":0}}
    }*/
    return await response.json();
}


export { addCourses, readCourses, readCourseById}