const sequelize = require('../config/connection');
const { Dictionary, User } = require('../models');
const wordData = require('./wordData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Dictionary.bulkCreate(wordData, {
    individualHooks: true,
    returning: true,
  });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  })

  process.exit(0);
};

seedDatabase();
