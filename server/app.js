import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors"; // imports CORS middleware from honoe
import * as questionsController from "./questionsController.js";
import * as courseController from "./courseController.js"
//import { logger } from "@hono/hono/logger";
import postgres from "postgres";
import { hash, verify } from "jsr:@denorg/scrypt@4.4.4";
import { getCookie, setCookie } from "jsr:@hono/hono@4.6.5/cookie";
import * as jwt from "jsr:@hono/hono@4.6.5/jwt";


// CORS = cross-origin resource sharing policy with which we define
// which requests are allowed for cross-origins
// import { logger } from "@hono/hono/logger";
// import { ERROR_CTX_CONSOLE_DISCONNECT } from "https://deno.land/std@0.132.0/node/internal_binding/_winerror.ts";

const COOKIE_KEY = "token";
const JWT_SECRET = "wsd-project-secret";

const app = new Hono(); // instantiates hono object from hono web framework
// app.use('/*', cors()); // instantiates app object to use cors middle ware. * means that all resources are allowed for corss-origin sharing
const sql = postgres();

app.use(cors({
    origin: '*', // Allows all origins (change to specific domain in production)
    allowMethods: ['GET', 'POST','DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  }));



// ---PROJECT IMPLEMENTATIONN SERVER SIDE---

let questions = []; //initializes empty list to store questions
//Change for deployment

// LP: ROUTING LANDING PAGE
app.get("/", (c) => c.text("This is the Backend LP to the Questions Forum"));

// GET 
//__________________________________________________

// A: ROUTING GET REQUEST / /COURSES PATH
// client queries server with GET request, server returns the following JSON document
// CRUD: READ
app.get("/api/courses", courseController.getCourses)
// gets all courses from DB

// CRUD: READ
app.get( "/api/courses/:id/questions", questionsController.getQuestionsByCourseId)
// returns all questions for a course

// B: ROUTING / GET REQUEST / /COURSES/:ID
//__________________________________________________
// client queries server on path /courses/:id
// server returns a JSON document:
//'{"course": {"id": :id, "name": "Course Name" } }'
// The name is a string (just "Course Name", not e.g. "Web Software Development",
//':id' is retrieved from the path and is a number).

// CRUD: READ
app.get("/api/courses/:id", courseController.getCoursesByID);
// gets course by specific id

// POST
// C: POST REQUEST / /COURSES
//__________________________________________________
// clients query server to /courses path and send json data with post request
    // body contains a JSON document that looks as follows: '{"name": "Course Name" }'
// server returns a JSON document:  
    // returns a JSON document that looks as follows: '{"course": {"id": 3, "name": "Course Name" } }'. 
    // The value for "id" is always 3, but the name of the course should be extracted from the request.

// CRUD: READ
/*app.post("/api//courses", async (c) => { // returns course data
    const post_data = await c.req.json(); // retrieves json data from http request body
    // console.log(`this is the json data`, post_data); // for debugging
    const course_name = post_data.name; // accesses course name property
    // console.log('Course name:', course_name); // for debugging
    const return_data = {"course": {"id":3, "name": course_name}} // defined json data for response
    return c.json(return_data); // returns json response
});*/

app.post("/api/courses", ...courseController.createCourse); // create new course to DB
// response: {"id":1,"name":"Course Name"}%  


// CRUD: CREATE/UPDATE
app.post("api/courses/:id/questions", ...questionsController.createQuestion)
// create a question for a specific course

// CRUD: UPDATE
app.post( "/api/courses/:id/questions/:qId/upvote", questionsController.upvoteQuestion)
// increments upvote attribute and returns updated question

// DELETE 
//__________________________________________________
// CRUD: DELETE
app.delete( "api/courses/:id/questions/:qId",questionsController.deleteQuestionById )
// deletes question by course id and question id

app.delete("/api/courses/:id", courseController.deleteCourseById);
// deletes course by ID


//---ENDPOINT FOR USER AND AUTHENTICATION

// REGISTER NEW USER
app.post("/api/auth/register", async (c) => {
    const data = await c.req.json(); // receives email and password from user
    // // converts email to lower case, hashes password and inserts both into DB users

    try {
        await sql`INSERT INTO users (email, password_hash) 
        VALUES (${data.email.trim().toLowerCase()}, 
        ${hash(data.password.trim())}) RETURNING *`;
    }
    catch {
        console.log("internal error")
    }
    
    return c.json({ "message": `Confirmation email sent to address ${data.email.trim().toLowerCase()}.` });
  });

// LOGIN
  app.post("/api/auth/login", async (c) => {
    const data = await c.req.json();
    
    // looks up user based on receives email in DB
    const result = await sql`SELECT * FROM users
      WHERE email = ${data.email.trim().toLowerCase()}`;

      if (result.length === 0) {
        c.status(401);
        return c.json({
          "message": "Incorrect email or password.",
        });
      }
    
    const user = result[0]; // user data assigned to const "user"
    
    // verifies equality of received password hash with stored password hash
    const passwordValid = verify(data.password.trim(), user.password_hash);
    if (passwordValid) {

      const payload = { // defines payload for JWT = user's email
        //id: user.id,
        email: user.email,
      }

      const token = await jwt.sign(payload, JWT_SECRET); // defines token with payload and key

      // setting the cookie as the user id with user id as token from JWT
      setCookie(c, COOKIE_KEY, token, { 
        path: "/",
        domain: "localhost",
        httpOnly: true,
        sameSite: "lax"
      });
      
      return c.json({
        //"message": `Logged in as user with id ${user.email}`,
        "message": `Logged in as user with id ${user.email}`,
      });
    } else {
        c.status(401);
        return c.json({
        "message": "Incorrect email or password.",
      });
    }
  });
  //---ENDPOINT FOR USER AND AUTHENTICATION




// E: GET REQUEST / /courses/:cId/topics/:tId/posts
//__________________________________________________
// clients query request to server and send ':cId' and ':tId' are path variables
// server returns a JSON document that looks as follows: 
// '{"posts": [ {"id": 1, "title": "Post 1" }, {"id": 2, "title": "Post 2" } ] }'. 
// Nothing is done with the path variables.

//app.get("/courses/:cId/topics/:tId/posts", (c) => {
   // const cID = c.req.param("cId");
    //const tID = c.req.param("tId");
    //const response_data = {"posts": [ {"id": 1, "title": "Post 1" }, {"id": 2, "title": "Post 2" } ] };
    //return c.json(response_data);
//});

// D: GET REQUEST / /courses/:id/topics
// clients query server with GET request
// ':id' is a path variable
// server returns a JSON document that looks as follows: 
// '{"topics": [ { "id": 1, "name": "Topic 1" }, {"id": 2, "name": "Topic 2" } ] }'. 
// Nothing is done with the path variable.
// app.get("/courses/:id/topics", (c) => {
    // const id = c.req.param("id"); // stores path variable from request
    //const response_data = {"topics": [ { "id": 1, "name": "Topic 1" }, {"id": 2, "name": "Topic 2" } ] }; // defines json response
    // return c.json(response_data); // returns json response
// });



// F: GET REQUEST / /courses/:cId/topics/:tId/posts/:pId
// clients query the server and send ':cId', ':tId', and ':pId' as path variables
// server returns a JSON document that looks as follows: 
// '{"post": {"id": :pId, "title": "Post Title" }, "answers": [ { "id": 1, "content": "Answer 1" }, {"id": 2, "content": "Answer 2" } ] }'. 
// The path variables :cId and :tId are not used.

// app.get("/courses/:cId/topics/:tId/posts/:pId", (c) => {
   // const cID = c.req.param("cId");
    // const tID = c.req.param("tId");
    // const pID = Number(c.req.param("pId")); // converts text-based id into number, all http requests are text-based
    // const response_data = {"post": {"id": pID, "title": "Post Title" }, "answers": [ { "id": 1, "content": "Answer 1" }, {"id": 2, "content": "Answer 2" } ] }
    // return c.json(response_data);
//});



export default app;
