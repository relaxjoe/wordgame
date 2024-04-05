const User = require('./user');
const Dictionary = require('./dictionary');

// Creates a relationship between models
User.belongsToMany(Dictionary, {
  through: 'User_Dictionary'
});

Dictionary.belongsToMany(User, {
  through: 'User_Dictionary'
});

module.exports = { User, Dictionary };
