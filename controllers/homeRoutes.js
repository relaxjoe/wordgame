const router = require("express").Router();
const withAuth = require('../utils/auth');
const { User, Dictionary } = require('../models');

// Render the homepage
router.get("/", async (req, res) => {
  try {
    const dictionaryData = await Dictionary.findAll({
      include: [
        {
          model: User,
          attributes: [],
        },
      ],
    });

    // Serialize the data
    const words = dictionaryData.map((word) => word.get({ plain: true }));

    // layout: false is a placeholder and should be deleted when we have a handlebars {{{body}}}
    res.render("homepage", {
      layout: false,
      // words,
      // logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render the login page
router.get('/', (req, res) => {
  // if (req.session.logged_in) {
  //   res.redirect('/');
  //   return;
  // }

  res.render('l');
})
module.exports = router;
