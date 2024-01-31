const express = require("express");
const { addComment } = require("../controllers/commentController");
const requireAuth = require('../middleware/requireAuth'); // Assuming you have authentication middleware

const router = express.Router();

// Route to add a new comment to a math question
router.post("/:mathId/comments", requireAuth, addComment);

module.exports = router;
