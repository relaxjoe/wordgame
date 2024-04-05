const sequelize = require('../config/connection');
const Word = require('../models/dictionary');
const wordData = require('./wordData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Word.bulkCreate(wordData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
