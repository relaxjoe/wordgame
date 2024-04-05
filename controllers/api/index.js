const router = require('express').Router();

// Import routes
const userRoutes = require('./userRoutes');
const homeRoutes = require('../homeRoutes')
const dictionaryRoutes = require('./dictionaryRoutes');

router.use('/user', userRoutes);
router.use('/dictionary', dictionaryRoutes);
router.use('/homepage', homeRoutes);


module.exports = router;