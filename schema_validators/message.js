const { Validator } = require("express-json-validator-middleware");
const { validate } = new Validator();

const messagesBetweenBody = {
  type: "object",
  required: ["user1", "user2"],
  properties: {
    user1: {
      type: "integer",
      minimum: 1,
    },
    user2: {
      type: "integer",
      minimum: 1,
    },
  },
};

const messagesBetweenValidator = () => {
  return validate({ body: messagesBetweenBody });
};

module.exports = {
  messagesBetweenValidator,
};
