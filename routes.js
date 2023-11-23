const express = require("express");
const app = express();

app.use("/", require("./controllers/feedDatabase"));
app.use("/messages", require("./controllers/message"));
app.use("/users", require("./controllers/user"));

module.exports = app;
