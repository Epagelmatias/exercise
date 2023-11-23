const { DataTypes } = require("sequelize");
const sequelize = require("../database/dbInstance");

const Message = sequelize.define(
  "Message",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sender: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiver: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    timestampSent: {
      type: DataTypes.DATE,
    },
  },
  { tableName: "message", timestamps: false }
);

module.exports = Message;
