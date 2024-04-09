require("dotenv").config(); // This line should be at the very top

const express = require("express");
const exphbs = require("express-handlebars");
const session = require('express-session');
// const { Sequelize } = require("sequelize");
const sequelize = require("./config/connection");
const authRoutes = require("./utils/auth");
const routes = require("./controllers");

const app = express();
const port = process.env.PORT || 3001;
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}))

// Set up handlebars engine
const hbs = exphbs.create();

// Tell express which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//tells our where out images folder
app.use(express.static('views'))
app.use(express.static('public'))

app.get("/static", (req, res) => { 
  res.render("static"); 
}); 

// Use Express's built-in middleware for json and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Sequelize to connect to your MySQL database using environment variables
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: "mysql",
//   }
// );

// // Test the database connection
// sequelize
//   .authenticate()
//   .then(() =>
//     console.log("Database connection has been established successfully.")
//   )
//   .catch((err) => console.error("Unable to connect to the database:", err));

// Use the authentication routes
app.use("/auth", authRoutes);
app.use(routes);

// Define a simple route for the home page
// app.get('/', (req, res) => {
//   res.send('Welcome to the Wordle Game API!');
// });
sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => console.log('Now listening'));
});
// Start the server
// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });
