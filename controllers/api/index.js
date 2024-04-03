const router = require('express').Router();

// Import routes
const userRoutes = require('./userRoutes');
const dictionaryRoutes = require('./dictionaryRoutes');

router.use('/user', userRoutes);
router.use('/dictionary', dictionaryRoutes);

module.exports = router;