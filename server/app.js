import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import postgres from "postgres";
import { hash, verify } from "jsr:@denorg/scrypt@4.4.4";
import { getCookie, setCookie } from "jsr:@hono/hono@4.6.5/cookie";

// Passwords / Hashes
const hashedPassword = hash("saippuakivikauppias");
console.log(hashedPassword);

const passwordsMatch = verify("saippuakivikauppias", hashedPassword);
console.log(passwordsMatch); // true: string matches hash

const passwordsDoNotMatch = verify("password", hashedPassword);
console.log(passwordsDoNotMatch); // false: string does not match hash



const app = new Hono();
const sql = postgres();

app.use(
  "/*",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/*", logger());

app.get("/", (c) => c.json({ message: "Hello world!" }));

// AUTHENTIFICATION
// Create user account
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

// Login
  const COOKIE_KEY_AUTH = "auth";
  /*app.post("/api/auth/login", async (c) => {
    const data = await c.req.json();
    
    // looks up user based on receives email in DB
    const result = await sql`SELECT * FROM users
      WHERE email = ${data.email.trim().toLowerCase()}`;

      if (result.length === 0) {
        c.status(401);
        return c.json({
          "message": "Invalid email or password!",
        });
      }
    
    const user = result[0];
    
    // verifies equality of received password hash with stored password hash
    const passwordValid = verify(data.password.trim(), user.password_hash);
    if (passwordValid) {
      // setting the cookie as the user id
      setCookie(c, COOKIE_KEY, user.id, {
        path: "/",
        domain: "localhost",
        httpOnly: true,
        sameSite: "lax"
      });
      return c.json({
        "message": `Logged in as user with id ${user.id}`,
      });
    } else {
        c.status(401);
        return c.json({
        "message": "Invalid email or password!",
      });
    }
  });*/

  // Assignment Cookies: Registering and logging in
  const COOKIE_KEY_EMAIL = "email";

  app.post("/api/auth/login", async (c) => {
    const data = await c.req.json();

    try {
        await sql`INSERT INTO users (email, password_hash) 
        VALUES (${data.email.trim().toLowerCase()}, 
        ${hash(data.password.trim())}) RETURNING *`;
    }
    catch {
        console.log("internal error")
    }
    
  });

  app.post("/api/auth/register", async (c) => {
    
  });

  // Username: in: JSON with property username, out: JSON with property data
  app.post("/api/user", async (c) => {
    const data = await c.req.json();
    console.log("data received by BE server", data)
    return c.json( {data: data.username} );
  });

  // COOKIES
  const COOKIE_KEY = "visited";

  app.get("/bla", async (c) => {
    let visit = getCookie(c, COOKIE_KEY);
    console.log(visit)
    visit = visit ? parseInt(visit) + 1 : 1;
    console.log("visit after count up", visit)
    setCookie(c, COOKIE_KEY, visit.toString);
    if (visit === 1){
      return c.json({ message: "Welcome!" });
    }
    else {
      return c.json( { message: "Welcome back"})
    }
  });


export default app;