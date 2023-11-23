const express = require("express");
const router = express.Router();
const { QueryTypes, Op } = require("sequelize");
const sequelize = require("../database/dbInstance");
const User = require("../models/user");

const {
  usersMessagedWithValidator,
  usersSearchValidator,
} = require("../schema_validators/user");

router.post("/search", usersSearchValidator(), async (req, res) => {
  try {
    const { username, yearFrom, yearTo, gender } = req.body;

    let birthdate;
    if (yearFrom && yearTo) {
      startDate = new Date(yearFrom + "-01-01");
      endDate = new Date(yearTo + "-12-31");
      birthdate = {
        [Op.between]: [startDate, endDate],
      };
    }

    const result = await User.findAll({
      where: {
        ...(username && { username }),
        ...(gender && { gender }),
        ...(birthdate && { birthdate }),
      },
    });

    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.toString() });
  }
});

router.get(
  "/messaged-with/:userId",
  usersMessagedWithValidator,
  async (req, res) => {
    try {
      const userId = req.params["userId"];

      //select messages with DISTINCT combination of sender - receiver
      //return the combination with the latest message
      const result = await sequelize.query(
        'SELECT DISTINCT sender, receiver, "timestampSent" ' +
          "FROM public.message " +
          "WHERE sender = :userId OR receiver = :userId " +
          'ORDER BY "timestampSent" DESC',
        {
          replacements: { userId },
          type: QueryTypes.SELECT,
        }
      );

      //create an object with prop the userId and value the timestamp of the latest message exchanged
      const latestPerUserId = {};

      for (let i = 0; i < result.length; i++) {
        const message = result[i];

        const otherId =
          message.sender == userId ? message.receiver : message.sender;
        newDate = message.timestampSent;

        if (latestPerUserId[otherId]) {
          if (new Date(newDate) > new Date(latestPerUserId[otherId])) {
            latestPerUserId[otherId] = newDate;
          }
        } else {
          latestPerUserId[otherId] = newDate;
        }
      }

      //create sorted array of userIds by latest messaged exchanged
      const sortedIds = Object.keys(latestPerUserId).sort(
        (a, b) => new Date(latestPerUserId[b]) - new Date(latestPerUserId[a])
      );

      const users = await User.findAll({
        where: {
          id: sortedIds,
        },
      });

      //sort the array of User objects returned by the query
      //todo improve complexity
      const sortedUsers = sortedIds.map((id) => {
        let tmp = users.find((user) => user.id == id);
        tmp.dataValues.latestMessageExchanged = latestPerUserId[id];
        return tmp;
      });

      res.status(200).json(sortedUsers);
    } catch (err) {
      res.status(500).json({ error: err.toString() });
    }
  }
);

module.exports = router;
