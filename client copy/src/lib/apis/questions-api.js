const PUBLIC_API_URL = 'http://localhost:8000'
// import { PUBLIC_API_URL } from "$env/static/public";

const addQuestions = async (question, course) => {
  // const data = { title, text };
  console.log("question Post via API", question)
  console.log("params: course_id", course)
  const response = await fetch(`${PUBLIC_API_URL}/api/courses/${course}/questions`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(question),
  });

  if (!response.ok) {
    console.error('Error response:', await response.text()); // Log the plain-text error response
    throw new Error('Failed to add question');
  } 
  /*else {
    console.log("Response okay", await response.text()); // Response okay {"new_question":{"id":2,"title":"dsa","text":"        dsa","upvotes":0}}
  }*/
    

  return await response.json();
};


const readQuestions = async (id) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/courses/${id}/questions`);
    if (!response.ok) {
      console.error('Error response:', await response.text()); // Log the plain-text error response
      throw new Error('Failed to add question');
    } 
    /*else {
      console.log("Response okay", await response.text()); // Response okay {"new_question":{"id":2,"title":"dsa","text":"        dsa","upvotes":0}}
    }*/
    return await response.json();
};

const upvoteQuestion = async (cId, qId) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/courses/${cId}/questions/${qId}/upvote`, {
      method: "POST",
    });
    // console.log("Successful upvote", await response.text()); // upvoting works at this code point
    // Successful upvote {"id":3,"title":"new question to test list","text":"        new question to test list","upvotes":7}
    return await response.json();
  };


const deleteQuestion = async (cId, qId) => {
  const response = await fetch(`${PUBLIC_API_URL}/api/courses/${cId}/questions/${qId}`, {
    method: "DELETE",
  });
  return await response.json();
};

export { addQuestions, readQuestions, upvoteQuestion, deleteQuestion }