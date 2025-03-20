import postgres from "postgres";

const sql = postgres();

const createQuestion = async (question, courseId) => {
  const result = await sql`INSERT INTO questions (course_id, title, text, upvotes)
      VALUES (${courseId}, ${question.title}, ${question.text}, ${question.upvotes})
      RETURNING *`;
    return result[0];
};

const readQuestionsByCourseId = async (id) => {
  // Retrieve a book item with the given id
  return await sql`SELECT * FROM questions WHERE course_id = ${id}`; 

};

const updateQuestiongById = async (questionId) => {
    // updates a book
    const result = await sql`
      UPDATE questions
      SET upvotes = upvotes + 1
      WHERE id = ${questionId}
      RETURNING *;
    `;
    return result[0];
  };

const removeQuestionByID = async (courseId, questionId) => {
    // Delete a book item with the given id
    const result = await sql`
    DELETE FROM questions 
    WHERE id = ${questionId} AND course_id = ${courseId}
    RETURNING *`;
    return result[0];
  };
  

export { createQuestion, readQuestionsByCourseId, updateQuestiongById, removeQuestionByID };