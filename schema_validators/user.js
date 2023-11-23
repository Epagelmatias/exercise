const { Validator } = require("express-json-validator-middleware");
const { validate } = new Validator();

const usersSearchBody = {
  type: "object",
  properties: {
    username: {
      type: "string",
    },
    gender: {
      type: "string",
      enum: ["Male", "Female", "N/A"],
    },
    yearFrom: {
      type: "integer",
      minimum: 1900,
    },
    yearTo: {
      type: "integer",
      minimum: 1900,
    },
  },
};

const usersSearchValidator = () => {
  return validate({ body: usersSearchBody });
};

//custom middleware
const usersMessagedWithValidator = (req, res, next) => {
  const { param } = req.params;

  // Check if the parameter is a positive integer
  if (!/^\d+$/.test(param) && parseInt(param, 10) > 0) {
    return res
      .status(400)
      .json({ error: "User id should be a positive integer." });
  }

  next();
};

module.exports = {
  usersMessagedWithValidator,
  usersSearchValidator,
};
