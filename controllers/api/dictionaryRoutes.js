const router = require('express').Router()
const { Dictionary } = require('../../models')

// Route getting all words in dictionary
router.get('/',async (req, res) => {
    try {
        // Naming is hard
        const dictionaryEntries = await Dictionary.findAll();
        res.json(dictionaryEntries);
    } catch (err) {
        // Logging errors and error added error message
        console.error('Error fetching dictonary:', err);
        res.status(500).json({ message: 'Internal error'});
    }
});
module.exports = router;