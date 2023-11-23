const { DataTypes } = require("sequelize");
const sequelize = require("../database/dbInstance");
const Message = require("./message");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["N/A", "Male", "Female"]],
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { tableName: "user", timestamps: false }
);

User.hasMany(Message, { foreignKey: "sender", as: "SentMessages" });
User.hasMany(Message, { foreignKey: "receiver", as: "ReceivedMessages" });

Message.belongsTo(User, { foreignKey: "sender", as: "Sender" });
Message.belongsTo(User, { foreignKey: "receiver", as: "Receiver" });

module.exports = User;
