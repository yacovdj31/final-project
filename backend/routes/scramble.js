// const express = require("express");
// const {
//   getAllScramble,
//   getAllScramblePublic,
//   getScramblePublic,
//   getScramble,
//   createScramble,
//   deleteScramble,
//   updateScramble,
//   commentScramble
// } = require("../controllers/scrambleController");
// const requireAuth = require("../middleware/requireAuth")
// const router = express.Router();

// router.get("/public", getAllScramblePublic);

// router.get("/public/:id", getScramblePublic);

// router.use(requireAuth)

// router.get("/", getAllScramble);

// router.get("/:id", getScramble);

// router.post("/", createScramble);

// router.delete("/:id", deleteScramble);

// router.patch("/:id", updateScramble);

// router.post('/:id/comment', requireAuth, commentScramble)

// module.exports = router;





const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const ScrambleController = require("../controllers/scrambleController");
const router = express.Router();

// Public routes
router.get("/public", ScrambleController.getAllScramblePublic);
router.get("/public/:id", ScrambleController.getScramblePublic);
router.get('/user-scramble', requireAuth, ScrambleController.getToggledScrambleForUser);

// Private routes (require authentication)
router.use(requireAuth);

router.patch("/toggleStatus/:id", requireAuth, ScrambleController.toggleScrambleStatusForUser);
router.get("/", ScrambleController.getAllScramble);
router.get("/:id", ScrambleController.getScramble);
router.post("/", ScrambleController.createScramble);
router.delete("/:id", ScrambleController.deleteScramble);
router.patch("/:id", ScrambleController.updateScramble);
router.post('/:id/comment', ScrambleController.commentScramble);
router.post('/:id/rating', ScrambleController.postRating); // Add this route for posting ratings
router.get('/:id/rating', ScrambleController.getRatings); // Add this route for getting ratings

module.exports = router;