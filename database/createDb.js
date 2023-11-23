const { Client } = require("pg");

const database = process.env.DB_NAME;

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "postgres",
};

const createDb = async () => {
  const client = new Client(dbConfig);

  try {
    client.connect();
    await client.query(`CREATE DATABASE ${database};`);
  } catch (err) {
    if (err.code === "42P04") {
      console.error("Database already exists");
    } else {
      console.error("Error creating database:", err);
    }
  } finally {
    client.end();
  }
};

module.exports = createDb;
