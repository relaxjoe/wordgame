const router = require("express").Router();
const withAuth = require('../utils/auth');
const { User, Dictionary } = require('../models');

// Render the homepage
router.get('/', (req, res) => {
  res.render('homepage', {
    layout: false,
  })
});

// Render the main page
router.get('/main', async (req, res) => {
  try {
    const dictionaryData = await Dictionary.findAll({
      include: [
        {
          model: User,
          attributes: ['streak', 'score'], // Attributes to include from the User model
        },
      ],
    });

    // Serialize the data
    const words = dictionaryData.map((word) => word.get({ plain: true }));
    // layout: false is a placeholder and should be deleted when we have a handlebars {{{body}}}
    res.render('main', {
      email: req.session.email ?? 'bob@hotmail.com',
      words,
      layout: false,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render the login page
router.get('/login', (req, res) => {
  res.render('login', {
    layout: false,
  });
})
module.exports = router;
