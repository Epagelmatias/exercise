const createDb = require("./createDb");
const sequelize = require("./dbInstance");

const initializeDatabase = async () => {
  try {
    await createDb();
    await sequelize.sync();
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

module.exports = initializeDatabase;
