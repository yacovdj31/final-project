const express = require("express");
const MathController = require("../controllers/mathController");
const ScrambleController = require("../controllers/scrambleController");
const router = express.Router();

router.get("/math", MathController.getAllMathPublic);

router.get("/math", MathController.getMathPublic);

router.get("/math", MathController.createMathPublic);

router.get("/math", MathController.updateMathPublic);

router.post("/math", MathController.comment);

router.post("/:id/rating", MathController.postRating);
router.get("/math/", MathController.getRatings);

router.get("/scramble", ScrambleController.getAllScramblePublic);

router.get("/scramble", ScrambleController.getScramblePublic);

router.post("/scramble", ScrambleController.commentScramble);

router.post("/scramble/", ScrambleController.postRating);

router.get("/scramble/", ScrambleController.getRatings);

module.exports = router;
