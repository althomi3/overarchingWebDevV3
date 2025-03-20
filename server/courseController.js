import { zValidator } from "zValidator"; 


import * as courseRepo from "./courseRepo.js";
import { coursenValidator } from "./courseValidator.js";

// import { questionsValidator } from "./questionsValidator.js";

const createCourse = [zValidator("json", coursenValidator), async (c) => { 
    const data = await c.req.valid("json"); // replace "json later with valid"
    console.log("data course:", data) // data: { rating: 2, feedback: "okay" }
    // const bookID = c.req.param("bookId");
    // console.log("bookid", bookID);
    //if (isNaN(bookID)) {
        //return c.json({ error: "Invalid book ID", bookID});
     //}; // handle invalid ID case        
    //console.log("bookid", bookID)
    if (!data) {
        return c.json({ error: "Invalid data" }, 400); // Handle invalid data
      }
    return c.json(await courseRepo.create(data));
  }];


const getCourses = async (c) => {
    return c.json(await courseRepo.readCourses());
}

const getCoursesByID = async (c) => {
    const id = Number(c.req.param("id"));
    // const id = Number(id);
    //const data = {"course": {"id": id, "name": "Course Name" }}
    return c.json(await courseRepo.readCoursesById(id));
}


const deleteCourseById = async (c) => {
    const id = Number(c.req.param("id"));
    return c.json(await courseRepo.removeCourseByID(id));

    /*const id = Number(c.req.param("id"));
        console.log(id);
        // const deletedCourse = questions.find((questions) => questions.id === qId); // stores removed question
        // questions = questions.filter((questions) => questions.id !== qId); // filters questions for qId
        return c.json(deletedCourse); // returns removed question*/

}


export { createCourse, getCourses, getCoursesByID, deleteCourseById }