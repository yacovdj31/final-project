const Comment = require('../models/commentModel');
const Math = require('../models/mathModel'); // Ensure you have imported the Math model

// POST a new comment
const addComment = async (req, res) => {
  const { text } = req.body;
  const { mathId } = req.params; // Assuming the URL contains the ID of the math question

  try {
    // Optional: Check if the math question exists
    const mathExists = await Math.findById(mathId);
    if (!mathExists) {
      return res.status(404).json({ error: 'Math question not found' });
    }

    const comment = await Comment.create({
      text,
      user: req.user._id, // Assuming `req.user._id` is set from your auth middleware
      math: mathId,
    });

    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addComment,
};
