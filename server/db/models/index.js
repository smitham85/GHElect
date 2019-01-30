const User = require('./user');
const Task = require('./task');

Task.belongsTo(User); //userId in Task

module.exports = {
  User,
  Task,
};
