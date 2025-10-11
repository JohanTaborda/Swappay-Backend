const { DataTypes } = require('sequelize');
const sequelize = require('../database');

// ChatRoom representa una conversación entre dos usuarios
const ChatRoom = sequelize.define('ChatRoom', {
  user1Id: { type: DataTypes.INTEGER, allowNull: false },
  user2Id: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'chat_rooms', timestamps: true });

module.exports = ChatRoom;
