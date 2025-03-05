import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import postgres from "postgres";
import { hash, verify } from "jsr:@denorg/scrypt@4.4.4";

// Passwords / Hashes
const hashedPassword = hash("saippuakivikauppias");
console.log(hashedPassword);

const passwordsMatch = verify("saippuakivikauppias", hashedPassword);
console.log(passwordsMatch); // true: string matches hash

const passwordsDoNotMatch = verify("password", hashedPassword);
console.log(passwordsDoNotMatch); // false: string does not match hash



const app = new Hono();
const sql = postgres();

app.use("/*", cors());
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
  app.post("/api/auth/login", async (c) => {
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
      return c.json({
        "message": `Logged in as user with id ${user.id}`,
      });
    } else {
        c.status(401);
        return c.json({
        "message": "Invalid email or password!",
      });
    }
  });

  // Username: in: JSON with property username, out: JSON with property data
  app.post("/api/user", async (c) => {
    const data = await c.req.json();
    console.log("data received by BE server", data)
    return c.json( {data: data.username} );
  });

export default app;