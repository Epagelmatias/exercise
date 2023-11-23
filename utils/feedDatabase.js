const readXlsxFile = require("read-excel-file/node");
const path = require("path");

const User = require("../models/user");
const Message = require("../models/message");

const insertFeed = async () => {
  const feedPath = path.resolve(__dirname, "../seeds.xlsx");

  const usersFeed = readXlsxFile(feedPath, {
    sheet: "users",
    dateFormat: "mm/dd/yyyy",
  });

  const messagesFeed = readXlsxFile(feedPath, { sheet: "messages" });

  //await in parallel
  const allFeeds = await Promise.all([usersFeed, messagesFeed]);

  users = allFeeds[0].map((row) => {
    return {
      id: row[0],
      firstname: row[1],
      lastname: row[2],
      birthdate: row[3],
      gender: row[4],
      username: row[5],
    };
  });

  const messages = allFeeds[1].map((row) => {
    return {
      id: row[0],
      content: row[1],
      sender: row[2],
      receiver: row[3],
      seen: row[4],
      timestampSent: row[5],
    };
  });

  try {
    //await for the users to insert first, because messages depend on the primary keys
    const userResponse = await User.bulkCreate(users);
    const messageResponse = await Message.bulkCreate(messages);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = insertFeed;
