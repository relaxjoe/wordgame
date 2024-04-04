const User = require('./user');
const Dictionary = require('./dictionary');

// Creates a relationship between models
User.hasMany(Dictionary, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Dictionary.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Dictionary };
