import knex from "knex";
import appconfig from "./appconfig.js";

const config = {
  client: "mysql",
  connection: {
    host: appconfig.db.host,
    user: appconfig.db.username,
    password: appconfig.db.password,
    database: appconfig.db.database,
  },
};

function createKnexInstance() {
  return knex(config);
}

async function connectDB() {
  const db = createKnexInstance();
  try {
    await db.raw("SELECT 1+1");
    console.log("Connected to MySQL database");
    return db;
  } catch (error) {
    console.error("Failed to connect to MySQL:", error);
    throw error;
  }
}

async function closeDB(db) {
  try {
    if (db) {
      await db.destroy();
    }
    console.log("Closed MySQL database connection");
  } catch (error) {
    console.error("Error closing MySQL database connection:", error);
    throw error;
  }
}

export { connectDB, closeDB };
