# Nerdle - 4-Letter Tech Word Game

A modern word guessing game featuring tech-focused 4-letter words. Built with Node.js, Express, Sequelize, and MySQL.

## Features

- User registration and authentication with secure password hashing
- Session-based authentication with secure cookies
- Word guessing game logic with visual feedback
- Track completed words and user progress
- 295+ tech-focused 4-letter words
- Responsive design for all devices

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL with Sequelize ORM
- **Authentication:** bcrypt for password hashing, express-session
- **Frontend:** Handlebars templating, vanilla JavaScript
- **Environment:** dotenv for configuration

## Prerequisites

Before you begin, ensure you have met the following requirements:
- **Node.js** (version 12.x or later)
- **MySQL** (version 5.7 or later)
- **npm** (comes with Node.js)

## Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/relaxjoe/wordgame.git
cd wordgame
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory (use `.env.example` as a template):

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
DB_NAME=wordgame_db
DB_USER=root
DB_PASSWORD=your_mysql_password
SESSION_SECRET=your-super-secret-session-key-change-in-production
PORT=3001
NODE_ENV=development
```

4. **Set up the database**

Create the MySQL database:

```bash
mysql -u root -p
CREATE DATABASE wordgame_db;
exit
```

5. **Seed the database**

Start the server and visit the seed endpoint:

```bash
npm start
```

Then visit: `http://localhost:3001/api/user/seed`

Or use the seed script if available:

```bash
node seeds/seed.js
```

## Usage

1. **Start the server**

```bash
npm start
```

2. **Access the application**

Open your browser and navigate to:
```
http://localhost:3001
```

3. **Create an account**

- Click "Sign Up" and create an account with your email and password (minimum 8 characters)

4. **Play the game**

- Guess the 4-letter word in 5 attempts
- Green = correct letter in correct position
- Yellow = correct letter in wrong position
- Gray = letter not in word

## Project Structure

```
wordgame/
├── config/           # Database connection configuration
├── controllers/      # Route controllers
│   ├── api/         # API routes (user, dictionary)
│   └── homeRoutes.js
├── models/          # Sequelize models
├── public/          # Static files (CSS, JS, images)
├── seeds/           # Database seed data
├── utils/           # Utility functions (auth middleware)
├── views/           # Handlebars templates
├── server.js        # Main server file
├── .env.example     # Environment variables template
└── package.json     # Project dependencies
```

## API Endpoints

### User Routes (`/api/user`)
- `POST /signup` - Create new user account
- `POST /login` - Authenticate user
- `POST /logout` - End user session
- `GET /seed` - Seed the database (development only)

### Dictionary Routes (`/api/dictionary`)
- `GET /` - Get all words
- `GET /getNewWord` - Get a random uncompleted word
- `PUT /completed/:word_id` - Mark word as completed
- `GET /:id` - Get specific word by ID
- `PUT /:id` - Update dictionary entry
- `DELETE /:id` - Delete dictionary entry

## Security Features

- Environment-based session secrets
- Secure session cookies (httpOnly, secure in production, sameSite)
- Password hashing with bcrypt
- Input validation and sanitization
- Email format validation
- Authentication checks on protected routes

## Development

To run in development mode with detailed logging:

```bash
NODE_ENV=development npm start
```

## Production Deployment

1. Set `NODE_ENV=production` in your environment
2. Use a strong `SESSION_SECRET` 
3. Set up HTTPS (required for secure cookies)
4. Configure your MySQL database
5. Consider using a process manager like PM2

## Future Enhancements

- Daily challenge mode (same word for everyone)
- Hard mode (must use revealed letters)
- Dark mode toggle
- User statistics page
- Share results functionality
- Keyboard visual feedback
- Animation effects
- Sound effects (toggleable)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Author

**relaxjoe** - [GitHub Profile](https://github.com/relaxjoe)

## Acknowledgments

- Inspired by Wordle by Josh Wardle
- Tech-focused word list curated for developers and tech enthusiasts
