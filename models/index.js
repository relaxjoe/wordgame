const User = require('./User');
const Project = require('./Project');

// Creates a relationship between User and Project model
User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Creates a relationship between User and Project model
Project.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Project };
