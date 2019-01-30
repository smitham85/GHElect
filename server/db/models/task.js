const Sequelize = require('sequelize');
const db = require('../db');

const Task = db.define('Task', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  subTitle: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/logo_transparent.png',
  },
  description: {
    type: Sequelize.TEXT,
  },
});

module.exports = Task;
