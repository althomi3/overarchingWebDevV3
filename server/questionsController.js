import { zValidator } from "zValidator"; 
import * as questionsRepo from "./questionsRepo.js";
import { questionValidator } from "./questionsValidator.js";


// QUESTIONS
const createQuestion = [zValidator("json", questionValidator), async (c) => {
    const data = await c.req.valid("json"); // request contains {"title": "Question title", "text": "Question text" }
    const courseId = Number(c.req.param("id"));
    console.log("request body", data);
    console.log("id", courseId);
    const upvotes = 0;
    const new_question = {"title": data.title, "text": data.text, "upvotes": upvotes};
    console.log("new question", new_question);
    // questions.push(new_question);
    // console.log("updated question data", questions);
    if (!data) {
        return c.json({ error: "Invalid data" }, 400); // Handle invalid data
      }
    return c.json(await questionsRepo.createQuestion(new_question, courseId));
}];

const getQuestionsByCourseId = async (c) => {
    const courseId = Number(c.req.param("id"));
    console.log("Controller getQuestionsByCourseId", courseId)
    /*(c) => {
        console.log("Successful request of question list", questions)
        return c.json(questions);*/
    return c.json(await questionsRepo.readQuestionsByCourseId(courseId));
};

const getQuestionsByCourseIdAndQuestionId = async (c) => {
    const courseId = Number(c.req.param("id"));
    const questionId = Number(c.req.param("qId"));
    console.log("Controller getQuestionsByCourseIdAndQuestionId", "Course ID", courseId, "Question ID", questionId)
    /*(c) => {
        console.log("Successful request of question list", questions)
        return c.json(questions);*/
    return c.json(await questionsRepo.readQuestionsByCourseIdAndQuestionId(courseId, questionId));
};

// ANSWERS
const createAnswer= async (c) => {
    const data = await c.req.valid("json");
    const questionId = Number(c.req.param("qid"));
    console.log("request body", data);
    console.log("id", questionId);
    const upvotes = 0;
    const answer = {"text": data.text, "upvotes": upvotes};
    console.log("new question", new_question);
    // questions.push(new_question);
    // console.log("updated question data", questions);
    if (!data) {
        return c.json({ error: "Invalid data" }, 400); // Handle invalid data
      }
    return c.json(await questionsRepo.createQuestion(new_question, courseId));

}

const getQuestionAnswerByCourseAndQuestionID = async (c) => {
    const questionId = Number(c.req.param("qId"));
    console.log("Controller getQuestionAnswerByCourseAndQuestionID", "Question ID", questionId)
    return c.json(await questionsRepo.readAnswerByCourseAndQuestionId(questionId));
};


const getQuestions = async (c) => {
    const id = Number(c.req.param("id"));
    /*(c) => {
        console.log("Successful request of question list", questions)
        return c.json(questions);*/
    return c.json(await questionsRepo.readCoursesById(id));
}



const upvoteQuestion =  async (c) => {
    const questionId = c.req.param("qId");
    return c.json(await questionsRepo.updateQuestiongById(questionId));
};
    /*(c) => {
        const qId = c.req.param("qId");
        const upvoteQuestion = questions.find((questions) => questions.id == qId);
        upvoteQuestion.upvotes++; // automatically upvotes the question in the json data. no need to reassign
        return c.json(upvoteQuestion)
    }*/

const deleteQuestionById = async (c) => {
    const courseId = Number(c.req.param("id"));
    const questionId = Number(c.req.param("qId"));

    return c.json(await questionsRepo.removeQuestionByID(courseId, questionId));

    /**(c) => {
    const qId = Number(c.req.param("qId"));
    console.log(qId);
    const deletedQuestion = questions.find((questions) => questions.id === qId); // stores removed question
    questions = questions.filter((questions) => questions.id !== qId); // filters questions for qId
    return c.json(deletedQuestion); // returns removed question
} */
};


export { 
    createQuestion, 
    getQuestionsByCourseId, 
    upvoteQuestion, 
    deleteQuestionById, 
    getQuestionsByCourseIdAndQuestionId,
    getQuestionAnswerByCourseAndQuestionID
}