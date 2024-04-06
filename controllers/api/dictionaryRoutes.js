const router = require('express').Router()
const { Dictionary, User } = require('../../models')

// Route getting all words in dictionary
router.get('/', async (req, res) => {
    try {
        // Naming is hard
        const dictionaryEntries = await Dictionary.findAll();
        res.json(dictionaryEntries);
    } catch (err) {
        // Logging errors and error added error message
        console.error('Error fetching dictonary:', err);
        res.status(500).json({ message: 'Internal error' });
    }
});

// Get one word
router.get('/:id', async (req, res) => {
    try {
        const word = await Dictionary.findByPk(req.params.id, {
            include: [{ model: User }],
        });
        if(!word) {
            res.status(404).json({ message: 'No word with that id exists.'});
            return;
        }

        res.status(200).json(word);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update dictionary entry
router.put('/:id', async (req, res) => {
    try {
        const updatedEntry = await Dictionary.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json(updatedEntry);
    } catch (err) {
        console.error('Error updating entry:', err);
        res.status(400).json({ message: 'Failed to update dictionary' });
    }
});

// Delete dictionary entry
router.put('/:id', async (req, res) => {
    try {
        const deleteEntry = await Dictionary.destroy(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json(deletedEntry);
    } catch (err) {
        console.error('Error deleting entry:', err);
        res.status(400).json({ message: 'Failed to delete entry' });
    }
});


module.exports = router;