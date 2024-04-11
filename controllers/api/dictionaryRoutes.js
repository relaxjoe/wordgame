const router = require("express").Router();
const { Dictionary, User } = require("../../models");

// Route getting all words in dictionary
router.get("/", async (req, res) => {
  try {
    // Naming is hard
    const dictionaryEntries = await Dictionary.findAll();
    res.json(dictionaryEntries);
  } catch (err) {
    // Logging errors and error added error message
    console.error("Error fetching dictonary:", err);
    res.status(500).json({ message: "Internal error" });
  }
});

router.get("/getNewWord", async (req, res) => {
  try {
    const words = await Dictionary.findAll();
    const userData = await User.findByPk(req.session.user_id);
    const userCompletedWords = new Set(
      userData.word_id.split(",").map((item) => parseInt(item))
    );
    const uncompletedWords = words.filter(
      (item) => !userCompletedWords.has(item.id)
    );
    const randomIndex = parseInt(Math.random() * uncompletedWords.length);
    res.json({ word: uncompletedWords[randomIndex] });
  } catch (err) {
    res.status(500).json({ message: "Internal error" });
  }
});

//move to user controller,
router.put("/completed/:word_id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id);
    const completedWords = userData.word_id + "," + req.params.word_id;
    const updatedUser = await User.update(
      { word_id: completedWords },
      { where: { id: userData.id } }
    );
    res.json({ updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Internal error" });
  }
});

// Get one word
router.get("/:id", async (req, res) => {
  try {
    const word = await Dictionary.findByPk(req.params.id, {
      include: [{ model: User }],
    });
    if (!word) {
      res.status(404).json({ message: "No word with that id exists." });
      return;
    }

    res.status(200).json(word);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update dictionary entry
router.put("/:id", async (req, res) => {
  try {
    const updatedEntry = await Dictionary.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(updatedEntry);
  } catch (err) {
    console.error("Error updating entry:", err);
    res.status(400).json({ message: "Failed to update dictionary" });
  }
});

// Delete dictionary entry
router.put("/:id", async (req, res) => {
  try {
    const deleteEntry = await Dictionary.destroy(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(deletedEntry);
  } catch (err) {
    console.error("Error deleting entry:", err);
    res.status(400).json({ message: "Failed to delete entry" });
  }
});

module.exports = router;
