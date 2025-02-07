import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import postgres from "postgres";

app.use("/*", cors());
app.use("/*", logger());

const app = new Hono();
const sql = postgres();

app.get("/", (c) => c.json({ message: "Hello world!" }));


export default app;