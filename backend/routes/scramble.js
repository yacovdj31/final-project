

const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const ScrambleController = require("../controllers/scrambleController");
const router = express.Router();

router.get("/public", ScrambleController.getAllScramblePublic);
router.get("/public/:id", ScrambleController.getScramblePublic);
router.get('/user-scramble', requireAuth, ScrambleController.getToggledScrambleForUser);


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