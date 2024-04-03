const router = require('express').Router();
const { User } = require('../../models');

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

router.post('/login', validateUserInput, async (req, res) => {
  try {
    console.log('Logging in user...');
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      console.log('User not found');
      return res.status(400).json({ message: 'Incorrect email or password, try again!' });
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log('Incorrect password');
      return res.status(400).json({ message: 'Incorrect email or password, try again!' });
    }


module.exports = router;