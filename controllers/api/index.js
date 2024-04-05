const router = require('express').Router();

// Import routes
const userRoutes = require('./userRoutes');
const homeRoutes = require('../homeRoutes')
const dictionaryRoutes = require('./dictionaryRoutes');
const bodyParser = require('body-parser');

router.use('/user', userRoutes);
router.use('/dictionary', dictionaryRoutes);
router.use('/homepage', homeRoutes);
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json());


module.exports = router;