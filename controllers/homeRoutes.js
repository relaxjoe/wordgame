const router = require('express').Router();

router.get('/', async (req, res) => {
    try{
        // layout: false is a placeholder and should be deleted when we have a handlebars {{{body}}}
        res.render('homepage', {layout: false});
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;