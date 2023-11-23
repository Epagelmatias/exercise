const express = require("express");
const router = express.Router();
const sequelize = require("../database/dbInstance");
const { Op } = require("sequelize");

const { messagesBetweenValidator } = require("../schema_validators/message");

router.post("/between", messagesBetweenValidator(), async (req, res) => {
  try {
    const { user1, user2 } = req.body;

    const Message = sequelize.models.Message;

    const result = await Message.findAll({
      where: {
        sender: {
          [Op.or]: [user1, user2],
        },
        receiver: {
          [Op.or]: [user1, user2],
        },
      },
      order: [["timestampSent", "DESC"]],
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.toString() });
  }
});

module.exports = router;
