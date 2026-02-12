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
    // Check if user is authenticated
    if (!req.session.user_id) {
      return res.status(401).json({ message: "Please log in to play" });
    }

    const words = await Dictionary.findAll();
    
    if (!words || words.length === 0) {
      return res.status(404).json({ message: "No words available" });
    }

    const userData = await User.findByPk(req.session.user_id);
    
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Parse completed words safely
    const completedWordIds = userData.word_id 
      ? userData.word_id.split(",").filter(id => id).map(id => parseInt(id))
      : [];
    
    const userCompletedWords = new Set(completedWordIds);
    
    const uncompletedWords = words.filter(
      (item) => !userCompletedWords.has(item.id)
    );

    // If all words are completed, reset or return a message
    if (uncompletedWords.length === 0) {
      return res.status(200).json({ 
        message: "Congratulations! You've completed all words!",
        allCompleted: true 
      });
    }

    const randomIndex = Math.floor(Math.random() * uncompletedWords.length);
    res.json({ word: uncompletedWords[randomIndex] });
  } catch (err) {
    console.error("Error getting new word:", err);
    res.status(500).json({ message: "Internal error", error: err.message });
  }
});

//move to user controller,
router.put("/completed/:word_id", async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.session.user_id) {
      return res.status(401).json({ message: "Please log in" });
    }

    const wordId = parseInt(req.params.word_id);
    
    if (isNaN(wordId)) {
      return res.status(400).json({ message: "Invalid word ID" });
    }

    const userData = await User.findByPk(req.session.user_id);
    
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Parse existing completed words
    const existingWords = userData.word_id 
      ? userData.word_id.split(",").filter(id => id).map(id => parseInt(id))
      : [];

    // Check if word is already completed
    if (existingWords.includes(wordId)) {
      return res.json({ message: "Word already completed", updatedUser: userData });
    }

    // Add new word to completed list
    existingWords.push(wordId);
    const completedWords = existingWords.join(",");

    const [updatedCount] = await User.update(
      { word_id: completedWords },
      { where: { id: userData.id } }
    );

    if (updatedCount === 0) {
      return res.status(500).json({ message: "Failed to update user" });
    }

    res.json({ message: "Word marked as completed", completedWords });
  } catch (err) {
    console.error("Error marking word as completed:", err);
    res.status(500).json({ message: "Internal error", error: err.message });
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
router.delete("/:id", async (req, res) => {
  try {
    const deletedCount = await Dictionary.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ deleted: deletedCount });
  } catch (err) {
    console.error("Error deleting entry:", err);
    res.status(400).json({ message: "Failed to delete entry" });
  }
});

module.exports = router;
