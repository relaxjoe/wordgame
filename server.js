require("dotenv").config(); // This line should be at the very top

const express = require("express");
const exphbs = require("express-handlebars");
const session = require('express-session');
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

// Use the authentication routes
app.use("/auth", authRoutes);
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
});
