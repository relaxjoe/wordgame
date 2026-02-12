const router = require("express").Router();
const { User } = require("../../models");
const { seedDatabase } = require('../../seeds/seed');

// Validation middleware for user input
const validateUserInput = (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    console.log("Error: Email and password required");
    return res.status(400).json({ message: "Email and password required" });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log("Error: Invalid email format");
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Validate password strength (at least 8 characters)
  if (password.length < 8) {
    console.log("Error: Password must be at least 8 characters");
    return res.status(400).json({ message: "Password must be at least 8 characters" });
  }

  // If all validation passes
  console.log("Validation successful");
  next();
};

router.post("/signup", validateUserInput, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = await User.create({
      email,
      password,
      word_id: "", // Initialize with empty string
    });
    // Set session and redirect to main gameplay page
    req.session.user_id = newUser.id;
    req.session.logged_in = true;
    req.session.email = newUser.email;
    req.session.save(() => {
      res.redirect("/main");
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

router.get('/seed', async (req, res) => {
  try{
     await seedDatabase();
     res.status(200);
  } catch (err){
    res.status(500).json(err)
  }
});

router.post("/login", validateUserInput, async (req, res) => {
  try {
    console.log("Logging in user...");
    const userData = await User.findOne({ where: { email: req.body.email } });

    // Error response for user not found
    if (!userData || !(await userData.checkPassword(req.body.password))) {
      console.log("Incorrect email or password");
      return res
        .status(400)
        .json({ message: "Incorrect email or password, try again!" });
    }

    // Saving user ID and set logged-in for game
    console.log(userData.email);
    req.session.user_id = userData.id;
    req.session.logged_in = true;
    req.session.email = userData.email;
    console.log("User logged in successfully");
    
    // Save session and respond
    req.session.save(() => {
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.error("Error logging in user:", err);
    // Error response if login fails
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    console.log("Logging out user...");
    // Stop session and logs out the user
    req.session.destroy(() => {
      console.log("User logged out successfully");
      res.status(204).end();
    });
  } else {
    console.log("User not logged in");
    // Error response if user is not logged in
    res.status(404).end();
  }
});

module.exports = router;
