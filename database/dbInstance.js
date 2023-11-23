const Sequelize = require("sequelize");

const dbName = process.env.DB_NAME;
const user = process.env.DB_USER;
const pass = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

sequelizeInstance = new Sequelize(
  `postgres://${user}:${pass}@${host}:${port}/${dbName}`
);

module.exports = sequelizeInstance;
