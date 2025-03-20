import postgres from "postgres";

const sql = postgres();

const create = async (course) => {
    const result = await sql`INSERT INTO courses (name)
      VALUES (${course.name})
      RETURNING *`;
    return result[0];
  };

const readCourses = async () => {
      // Retrieve all book items
    return await sql`SELECT * FROM courses`;
  };

const readCoursesById = async (id) => {
      // Retrieve a book item with the given id
    const result = await sql`SELECT * FROM courses WHERE id = ${id}`;
    return result[0];
  };

const removeCourseByID = async (id) => {
    // Delete a book item with the given id
    const result = await sql`DELETE FROM courses WHERE id = ${id} RETURNING *`;
    return result[0];
  };


export { create, readCourses,readCoursesById, removeCourseByID };