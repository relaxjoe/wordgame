const router = require('express').Router();
const { User } = require('../../models');


router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Validation middleware for user input
const validateUserInput = (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    console.log('Error: Email and password required');
    return res.status(400).json({ message: 'Email and password required' });
  }

  // If all validation passes
  console.log('Validation successful');
  next();
};

router.post('/', validateUserInput, async (req, res) => {
  try {
    console.log('Creating user...');
    const userData = await User.create(req.body);

    // Save user ID and set loggin-in during session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      console.log('User successfully created');
      res.status(200).json(userData);
    });
    // Error if user creation fails
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(400).json(err);
  }
});

// Finding user by email
router.post('/login', validateUserInput, async (req, res) => {
  try {
    console.log('Logging in user...');
    const userData = await User.findOne({ where: { email: req.body.email } });

    // Error response for user not found
    if (!userData) {
      console.log('User not found');
      return res.status(400).json({ message: 'Incorrect email or password, try again!' });
    }

    // Checking if password matches users password
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log('Incorrect password');
      return res.status(400).json({ message: 'Incorrect email or password, try again!' });
    }

    // Saving user ID and set logged-in for game
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      console.log('User logged in successfully');
      // Respond with user data and success message
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.error('Error logging in user:', err);
    // Error response if login fails
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    console.log('Logging out user...');
    // Stop session and logs out the user
    req.session.destroy(() => {
      console.log('User logged out successfully');
      res.status(204).end();
    });
  } else {
    console.log('User not logged in');
    // Error response if user is not logged in
    res.status(404).end();
  }
});

module.exports = router;