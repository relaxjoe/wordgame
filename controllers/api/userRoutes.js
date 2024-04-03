const router = require('express').Router();
const { User } = require('../../models');

// Validation middleware for users input
const validateUserInput = (req, res, next) => {
    const { email, password } = req.body;

// Checking if email and password are provided
if (!email || !password) {
    console.log('Error: Email and passwrod required');
    return res.status(400).json({ message: 'Email and password required'});
}

// If email and password are validated
console.log('Validation successful!');
};

router.post('/',validateUserInput, async (req, res) => {
    try {
        console.log('Creating user...');
        const userData = await User.creat(req.body);

        req.session.save(() => {
            req.session.user_id =
        })
    }
})
module.exports = router;

