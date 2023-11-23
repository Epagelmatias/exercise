const express = require("express");
const router = express.Router();

const insertFeed = require("../utils/feedDatabase");

router.post("/feedDB", async (req, res) => {
  try {
    await insertFeed();
    res.status(200).json({ message: "ok" });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

module.exports = router;
